import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Button from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";
import Post from "../Post";
import ScrollContainer from "../ScrollContainer";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [session]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

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
        <Button
          style=""
          text={"Sign out"}
          onClick={() => supabase.auth.signOut()}
          accent={true}
        />
        <LinkButton href={"/write"} text={"Write"} />
      </div>
      <ScrollContainer>
        {posts.map((post) => (
          <Post
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
