import { host } from "../../constants";
export default async function Signup({ fullName, username, password, gender, phoneNum, email, birthDate }) {
  try {
    const response = await fetch(`${host}/manageAdmins/signUp`, {
      method: 'POST',
      body: JSON.stringify({
        fullName: fullName,
        username: username,
        password: password,
        birthDate: birthDate,
        gender: gender,
        email: email,
        phoneNum: phoneNum
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const status = response.status; // Get the HTTP status code
    const data = await response.json();

    console.log("Status code:", status);
    console.log("Data:", data);

    return { status, data };
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}