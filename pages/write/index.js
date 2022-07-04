import React from "react";
import { supabase } from "../../utils/supabaseClient.js";
import Write from "../../components/Write/Write";

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

function write({ user, templateNo }) {
  return <Write {...{ user, templateNo }} />;
}

export default write;
