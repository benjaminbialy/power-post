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
export default function post({ user }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [user]);

  const getPosts = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("posts")
        .select()
        .eq("user_id", user.id)
        .limit(10)
        .order("post_id", { ascending: false });

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setPosts([...data]);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const queuePost = () => {};

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-screen items-center ">
      <div className="flex w-full">
        {" "}
        <LinkButton href={"/"} text={"Home"} />
      </div>
      <ScrollContainer>
        {posts.map((post) => (
          <Post
            onClick={queuePost}
            post={true}
            key={post.post_id}
            name={post.name}
            content={post.content}
            picURL={post.pic_url}
          />
        ))}
      </ScrollContainer>
    </div>
  );
}
