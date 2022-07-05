import React from "react";
import { supabase } from "../utils/supabaseClient";
import axios from "axios";

// get session cookie for access token
export async function getServerSideProps({ req }) {
  const session = await supabase.auth.api.getUserByCookie(req);

  return { props: { session } };
}

function test({ session }) {
  const postToLinkedIn = async () => {
    console.log(session);

    const status = await axios.post("/api/makePost", {
      user: session.user.user_metadata.sub,
      accessToken: session.token,
    });
    console.log(status);
  };

  return (
    <div>
      <button onClick={() => postToLinkedIn()}>Click</button>
    </div>
  );
}

export default test;
