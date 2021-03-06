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
        const status = await fetch("/api/saveSessionCookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
      } else if (event == "SIGNED_OUT") {
        const status = await fetch("/api/removeSessionCookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
      }

      setSession(session);
    });
  };

  useEffect(() => {
    handleSessionData();
  }, []);

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </>
  );
}
