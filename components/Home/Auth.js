import React, { useState } from "react";
import Button from "../Buttons/Button";
import EmailPassword from "../EmailPassword";
import { supabase } from "../../utils/supabaseClient";
import NavBar from "../NavBar";
import Image from "next/image";

export default function Auth() {
  // OAuth Providers
  async function signInWithOAuth(provider) {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: provider,
      },
      { scopes: "w_member_social" }
    );
  }

  return (
    <div className="min-h-screen w-screen">
      <div className="w-screen h-fit p-4 sm:px-8 border-2 border-b-gray-200">
        <Image src={"/P.png"} height={"60px"} width={"60px"} priority={true} />
      </div>
      <div className="flex flex-col justify-center px-6 max-w-md h-3/4 mx-auto">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-600">
            Sign In
          </h2>
          <p className="text-gray-500 my-6 sm:my-8">
            Use the LinkedIn account you'd like to post to and we'll post your
            content for you!
          </p>
        </div>
        <Button
          text={"Use LinkedIn"}
          accent={true}
          styles={"w-full"}
          onClick={() => {
            signInWithOAuth("LinkedIn");
          }}
        />
      </div>
    </div>
  );
}
