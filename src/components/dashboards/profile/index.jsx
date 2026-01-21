import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useUser } from '@clerk/clerk-react';
import { useUserQuery } from '../../../queries';
import { X } from 'lucide-react';

const ProfileIndex = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const token = !!localStorage.getItem('token');

  const { data: appUser, isPending } = useUserQuery(token);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (!isLoaded || isPending) {
    return <p className="text-zinc-400">Loading profile...</p>;
  }

  return (
    <section className="flex flex-col gap-8 max-w-2xl">

      {/* ================= USER INFO ================= */}
      <div className="border border-zinc-700 rounded-lg p-6 bg-zinc-900">
        <h2 className="text-xl font-semibold text-white mb-4">
          Profile Information
        </h2>

        <div className="space-y-2 text-zinc-300 text-sm">
          <p><span className="text-zinc-400">Full Name:</span> {appUser?.name || clerkUser?.fullName}</p>
          <p><span className="text-zinc-400">Email:</span> {appUser?.email || clerkUser?.primaryEmailAddress?.emailAddress}</p>
          <p><span className="text-zinc-400">Role:</span> {appUser?.role || 'User'}</p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="px-4 py-2 rounded-md bg-red-900/30 border border-red-700 text-sm text-red-400 hover:bg-red-900/50"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* ================= EDIT PROFILE DIALOG ================= */}
      <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 border border-zinc-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-white">
                Update Profile
              </Dialog.Title>

              <Dialog.Close>
                <X className="text-zinc-400 hover:text-white" />
              </Dialog.Close>
            </div>

            {/* FORM */}
            <form className="space-y-4">
              <input
                type="text"
                defaultValue={appUser?.name}
                placeholder="Full Name"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm"
              />

              <input
                type="email"
                defaultValue={appUser?.email}
                placeholder="Email"
                disabled
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm opacity-60 cursor-not-allowed"
              />

              <button
                type="submit"
                className="w-full py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-zinc-200"
              >
                Save Changes
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ================= DELETE CONFIRMATION DIALOG ================= */}
      <Dialog.Root open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 border border-zinc-700 p-6">
            <Dialog.Title className="text-lg font-semibold text-red-400 mb-2">
              Delete Account
            </Dialog.Title>

            <Dialog.Description className="text-sm text-zinc-400 mb-6">
              This action is permanent and cannot be undone.
            </Dialog.Description>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                className="flex-1 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
              >
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
