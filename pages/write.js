import React, { useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import TiptapEditor from "../components/Editors/TiptapEditor";
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

function write({ user }) {
  const [content, setContent] = useState("This is a test description");

  const savePost = async () => {
    const { data, error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        name: "Testing Posting",
        pic_url:
          "https://i.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
        content: content,
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="w-screen min-h-screen flex ">
      <div className="bg-slate-50 w-1/2">
        post name
        <div>select template</div>
        <div>topic</div>
        <div>description</div>
        <div>keywords</div>
      </div>
      <div className="bg-red-50 w-1/2">
        post
        <TiptapEditor content={content} setContent={setContent} />
        <Button text={"Save"} onClick={() => savePost()} />
      </div>
    </div>
  );
}

export default write;
