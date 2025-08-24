import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Supabase and Gemini clients
const supabaseAdmin = supabase;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { question, pdfName, userId } = await req.json();

    // 1. Convert the user's question into a vector embedding
    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });
    const questionEmbedding = await embeddingModel.embedContent(question);

    // 2. Call our custom database function to find relevant text chunks
    //    This search is filtered to ONLY look within the specified PDF.
    const { data: documents, error } = await supabaseAdmin.rpc(
      "match_documents_for_file",
      {
        query_embedding: questionEmbedding.embedding.values,
        match_threshold: 0.7, // How similar the content should be (adjust as needed)
        match_count: 5, // How many chunks to retrieve
        source_file_filter: `users/${userId}/uploads/${pdfName}`, // The crucial filter
      }
    );

    if (error) {
      throw error;
    }

    // 3. Combine the retrieved text chunks into a single string of context
    const contextText = documents.map((doc) => doc.content).join("\n---\n");

    // 4. Create a prompt and send it to the Gemini Pro model
    const generativeModel = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
    });
    const prompt = `
      You are an expert assistant. Based ONLY on the following context from the document named "${pdfName}", answer the user's question.
      If the answer cannot be found in the context, clearly state "I couldn't find information about that in this document."

      CONTEXT:
      ${contextText}

      QUESTION:
      ${question}
    `;

    const result = await generativeModel.generateContent(prompt);
    const answer = await result.response.text();

    // 5. Send the generated answer back to the frontend
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An error occurred on the server." },
      { status: 500 }
    );
  }
}
