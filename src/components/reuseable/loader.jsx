import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">

      <div className="loader">
    
      <p className=" animate-spin  text-indigo-500">  <Loader2 size={24}/>  </p>

      </div>

    </div>
  );
};

export default Loader;