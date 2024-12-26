import axios from "axios";

// Login API
export const Loginservice = async (object, loginType) => {
  try {
    console.log("Payload Sent to API:", object); // Debugging step
    // Determine the API endpoint based on login type
    const endpoint = loginType === "Users" ? `/auth/login` : `/partner/login`;

    const response = await axios.post(endpoint, object, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Register API
// export const RegisterOnApp = async (object) => {
//   try {
//     const response = await axios.post(`/auth/signup`, object);
//     return response;
//   } catch (error) {
//     console.error("Signup API Error:", error);
//     throw error; // Rethrow to handle it in calling code
//   }
// };
