import { ChatGPTAPI } from "chatgpt";

const chatGPTAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendChatGPTMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const chatResponse = await chatGPTAPI.sendMessage(message);
    res.status(200).json({ response: chatResponse.text });
  } catch (error) {
    res.status(500).json({ error: "Error interacting with ChatGPT API." });
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { action } = req.body;
    if (action === "chatGPT") {
      await sendChatGPTMessage(req, res);
    } else {
      res.status(400).json({ error: "Invalid action parameter." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed. Use POST." });
  }
}
