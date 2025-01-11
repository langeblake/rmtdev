import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { JobItem, PageDirection, SortBy } from "../lib/types";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  jobItemsSortedAndSliced: JobItem[];
  sortBy: "relevant" | "recent";
  handlePagination: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
   const { debouncedSearchText } = useSearchTextContext();
  
    // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"relevant" | "recent">("relevant");

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(() => {
    return [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [jobItems, sortBy]);

  const jobItemsSortedAndSliced = useMemo(() => {
    return jobItemsSorted.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    );
  }, [jobItemsSorted, currentPage]);

  // event handlers / actions

  const handlePagination = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(() => ({
    jobItems,
    isLoading,
    currentPage,
    totalNumberOfPages,
    totalNumberOfResults,
    jobItemsSortedAndSliced,
    sortBy,
    handlePagination,
    handleChangeSortBy,
  }), [
    jobItems,
    isLoading,
    currentPage,
    totalNumberOfPages,
    totalNumberOfResults,
    jobItemsSortedAndSliced,
    sortBy,
    handlePagination,
    handleChangeSortBy,
  ]);

  return (
    <JobItemsContext.Provider
      value={contextValue}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
