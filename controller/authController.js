import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key for backend access
);


export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json({ user: data.user });
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }
  res.status(200).json({ user: data.user, session: data.session });
};

// Google OAuth Start (Redirects to Google OAuth)
export const googleOAuthStart = (req, res) => {
  const redirectUrl = supabase.auth.getOAuthRedirectUrl({
    provider: 'google',
    options: { redirectTo: 'http://localhost:3000/auth/callback' }, // Redirect URL on frontend
  });
  res.redirect(redirectUrl);
};

// Google OAuth Callback (Handles token exchange)
export const googleOAuthCallback = async (req, res) => {
  const { code } = req.body;
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(200).json({ user: data.user, session: data.session });
};
