import React from "react";
import { supabase } from "../utils/supabaseClient";
import axios from "axios";

// get session cookie for access token
export async function getServerSideProps({ req }) {
  const session = await supabase.auth.api.getUserByCookie(req);

  return { props: { session } };
}

function test({ session }) {
  const postToLinkedIn = () => {
    fetch("/api/makePost", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        user: "K6QBlzgAMK",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjU3NjcwMzQ4LCJzdWIiOiJjOWUzMWM2Ny0zYTZlLTQ0YTktODdlZS02ZjVhY2Q3NGM2YjEiLCJlbWFpbCI6ImJlbmphbWluY2JpYWx5QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiTGlua2VkSW4iLCJwcm92aWRlcnMiOlsiTGlua2VkSW4iXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbWVkaWEtZXhwMi5saWNkbi5jb20vZG1zL2ltYWdlL0M0RDAzQVFHNDh2cHlDVkI5X2cvcHJvZmlsZS1kaXNwbGF5cGhvdG8tc2hyaW5rXzEwMF8xMDAvMC8xNjU0NzY1MTQ1MTUxP2U9MTY2MjU5NTIwMFx1MDAyNnY9YmV0YVx1MDAyNnQ9d0M2T1pEQWlPTXFDNEpZNXRybFYwd2FIU21JVzB3bjlaN25GLXc4MGR4cyIsImVtYWlsIjoiYmVuamFtaW5jYmlhbHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkJlbmphbWluIEJpYWx5IiwiaXNzIjoiaHR0cHM6Ly9hcGkubGlua2VkaW4uY29tIiwibmFtZSI6IkJlbmphbWluIEJpYWx5IiwicGljdHVyZSI6Imh0dHBzOi8vbWVkaWEtZXhwMi5saWNkbi5jb20vZG1zL2ltYWdlL0M0RDAzQVFHNDh2cHlDVkI5X2cvcHJvZmlsZS1kaXNwbGF5cGhvdG8tc2hyaW5rXzEwMF8xMDAvMC8xNjU0NzY1MTQ1MTUxP2U9MTY2MjU5NTIwMFx1MDAyNnY9YmV0YVx1MDAyNnQ9d0M2T1pEQWlPTXFDNEpZNXRybFYwd2FIU21JVzB3bjlaN25GLXc4MGR4cyIsInByb3ZpZGVyX2lkIjoiSzZRQmx6Z0FNSyIsInN1YiI6Iks2UUJsemdBTUsifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.olLHpE1m0Rs2RDOM-W9PLpuCffycjg7d5wuhDvJUoWU",
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
    <div>
      <button onClick={() => postToLinkedIn()}>Click</button>
    </div>
  );
}

export default test;
