import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import TextInput from "./Inputs/TextInput";

function PostOnLinkedIn() {
  const [content, setContent] = useState("");

  const postToLinkedIn = () => {
    fetch("/api/makePost", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        content: content,
        userID: supabase.auth.session().user.user_metadata.provider_id,
        accessToken: supabase.auth.session().provider_token,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callSupabaseFunction = async () => {
    const { data, error } = await supabase.rpc("hello_person", {
      person: "Ben",
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="flex flex-col mt-32">
      <TextInput
        value={content}
        setValue={setContent}
        placeholder={"Post content"}
      />
      <button
        onClick={() => {
          if (content.trim() !== "") {
            postToLinkedIn();
          }
        }}
      >
        Post
      </button>
      <button
        className="bg-black text-white mt-2"
        onClick={() => {
          callSupabaseFunction();
        }}
      >
        Call Supabase Function
      </button>
    </div>
  );
}

export default PostOnLinkedIn;
