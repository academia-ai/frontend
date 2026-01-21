import { Trash2, Pencil, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { useRemoveProjectQuery } from "../../../queries/project.queries";
import { toast } from "sonner";
import { useState } from "react";

const ProjectCard = ({ data }) => {
  const { mutateAsync, isPending } = useRemoveProjectQuery(data._id);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // control dialog

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success("Deleted successfully");
      setIsDialogOpen(false); // close the dialog
      console.log("Project deleted!");
    } catch (error) {
      console.log("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="relative h-76 w-full rounded-xl overflow-hidden p-2
     group shadow-lg cursor-pointer bg-white/85 hover:bg-white/90">
      {/* Icons */}
      <div className="absolute top-3 right-3 gap-2 z-20 hidden group-hover:flex">
        <Link
          to={`/editor/${data._id}`}
          className="p-2 bg-black/50 rounded-full text-white hover:bg-black"
        >
          <Pencil size={14} />
        </Link>

        {/* Delete Dialog */}
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <button className="p-2 bg-black/50 text-red-400 hover:bg-black rounded-full cursor-pointer">
              <Trash2 size={14} />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            {/* Overlay */}
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />

            {/* Modal Content */}
            <Dialog.Content className="fixed top-1/2 left-1/2 w-96 p-6 bg-[#09090b] rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2">
              <Dialog.Title className="text-lg text-zinc-400 font-bold">
                Confirm Delete
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-zinc-400 text-center">
                Are you sure you want to delete{" "}
                <span className="font-bold">"{data.title}"</span>?
              </Dialog.Description>

              <div className="mt-4 flex justify-end gap-2">
                <Dialog.Close
                  className="text-zinc-600 bg-gray-300 px-4 cursor-pointer font-medium text-sm py-2.5 rounded-lg transition-colors mt-2
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Cancel
                </Dialog.Close>

                <button
                  disabled={isPending}
                  onClick={handleDelete}
                  className="text-white bg-red-600 px-4 cursor-pointer font-medium text-sm py-2.5 rounded-lg transition-colors mt-2
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin mr-2" size={16} />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>

              {/* Optional close icon */}
              <Dialog.Close className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200">
                ✕
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Text */}
      <Link
        to={`/project/${data._id}`}
        className="flex flex-col items-center justify-center w-full h-full gap-1"
      >
        <h3 className="text-zinc-900 font-semibold text-xl text-center">{data.title}</h3>
        <p className="text-zinc-900 font-medium text-sm text-center w-full">
          {data.desc.slice(0, 120) + "...."}
        </p>
        <p className="text-zinc-900 text-xs">by {data.author}</p>
      </Link>
    </div>
  );
};

export default ProjectCard;
