"use client";

import { useState } from 'react';
import api from '@/lib/axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    console.log("🚀 Submit button clicked!");
    
    setIsSubmitting(true);
    setError("");

    try {
      console.log("📡 Sending request to Django...");
      const res = await api.post('/token/', { username, password });
      
      console.log("✅ Tokens received!", res.data);

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      
      // Using window.location.replace to break the "Auth Loop"
      window.location.replace("/"); 
      
    } catch (err: any) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h1>
        
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            required
            value={username}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full p-3 rounded-xl font-bold text-white transition-all ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
