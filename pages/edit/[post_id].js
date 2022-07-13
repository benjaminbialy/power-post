import React from "react";
import { supabase } from "../../utils/supabaseClient.js";
import Edit from "../../components/Edit/Edit";

// used to implement a protected route and get the post to edit
export async function getServerSideProps(context) {
  const { params, req } = context;

  const { user } = await supabase.auth.api.getUserByCookie(req);

  // redirect to login page if not logged in
  if (!user) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  // fetch post
  const { data, error, status } = await supabase
    .from("posts")
    .select()
    .eq("user_id", user.id)
    .eq("post_id", params.post_id);

  if (error && status !== 406) {
    throw error;
  }

  return { props: { user, data } };
}

const saveChanges = async (
  post_id,
  name,
  content,
  setSaving,
  redirect,
  setStatus
) => {
  setSaving(true);

  if (name.trim() == "") {
    setStatus({
      message: "Couldn't save your post, it needs a name!",
      success: false,
      show: true,
    });
  } else if (content == "") {
    setStatus({
      message: "Couldn't save your post, it needs some content!",
      success: false,
      show: true,
    });
  } else {
    const { data, error } = await supabase
      .from("posts")
      .update({ title: name, content: content })
      .match({ post_id: post_id });

    if (error) {
      setSaving(false);
      setStatus({
        message: "Error saving your post, try again!",
        success: false,
        show: true,
      });
      console.log(error);
    }
    if (data) {
      setSaving(false);
      setStatus({
        message: "Post saved successfully, redirecting now!",
        success: true,
        show: true,
      });
      redirect();
    }
  }
  setSaving(false);
};

const deletePost = async (post_id, route, setStatus) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .match({ post_id: post_id });

  if (error) {
    console.log(error);
    setStatus({
      message: "We couldn't delete your post!",
      success: false,
      show: true,
    });
  } else {
    setStatus({
      message: "Deleted successfully, redirecting now!",
      success: true,
      show: true,
    });
    route.push("/post");
  }
};

function edit({ user, data = "" }) {
  return <Edit {...{ user, data, deletePost, saveChanges }} />;
}

export default edit;
