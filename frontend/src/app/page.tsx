"use client"

import { useEffect } from "react";

const HomePage = () => {
  useEffect(()=>{
  console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

  },[])

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
    </div>
  );
};

export default HomePage;
