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

const saveChanges = async (post_id, name, content, pic_url) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ name: name, content: content, pic_url: pic_url })
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
  const [picURL, setPicURL] = useState(data[0].pic_url);

  const id = useId();
  const route = useRouter();

  return (
    <div className="flex flex-col sm:flex-row-reverse h-screen">
      <div className="flex justify-between p-4 border-b-2 border-gray-200 sm:border-b-0 sm:border-l-2 sm:flex-col-reverse sm:justify-end sm:p-10">
        <Button
          styles=" sm:mt-auto "
          text="Delete"
          onClick={() => deletePost(data[0].post_id, route)}
        />
        <Button styles="sm:mt-6" text="Home" onClick={() => route.push("/")} />
        <Button
          text="Save"
          onClick={() => saveChanges(data[0].post_id, name, content, picURL)}
          accent={true}
        />{" "}
      </div>
      <div className="p-4 mb-6 sm:p-8 md:py-12 md:16 lg:px-36 flex flex-col overflow-y-scroll  ">
        <div className="flex mb-4 flex-col  ">
          <label
            className="font-medium mb-2 sm:mr-8 text-lg"
            htmlFor={"name-" + id}
          >
            Post name:
          </label>
          <TextInput
            value={name}
            setValue={setName}
            id={"name-" + id}
            placeholder={"Enter the post name"}
            styles={""}
          />
        </div>
        <div className="mb-5 w-full max-w-md mx-auto">
          <Image
            layout="responsive"
            width={500}
            height={400}
            src={data[0].pic_url}
          />
        </div>
        <div className="flex mb-4 flex-col ">
          <label
            className="font-medium mb-2 sm:mr-8 text-lg"
            htmlFor={"name-" + id}
          >
            Image URL:
          </label>
          <TextInput
            value={picURL}
            setValue={setPicURL}
            id={"name-" + id}
            placeholder={"Enter the image url from i.picsum.photos"}
            styles={""}
          />
        </div>
        <TiptapEditor
          content={content}
          setContent={setContent}
          editable={true}
        />
      </div>
    </div>
  );
}

export default edit;
