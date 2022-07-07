import React, { useState } from "react";
import Button from "../Buttons/Button";
import EmailPassword from "../EmailPassword";
import { supabase } from "../../utils/supabaseClient";

export default function Auth() {
  const [isNew, setIsNew] = useState(true);

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
    <div className="flex min- overflow-hidden bg-white w-2/5">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <Button
          text={"Sign " + (isNew ? "in" : "up")}
          onClick={() => setIsNew((prev) => !prev)}
        />
        <div className="w-full max-w-xl mx-auto lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
              Sign {isNew ? "up" : "in"}
            </h2>
          </div>
          <div className="mt-14">
            <form className="space-y-6">
              <EmailPassword isNew={isNew} />
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-600">
                    {" "}
                    Or continue with{" "}
                  </span>
                </div>
              </div>
            </form>
            <div>
              <Button
                text={"LinkedIn"}
                styles={"w-full mt-6"}
                onClick={() => {
                  signInWithOAuth("LinkedIn");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
