import { host } from "../../constants";
export default async function Signin({ username, password }) {
  try {
    const response = await fetch(`${host}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error('Sign-in failed');
    }
    const data = await response.json();
    // console.log(data, "HELIIIIIIII");
     localStorage.setItem('token', data.access_token);

    return data;
  } catch (error) {
    console.log('error return');
    throw error;
  }
}
