export async function POST(req) {
    const { question_paper_url } = await req.json();
    
    try {
        const response = await fetch('http://localhost:5000/get_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question_url: "https://xbcezaheqpgbffmcxjdr.supabase.co/storage/v1/object/public/question-papers/users/OST_UNIT_III_Questions.pdf"
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to get answer' }, { status: 500 });
    }
}
