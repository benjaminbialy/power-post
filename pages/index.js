import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";
import Auth from "../components/Home/Auth";
import Account from "../components/Home/Account";
import axios from "axios";
import Button from "../components/Buttons/Button.js";

export default function Home() {
  const [session, setSession] = useState(null);

  const handleSessionData = () => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "SIGNED_IN") {
        await fetch("/api/saveSessionCookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
      } else if (event == "SIGNED_OUT") {
        // add remove cookie
      }

      setSession(session);
    });
  };

  useEffect(() => {
    handleSessionData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen w-screen">
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
