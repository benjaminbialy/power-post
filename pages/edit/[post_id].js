import React, { useEffect, useId, useState } from "react";
import Button from "../../components/Buttons/Button";
import TiptapEditor from "../../components/Editors/TiptapEditor";
import Select from "../../components/Inputs/Select";
import TextInput from "../../components/inputs/TextInput";
import { supabase } from "../../utils/supabaseClient.js";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

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

const saveChanges = async (post_id, name, content) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ name: name, content: content })
    .match({ post_id: post_id });

  if (error) throw error;
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
  const [name, setName] = useState(data[0].name);
  const [content, setContent] = useState(data[0].content);

  const id = useId();
  const route = useRouter();

  return (
    <div className="flex bg-green-200 justify-around">
      <div className="w-1/2">
        <label htmlFor={"name-" + id}>Post name:</label>
        <TextInput
          value={name}
          setValue={setName}
          id={"name-" + id}
          placeholder={"Enter the post name"}
        />
        <Image width={500} height={400} src={data[0].pic_url} />
        <TiptapEditor
          content={content}
          setContent={setContent}
          editable={true}
        />
      </div>
      <div className="bg-red-50 w-1/4 flex flex-col">
        <Button
          text="Save"
          onClick={() => saveChanges(data[0].post_id, name, content)}
        />{" "}
        <Button
          text="Delete"
          onClick={() => deletePost(data[0].post_id, route)}
        />
        <Button text="Home" onClick={() => route.push("/")} />
      </div>
    </div>
  );
}

export default edit;
