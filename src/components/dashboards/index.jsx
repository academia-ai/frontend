import React, { useState } from "react";
import DashboardLayout from "../layouts/dashboardLayout";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import DashboardSearch from "./home/search";
import Pagination from "../reuseable/paginaton";
import ProjectCard from "./home/card";
import Footer from "../reuseable/footer";
import { Sheet } from "../ui/sheet";
import CreateProject from "./home/createProject";
import { useFetchProjectQuery } from "../../queries/project.queries";

const DashboardIndex = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);

  const { data, isPending } = useFetchProjectQuery({
    page,
    limit: 10,
  });

  const totalPages = Math.ceil(data?.totalPage ?? 1);

  console.log("All Project Data:", data);

  const projectsToDisplay = searchResults ?? data?.project ?? [];

  return (
    <DashboardLayout>
      <section className="flex flex-col gap-16 z-100 p-4 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              All Projects
            </h2>
            <p className="text-zinc-400 md:text-sm md:max-w-2xl">
              Create, edit and manage all your <br className=" hidden" /> AI-generated eProjects
            </p>
          </div>

          <motion.button
            onClick={() => setIsDrawerOpen(true)}
            whileHover={{ scale: 1.05, backgroundColor: "#27272a" }}
            whileTap={{ scale: 0.95 }}
            className="h-10 px-2 md:px-6 rounded-md border border-zinc-700 cursor-pointer
              bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all  text-sm font-medium
               flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Create New eProject
          </motion.button>
        </div>

        {/* Search */}
        <DashboardSearch onSearchResults={setSearchResults} />

        {/* RADIX SHEET */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <div className="h-dvh overflow-y-auto hide-scrollbar">
            <CreateProject onClose={() => setIsDrawerOpen(false)} />
          </div>
        </Sheet>

        {/* Loading Skeleton */}
        <div className="space-x-1 flex flex-col md:flex-row -mt-15">
          {isPending &&
            Array.from({ length: 1 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!isPending && projectsToDisplay.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-15 border-dotted border rounded-lg">
              <h3 className="text-2xl font-semibold text-zinc-400">
                No projects yet
              </h3>
              <p className="text-zinc-400 text-sm">
                Create your first AI project to get started
              </p>

              <motion.button
                onClick={() => setIsDrawerOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: "#27272a" }}
                whileTap={{ scale: 0.95 }}
                className="h-10 px-2 md:px-6 rounded-md border border-zinc-700 cursor-pointer
                  bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all  text-sm font-medium
                   flex items-center gap-2 max-w-80 mt-5"
              >
                <Plus size={16} />
                Create New eProject
              </motion.button>
            </div>
          ) : (
            projectsToDisplay.map((item) => (
              <ProjectCard key={item._id} data={item} />
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardIndex;

// Skeleton Cards for loading state
const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="h-56 rounded-xl bg-zinc-800 animate-pulse" />
      <div className="h-56 rounded-xl bg-zinc-800 animate-pulse" />
      <div className="h-56 rounded-xl bg-zinc-800 animate-pulse" />
      <div className="h-56 rounded-xl bg-zinc-800 animate-pulse" />
    </div>
  );
};
