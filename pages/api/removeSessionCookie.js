import { supabase } from "../../utils/supabaseClient.js";

const handler = (req, res) => {
  supabase.auth.api.deleteAuthCookie(req, res);
};

export default handler;
