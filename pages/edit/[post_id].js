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

const saveChanges = async (post_id, name, content, setSaving) => {
  setSaving(true);

  if (name.trim() == "") {
    alert("Your post needs a name!");
  } else if (content == "") {
    alert("Your post needs some content!");
  } else {
    const { data, error } = await supabase
      .from("posts")
      .update({ title: name, content: content })
      .match({ post_id: post_id });

    if (error) {
      setSaving(false);
      throw error;
    }
    if (data) {
      setSaving(false);
      alert("Post updated");
    }
  }
  setSaving(false);
};

const deletePost = async (post_id, route) => {
  if (
    window.confirm(
      "Are you sure you want to delete this post? It'll be gone forever!"
    )
  ) {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .match({ post_id: post_id });

    if (data) {
      route.push("/");
    }
  }
};

function edit({ user, data = "" }) {
  return <Edit {...{ user, data, deletePost, saveChanges }} />;
}

export default edit;
