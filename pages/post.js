import React, { useEffect, useId, useState } from "react";
import Button from "../components/Buttons/Button";
import LinkButton from "../components/Buttons/LinkButton";
import Post from "../components/Post";
import ScrollContainer from "../components/ScrollContainer";
import { supabase } from "../utils/supabaseClient.js";

// used to implement a protected route
export async function getServerSideProps({ req }) {
  console.log(req);
  const { error, user } = await supabase.auth.api.getUserByCookie(req);

  // redirect to login page if not logged in
  if (!user) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: { user } };
}

const findQueuedPost = (posts, post_id) => {
  return posts.find((obj) => obj.post_id === post_id);
};

export default function post({ user }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [queuedPosts, setQueuedPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPosts("posts", setPosts);
    getPosts("queued_posts", setQueuedPosts);
    setLoading(false);
  }, [user]);

  const getPosts = async (table, setType) => {
    try {
      let { data, error, status } = await supabase
        .from(table)
        .select()
        .eq("user_id", user.id)
        .limit(10)
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

  const queuePost = async (post_id, user_id) => {
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

  const unqueuePost = async (post_id) => {
    const { data, error } = await supabase
      .from("queued_posts")
      .delete()
      .match({ post_id: post_id });
    if (error) {
      console.log(error);
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
    <div className="flex flex-col w-screen overflow-hidden p-20 justify-center items-center ">
      <div className="flex w-full">
        {" "}
        <LinkButton href={"/"} text={"Home"} />
      </div>

      <div>
        <h2>Posts</h2>{" "}
        <ScrollContainer>
          {posts.map((post) => (
            <Post
              onClick={() => queuePost(post.post_id, user.id)}
              key={"normal-" + post.post_id}
              name={post.name}
              content={post.content}
              picURL={post.pic_url}
              showButton={true}
            />
          ))}
        </ScrollContainer>
      </div>
      <div>
        <h2>Queued Posts</h2>{" "}
        <ScrollContainer>
          {queuedPosts.map((queued) => {
            let queuedPost = { ...findQueuedPost(posts, queued.post_id) };
            console.log(queuedPost);
            return (
              <Post
                buttonText="Unqueue"
                onClick={() => unqueuePost(queued.post_id)}
                key={"queued-" + queued.queue_id}
                name={queuedPost.name}
                content={queuedPost.content}
                picURL={queuedPost.pic_url}
                showButton={true}
              />
            );
          })}
        </ScrollContainer>
      </div>
    </div>
  );
}
