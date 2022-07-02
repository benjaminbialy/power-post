import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Button from "../Buttons/Button";
import LinkButton from "../Buttons/LinkButton";
import Post from "../Post";
import ScrollContainer from "../ScrollContainer";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("user_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

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
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollContainer>
    </div>
  );
}
