'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to showSchools page
    router.push('/showSchools');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center bg-gray-900 rounded-2xl p-8 shadow-2xl animate-float">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto"></div>
        <p className="mt-6 text-white text-lg font-medium">Redirecting to schools directory...</p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}