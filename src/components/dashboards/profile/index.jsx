import React, { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate, Link } from "react-router-dom";
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { ChevronDown, ChevronUp, LogOut, User, Box, X } from "lucide-react";
import { toast } from "sonner";
import { useLogoutMutation, useUserQuery } from "../../../queries";
import Footer from "../../reuseable/footer";
import { CornerDownLeft } from "lucide-react";


const ProfileIndex = () => {
  const navigate = useNavigate();
  const dropDownRef = useRef(null);

  /* -------------------- AUTH -------------------- */
  const { isLoaded, isSignedIn, signOut } = useClerkAuth();
  const { user: clerkUser } = useUser();

  const token = !!localStorage.getItem("token");
  const { data: appUser, isPending } = useUserQuery(token);
  const { mutate: logoutBackend } = useLogoutMutation();

  const user = isSignedIn ? clerkUser : appUser;
  const isAuthenticated = isSignedIn || !!appUser;

  /* -------------------- UI STATE -------------------- */
  const [showDropDown, setShowDropDown] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /* -------------------- REDIRECT -------------------- */
  useEffect(() => {
    if (!isLoaded || isPending) return;

    if (!isAuthenticated) {
      navigate("/auth", { replace: true });
    }
  }, [isLoaded, isPending, isAuthenticated, navigate]);

  /* -------------------- DROPDOWN CLOSE -------------------- */
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.relatedTarget)
      ) {
        setShowDropDown(false);
      }
    };

    const el = dropDownRef.current;
    if (el) el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (el) el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = async () => {
    try {
      if (isSignedIn) {
        await signOut();
      } else {
        logoutBackend();
      }

      localStorage.removeItem("token");
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  if (!isLoaded || isPending) {
    return <p className="text-zinc-400">Loading profile...</p>;
  }

  if (!user) return null;

  const initials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";

  return (
    <section className="flex flex-col gap-8 w-full bg-slate-950 h-screen relative">

 
      <header className="flex justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-zinc-800 border border-white/10 flex items-center justify-center">
            <Box size={14} color="white" />
          </div>
          <span className="text-xs font-semibold text-zinc-300">
            ACADEMIA.AI
          </span>
        </div>

        {/* ================= DROPDOWN ================= */}
        <div className="relative" ref={dropDownRef}>

          <button
            onClick={() => setShowDropDown((p) => !p)}
            className="flex gap-2 items-center"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="font-semibold text-zinc-400">{initials}</span>
            </div>
            {showDropDown ? <ChevronUp color="white" /> 
            : <ChevronDown color="white" />}
          </button>

          {showDropDown && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-zinc-800 p-3 shadow">

          <div className="flex flex-col  gap-1 cursor-pointer rounded-md p-1">

                    <span className="text-white">{user?.fullName}</span>
                    <span className="text-xs text-zinc-400">
         {isSignedIn ? clerkUser?.emailAddresses[0]?.emailAddress : user?.email}
                    </span>
                  </div>

              <Link  to="/profile"
           className="flex items-center gap-2 cursor-pointer rounded-md p-1 text-white">
                                <User />
                                <span>Profile</span>
                              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 w-full text-left text-red-400 hover:bg-zinc-700 rounded"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

    <div className="min-h-[50vh] w-full flex flex-col gap-5">
          <div className='flex items-center  gap-2 p-3 cursor-pointer'>
                      <CornerDownLeft color='white' size={14} />
                  <span
                  onClick={() => navigate(-1)}
                   className='text-zinc-300 text-sm cursor-pointer'>Back to  Dashboard </span>
                  </div>

      <div className="border border-zinc-700 rounded-lg m-3 bg-zinc-900
        md:m-8 
      p-4">
        <h2 className="text-xl text-zinc-400 font-semibold mb-4">Profile Information</h2>

        <div className="space-y-2 text-sm text-zinc-300">
          <p>
            <span className="text-zinc-400">Full Name:</span>{" "}
            {appUser?.fullName || clerkUser?.fullName}
          </p>
          <p>
            <span className="text-zinc-400">Email:</span>{" "}
            {appUser?.email ||
              clerkUser?.primaryEmailAddress?.emailAddress}
          </p>
          <p>
            {/* <span className="text-zinc-400">Role:</span>{" "}
            {appUser?.role || "User"} */}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-2 rounded bg-zinc-800 text-white hover:bg-zinc-700"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>

      </div>

<div className="absolute bottom-0 left-0 w-full">
<Footer  />
</div>
 
      <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-6 rounded w-full max-w-md">
            <div className="flex justify-between mb-4">
              <Dialog.Title>Update Profile</Dialog.Title>
              <Dialog.Close>
                <X />
              </Dialog.Close>
            </div>

            <form className="space-y-4">
              <input
                defaultValue={appUser?.name}
                className="w-full p-2 rounded bg-zinc-800"
                placeholder="Full Name"
              />
              <input
                disabled
                defaultValue={appUser?.email}
                className="w-full p-2 rounded bg-zinc-800 opacity-50"
              />
              <button className="w-full bg-white text-black py-2 rounded">
                Save Changes
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ================= DELETE DIALOG ================= */}
      <Dialog.Root open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-6 rounded w-full max-w-sm">
            <Dialog.Title className="text-red-400">
              Delete Account
            </Dialog.Title>
            <Dialog.Description className="text-sm text-zinc-400 mt-2">
              This action cannot be undone.
            </Dialog.Description>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 bg-zinc-800 py-2 rounded"
              >
                Cancel
              </button>
              <button className="flex-1 bg-red-600 py-2 rounded">
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default ProfileIndex;
