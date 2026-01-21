import { Search, X } from "lucide-react";
import { useSearchProjectQuery } from "../../../queries/project.queries";
import { useState, useEffect } from "react";

const DashboardSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");


  const { data, isFetching, error } = useSearchProjectQuery(searchTerm, !!searchTerm);

 
  useEffect(() => {
    if (data && onSearchResults) {
      onSearchResults(data);
    }
  }, [data, onSearchResults]);

  const handleClear = () => {
    setSearchTerm("");
    if (onSearchResults) onSearchResults(null); 
  };

  return (
    <div className="relative w-full flex items-center mb-4">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full h-10 md:h-14 pl-10 pr-10 rounded-lg bg-zinc-900/60 border border-zinc-700 text-sm text-white
          placeholder:text-zinc-500
          focus:outline-none
          focus:ring-2
          focus:ring-pink-500/40
        "
      />

      {searchTerm && (
        <span
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400"
        >
          <X size={18} />
        </span>
      )}

      {isFetching && (
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-zinc-400 text-sm hidden">
          Searching...
        </span>
      )}

      {error && <p className="text-red-400 mt-1 text-sm hidden">Error searching projects</p>}
    </div>
  );
};

export default DashboardSearch;
