import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function POST(req) {
  const { question, pdfUrl } = await req.json();

  if (!pdfUrl) {
    return NextResponse.json({ error: "No PDF URL provided" }, { status: 400 });
  }

 const pdfResp = await fetch(pdfUrl)
        .then((response) => response.arrayBuffer());

      const contents = [
        { text: question + "\nAnswer the question based on the context provided from the PDF. And your a chat with pdf bot" },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(pdfResp).toString("base64")
            }
        }
    ];
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(contents);
  const reply = result.response.text();
console.log("Reply from Gemini:", reply);
  return NextResponse.json({ answer: reply });
}
