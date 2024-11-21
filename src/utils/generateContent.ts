import axios from "axios";

export const generateContent = async (prompt: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an educational assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0]?.message?.content.trim() || null;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("API call error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
