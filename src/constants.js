export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJAbWVzYXkiLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwiaXNzIjoiaHR0cDovLzEwLjEuMTc3LjEyMTo5MDEwL2xvZ2luIiwiZXhwI \
                            joxNjk1MzkyMTk2fQ.tinxYFPcJok5JjnwXo3QQOIPrM-fhhMOi2w5vSEWmkI";
export const host = "http://localhost:9010";
// export const host = "http://10.1.177.121:9010";

export const redirectUri = "http://localhost:3000/oauth2/redirect";
export const GOOGLE_AUTH_URL = host + "/oauth2/authorize/google?redirect_uri=" + redirectUri;


export const configHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};
