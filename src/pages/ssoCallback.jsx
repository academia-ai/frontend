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

import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Loader from "../components/reuseable/loader";

export default function SSOCallback() {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Loader /> 
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
