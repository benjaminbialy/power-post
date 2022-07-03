import { supabase } from "../../utils/supabaseClient.js";

const handler = (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
