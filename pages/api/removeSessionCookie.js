import { supabase } from "../../utils/supabaseClient.js";

const handler = (req, res) => {
  supabase.auth.api.deleteAuthCookie(req, res, { redirectTo: "/" });
};

export default handler;
