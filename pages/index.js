import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";
import Auth from "../components/Auth";
import Account from "../components/Account";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log(supabase);
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="flex justify-center bg-neutral-700 pt-12 pb-24 min-h-screen w-screen">
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
