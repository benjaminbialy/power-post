import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";
import Auth from "../components/Home/Auth";
import Account from "../components/Home/Account";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    console.log(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
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
