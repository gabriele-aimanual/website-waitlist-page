import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const email = formData.get('email');
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwm0rArDzrsp4g84JKAVaXRAaPYPd1Gl6Y6Xio8PrIaPKBOCD7ye0rA6cpWRBUdUCQ-qQ/exec';

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ 'email': email }).toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        return NextResponse.json({ message: 'Email successfully added to the waiting list!' });
    } catch (error: any) {
        console.error('Error submitting email:', error.message);
        return NextResponse.json({ error: `Failed to submit email: ${error.message}` }, { status: 500 });
    }
}
