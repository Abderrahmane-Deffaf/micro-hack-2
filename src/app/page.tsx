import Image from "next/image";
import Link from "next/link";

/* import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyCFBj2GzwYz1q2OU-lYjzEbAZ3QC2dlhgA"; */

export default function Home() {
  /* const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(
    "resemue this text with only one option write just the result: JS typically refers to JavaScript, a high-level programming language commonly used for web development. JavaScript is often used to add interactivity and dynamic behavior to web pages. It is supported by most web browsers and can be integrated into HTML to create rich client-side experiences. JavaScript can also be used on the server-side, for example, with Node.js."
  );
  const response = result.response;
  console.log(response.text()); */

  return (
    <main className="flex gap-6">
      <Link href="/auth">login</Link>
    </main>
  );
}

/* 
const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer AIzaSyCFBj2GzwYz1q2OU-lYjzEbAZ3QC2dlhgA",
    },
  });
  const data = await response.json();
  console.log(data);
*/
