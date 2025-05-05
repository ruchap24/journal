-- Function to decrement user credits
CREATE OR REPLACE FUNCTION decrement_user_credits(
  user_id UUID,
  provider_name TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_credits
  SET credits = GREATEST(credits - 1, 0)
  WHERE user_id = decrement_user_credits.user_id
  AND provider = decrement_user_credits.provider_name;
END;
$$;