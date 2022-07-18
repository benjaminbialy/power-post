import React, { useEffect, useId, useState } from "react";
import PostComponent from "../PostComponent";
import NavBar from "../NavBar";
import Heading from "../Heading";
import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import Status from "../Popups/Status";
import ConfirmationBox from "../Popups/ConfirmationBox";
import { Octokit } from "@octokit/core";

export default function Post({ user }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({});
  const [confirm, setConfirm] = useState({});

  useEffect(() => {
    if (status.show) {
      const timer = setTimeout(() => {
        setStatus({ show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // fetches posts on load
  useEffect(() => {
    getPosts("posts", setPosts);
  }, [user]);

  // gets all posts from Supabase
  const getPosts = async (table, setType) => {
    try {
      let { data, error, status } = await supabase
        .from(table)
        .select()
        .eq("user_id", user.id)
        .order("post_id", { ascending: false });

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setType([...data]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateIsPosted = async (post_id) => {
    const { data, error } = await supabase
      .from("posts")
      .update({ isPosted: true })
      .eq("post_id", post_id);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  const postToLinkedIn = async (title, content, post_id) => {
    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
    });

    await octokit.request("POST /repos/benjaminbialy/power-post/dispatches", {
      owner: "benjaminbialy",
      repo: "power-post",
      event_type: "queuePost",
      client_payload: {
        cron: "* * * * *",
        content: title + "\n\n" + content,
        userID: supabase.auth.session().user.user_metadata.provider_id,
        accessToken: supabase.auth.session().provider_token,
      },
    });

    // fetch("/api/makePost", {
    //   method: "POST",
    //   credentials: "same-origin",
    //   body: JSON.stringify({
    //     content: title + "\n\n" + content,
    //     userID: supabase.auth.session().user.user_metadata.provider_id,
    //     accessToken: supabase.auth.session().provider_token,
    //   }),
    // })
    //   .then((res) => {
    //     setConfirm({ show: false, confirm: false });
    //     setStatus({
    //       message: "Posted successfully!",
    //       success: true,
    //       show: true,
    //     });
    //     updateIsPosted(post_id);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setConfirm({ show: false, confirm: false });
    //     setStatus({
    //       message: "Posting was unsuccessful!",
    //       success: false,
    //       show: true,
    //     });
    //   });
  };

  useEffect(() => {
    if (confirm.confirm) {
      postToLinkedIn(confirm.title, confirm.content, confirm.post_id);
    }
  }, [confirm]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start w-full min-h-screen  ">
      <NavBar />
      <div className="p-6 md:py-4 xs:px-8 sm:px-10 min-h-screen flex flex-col justify-start w-full lg:m-0 md:m-auto  max-w-[1440px] ">
        {status.show ? (
          <Status
            setStatus={setStatus}
            text={status.message}
            success={status.success}
          />
        ) : (
          confirm.show && (
            <ConfirmationBox
              text={"Are you sure you want to post this to your feed?"}
              setConfirm={setConfirm}
            />
          )
        )}
        <Heading text={"Post Library"} styles={"mb-4 sm:mb-6"} />
        <div className="flex flex-wrap">
          {posts.length >= 1 ? (
            posts.map((post) => (
              <PostComponent
                post_id={post.post_id}
                onClick={() => {
                  setConfirm((prev) => ({
                    ...prev,
                    show: true,
                    title: post.title,
                    content: post.content,
                    post_id: post.post_id,
                  }));
                }}
                buttonText={"Post"}
                key={"normal-" + post.post_id}
                title={post.title}
                content={post.content}
                showButton={true}
                margin={"mb-4 md:mr-4"}
                isPosted={post.isPosted}
              />
            ))
          ) : (
            <div className="flex-none flex flex-col justify-center text-center items-center w-full h-[230px] p-8  max-w-sm  overflow-y-hidden border-2 border-gray-200 mb-4 md:mr-4">
              You don&apos;t have any posts, create one{" "}
              <Link href={"/write/0"}>
                <a className="text-sky-400">here.</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
