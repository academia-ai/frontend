import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Loader from "../components/reuseable/loader";
import {useUser} from '@clerk/clerk-react'


export default function SSOCallback() {
  const {user} = useUser();

  console.log("SSO Callback User:", user);
  // if(loading) return <Loader  />;
  return <AuthenticateWithRedirectCallback     redirectUrlComplete="/dashboard" />;
}
