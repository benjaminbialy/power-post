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
    </div>
  );
}

export default PostOnLinkedIn;
