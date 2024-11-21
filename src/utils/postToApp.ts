import axios from "axios";

export const postToApp = async (content: string, retries: number = 3): Promise<void> => {
  let attempts = 0;
  let token: string | null = null;

  while (attempts < retries) {
    try {
      // Authenticate if token is null
      if (!token) {
        const loginResponse = await axios.post(`${process.env.APP_LOGIN_URL}/login`, {
          username: process.env.APP_USERNAME,
          password: process.env.APP_PASSWORD,
        });
        token = loginResponse.data.token;
        console.log("Authentication successful, token obtained.");
      }
console.log(token, attempts)
      // Post content
      await axios.post(
        `${process.env.APP_LOGIN_URL}/create-quill`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Content posted successfully.");
      return; // Exit if successful
    } catch (error: any) {
      attempts++;
      console.error(`Error posting content (attempt ${attempts}/${retries}):`, error.message);

      // Invalidate token on 401 (unauthorized) and retry
      if (error.response?.status === 401) {
        token = null;
        console.error("Token expired, re-authenticating...");
      }
    }
  }

  throw new Error("Failed to post content after multiple attempts.");
};
