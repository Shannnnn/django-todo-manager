"use client";
import { useState } from 'react';
import api from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/token/', { username, password });
      login(res.data.access, res.data.refresh);
      router.push('/'); // Redirect to home after login
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login to Todo Manager</h1>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
    </div>
  );
}
