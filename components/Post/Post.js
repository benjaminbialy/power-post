import React, { useEffect, useId, useState } from "react";
import PostComponent from "../PostComponent";
import ScrollContainer from "../ScrollContainer";
import NavBar from "../NavBar";
import Heading from "../Heading";
import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";

export default function Post({ user }) {
  const [posts, setPosts] = useState([]);
  const [queuedPosts, setQueuedPosts] = useState([]);

  // fetches post types on load
  useEffect(() => {
    getPosts("posts", setPosts);
    getPosts("queued_posts", setQueuedPosts);
  }, [user]);

  const findQueuedPost = (posts, post_id) => {
    return posts.find((obj) => obj.post_id === post_id);
  };

  // gets all posts
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

  const queuePost = async (post_id, user_id, setQueuedPosts) => {
    let today = new Date();
    const { data, error } = await supabase.from("queued_posts").insert([
      {
        user_id: user_id,
        post_id: post_id,
        // the date tomorrow
        date_to_post: new Date(today.setDate(today.getDate() + 1)),
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      // add queued post to state after it's added to DB
      setQueuedPosts((prev) => [...prev, data[0]]);
    }
  };

  const unqueuePost = async (post_id, setQueuedPosts) => {
    const { data, error } = await supabase
      .from("queued_posts")
      .delete()
      .match({ post_id: post_id });
    if (error) {
      throw error;
    } else {
      // remove the queued post from state after it is from DB
      let queuedPostsCopy = [...queuedPosts];
      queuedPostsCopy.splice(
        queuedPostsCopy.findIndex((el) => el.post_id === post_id),
        1
      );
      setQueuedPosts([...queuedPostsCopy]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start w-full min-h-screen  ">
      <NavBar />
      <div className="p-6 md:py-4 xs:px-8 sm:px-10 min-h-screen flex flex-col justify-start w-full lg:m-0 md:m-auto md:flex-row max-w-[1440px] ">
        <div className="md:w-2/3">
          <Heading text={"Post Library"} styles={"mb-4 sm:mb-6"} />
          <div className="flex flex-wrap">
            {posts.length >= 1 ? (
              posts.map((post) => (
                <PostComponent
                  post_id={post.post_id}
                  onClick={() =>
                    queuePost(post.post_id, user.id, setQueuedPosts)
                  }
                  key={"normal-" + post.post_id}
                  name={post.name}
                  content={post.content}
                  picURL={post.pic_url}
                  showButton={true}
                  margin={"mb-4 md:mr-4"}
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
        <div className="md:w-1/3">
          <Heading text={"Queued Posts"} styles={"mb-4 sm:mb-6"} />
          <ScrollContainer styles="h-5/6 items-center">
            {queuedPosts.length >= 1 ? (
              queuedPosts.map((queued) => {
                let queuedPost = { ...findQueuedPost(posts, queued.post_id) };
                console.log(queuedPost);
                return (
                  <PostComponent
                    post_id={queued.post_id}
                    buttonText="Unqueue"
                    onClick={() => unqueuePost(queued.post_id, setQueuedPosts)}
                    key={"queued-" + queued.queue_id}
                    name={queuedPost.name}
                    content={queuedPost.content}
                    picURL={queuedPost.pic_url}
                    showButton={true}
                    postingDate={queued.date_to_post}
                    margin={"mb-4"}
                  />
                );
              })
            ) : (
              <div className="flex-none flex flex-col justify-center text-center items-center w-full h-[230px] p-8  max-w-sm  overflow-y-hidden border-2 border-gray-200 ">
                <div>
                  You don&apos;t have any queued posts, queue a post or create
                  one
                  <Link href={"/write/0"}>
                    <a className="text-sky-400">here.</a>
                  </Link>
                </div>
              </div>
            )}
          </ScrollContainer>
        </div>
      </div>
    </div>
  );
}
