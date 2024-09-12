import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
         // Log request headers to inspect the content-type and other request details
        console.log('Request Headers:', request.headers);

        // Attempt to parse the JSON body
        const { email } = await request.json();
        console.log('Email:', email);  // Log email for debugging

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Email is required and must be a string' }, { status: 400 });
        }

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwm0rArDzrsp4g84JKAVaXRAaPYPd1Gl6Y6Xio8PrIaPKBOCD7ye0rA6cpWRBUdUCQ-qQ/exec';

        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ 'email': email }).toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error from Google App Script:', errorText);  // Log error from Google App Script
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        return NextResponse.json({ message: 'Email successfully added to the waiting list!' });
    }    catch (error: any) {
        console.error('Error submitting email:', error.message);  // Log general error
        return NextResponse.json({ error: `Failed to submit email: ${error.message}` }, { status: 500 });
    }
}
