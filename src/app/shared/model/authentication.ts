export interface Authentication {
  access_token: String
  expires_in: bigint
  refresh_expires_in: bigint
  refresh_token: String;
  scope: String;
  session_state: String;
  token_type: String;
}
