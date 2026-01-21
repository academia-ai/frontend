import { Link, useNavigate } from "react-router-dom";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
// import { useAuth as useAppAuth } from "../../context/authContext.jsx";
import { toast } from "react-hot-toast";
import { ChevronDown, Box, User, LogOut, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLogoutMutation, useUserQuery } from "../../queries/auth.queries.js";
import Loader from "../reuseable/loader.jsx";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const { isLoaded, isSignedIn, signOut } = useClerkAuth();
  const { user: clerkUser } = useUser();
const { data: appUser, isPending } = useUserQuery()

  const {  mutate } = useLogoutMutation()
  

  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  // const token  = !!localStorage.getItem('token')




  const user = isSignedIn ? clerkUser : appUser;
  const isAuthenticatedUser = isSignedIn || appUser ;

  
 if(!user){
  console.log('No user')
        navigate("/auth", { replace: true });
 }

  // console.log('clerkUser:', clerkUser);
  // console.log('Loggedin User:', appUser);

  // console.log('isAuthenticatedUser:', isAuthenticatedUser);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.relatedTarget)
      ) {
        setShowDropDown(false);
      }
    };

    const container = dropDownRef.current;
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  
  useEffect(() => {

    if (!isLoaded || isPending) return;

    if (!isAuthenticatedUser) {
      navigate("/auth", { replace: true });
    }
  }, [isLoaded, isPending, isAuthenticatedUser, navigate]);


  if (!isLoaded) {
    return;
  }

  if(isPending) {
    return <Loader />
  }

  const handleLogout = async () => {
    try {
      if (isSignedIn) {
        await signOut();
        setShowDropDown(false);
      } else {
      mutate();
        setShowDropDown(false);
      }

      toast.success("Logout successful");
      navigate("/auth");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  if (!isLoaded) return null;

  return (
    <section className=" bg-slate-950 text-white ">
    {showDropDown && (
  <div
    onClick={() => setShowDropDown(false)}
    className="fixed inset-0 z-10 bg-transparent"
  />
)}

      <header className="flex justify-between p-4 border-b border-slate-800">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-zinc-800 border border-white/10 flex items-center justify-center">
            <Box size={14} className="text-white" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-zinc-300">
            ACADEMIA.AI
          </span>
        </div>

        {/* DropDown */}
        <div className="relative">

          <button onClick={handleDropDown} className="flex gap-1 items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center 
        justify-center bg-zinc-800"
            >
              <h1 className="text-white font-semibold">
                {user.fullName  ? user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() : ''}
              </h1>
            </div>
            {showDropDown ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showDropDown && (
            <div ref={dropDownRef} className="relative">
              <div className="absolute top-full right-0 mt-2 max-w-44 rounded-md overflow-hidden">
                {/* Gradient shadow */}
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500
                 to-pink-500 filter blur-lg opacity-30 -z-10"></div>

                {/* Dropdown content */}
                <div className="relative z-500 bg-zinc-800 shadow-md 
                rounded-md p-3 flex flex-col gap-2">

                  <div className="flex flex-col  gap-1 cursor-pointer rounded-md p-1">

                    <span>{user?.fullName}</span>
                    <span className="text-xs">
         {isSignedIn ? clerkUser?.emailAddresses[0]?.emailAddress : user?.email}
                    </span>
                  </div>

                  <Link  to="/profile"
                  className="flex items-center gap-2 cursor-pointer rounded-md p-1">
                    <User />
                    <span>Profile</span>
                  </Link>

                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer  rounded-md p-1"
                  >
                    <LogOut color="red" />
                    <span className="text-red-500">Logout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </header>

      <main className="">{children}</main>
    </section>
  );
};

export default DashboardLayout;
