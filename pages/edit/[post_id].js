import React, { useEffect, useId, useState } from "react";
import Button from "../../components/Buttons/Button";
import TiptapEditor from "../../components/Editors/TiptapEditor";
import Select from "../../components/Inputs/Select";
import TextInput from "../../components/inputs/TextInput";
import { supabase } from "../../utils/supabaseClient.js";
import axios from "axios";
import Image from "next/image";

// used to implement a protected route
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

function edit({ user, data = "" }) {
  const [name, setName] = useState(data[0].name);
  const [content, setContent] = useState(data[0].content);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const id = useId();
  return (
    <div className="flex bg-green-200 justify-around">
      <div className="w-3/5">
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
      <div className="bg-red-50 w-2/12">buttons</div>
    </div>
  );
}

export default edit;
