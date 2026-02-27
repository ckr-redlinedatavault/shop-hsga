'use server';

import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        // In a real app, you'd set a session cookie here
        // For now, we'll just redirect to the dashboard
        redirect('/admin/dashboard');
    } else {
        return { error: 'Invalid admin credentials' };
    }
}
