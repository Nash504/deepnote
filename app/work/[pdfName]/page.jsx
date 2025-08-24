import ChatInterface from "@/components/dashboard/ChatInterface"; // Adjust path if needed

// This Server Component grabs the file name from the URL
export default function PdfChatPage({ params }) {
  // We decode the file name to handle spaces or special characters like '%20'
  const pdfName = decodeURIComponent(params.pdfName);

  return (
    <div>
      {/* The file name is passed as a prop to our chat UI */}
      <ChatInterface pdfName={pdfName} />
    </div>
  );
}
