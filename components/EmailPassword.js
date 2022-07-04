import React, { useState } from "react";
import Button from "./Buttons/Button";
import { supabase } from "../utils/supabaseClient.js";
import TextInput from "./Inputs/TextInput";

// sign in/up form with email and password
function EmailPassword({ isNew }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleUserAuth(e) {
    setLoading(true);
    e.preventDefault();

    if (isNew) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error);
      }

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .insert([{ user_id: user.id, email: email }]);
      }
    } else {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) {
        setError(error);
      }
    }

    setLoading(false);
  }
  return (
    <>
      <div>
        <div>{error.message}</div>
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          Email address{" "}
        </label>
        <div className="mt-1">
          <TextInput
            type={"email"}
            value={email}
            setValue={setEmail}
            required={true}
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-600">
          {" "}
          Password{" "}
        </label>
        <div className="mt-1">
          <TextInput
            type={"password"}
            value={password}
            setValue={setPassword}
            required={true}
          />
        </div>
      </div>

      <div>
        <Button
          onClick={(e) => handleUserAuth(e)}
          text={"Sign" + (isNew ? " up" : " in")}
          styles={"w-full"}
          accent={true}
          loading={loading}
        />
      </div>
    </>
  );
}

export default EmailPassword;
