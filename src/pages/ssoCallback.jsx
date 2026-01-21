
// import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
// import Loader from "../components/reuseable/loader";
// import {useUser} from '@clerk/clerk-react'


// export default function SSOCallback() {
//   const {user} = useUser();

//   console.log("SSO Callback User:", user);
//   // if(loading) return <Loader  />;
//   return <AuthenticateWithRedirectCallback     redirectUrlComplete="/dashboard" />;
// }

// SSOCallback.jsx
// sso-callback.jsx (or .tsx)

import { useEffect, useState } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Loader from "../components/reuseable/loader";
import { toast } from "sonner";

export default function SSOCallback() {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
 
    const timer = setTimeout(() => {
      setTimedOut(true);
      toast.error("Login failed. Please try again.");
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  if (timedOut) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Login failed. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Loader />
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
