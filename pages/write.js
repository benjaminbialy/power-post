import React, { useEffect } from "react";
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
  const savePost = async () => {
    // const { data, error } = await supabase
    //   .from("posts")
    //   .insert([{ user_id: user.id, name: "", pic_url: "", content: "" }]);
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
        <TiptapEditor content={"Fake blog post content"} />
        <Button text={"Save"} onClick={() => savePost()} />
      </div>
    </div>
  );
}

export default write;
