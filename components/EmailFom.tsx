'use client';
import { useState } from 'react';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Reset message

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: new URLSearchParams({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Thank you for joining our waiting list!');
            } else {
                setMessage(result.error || 'Failed to submit email');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="text-center">
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
            />
            <button type="submit" className="btn btn-primary">
                Join the Waiting List
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default EmailForm;
