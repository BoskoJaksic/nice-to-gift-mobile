export interface Authentication {
  access_token: string
  expires_in: bigint
  refresh_expires_in: bigint
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}
