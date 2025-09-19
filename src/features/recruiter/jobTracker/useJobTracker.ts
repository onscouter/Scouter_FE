import { useState } from "react";
import type { JobStatus, Job } from "@/types/job";
import type { Order } from "@/types/filters";

export function useJobTracker() {
  const [viewMode, setViewMode] = useState<"table" | "list">("table");
  const [jobStatus, setJobStatus] = useState<JobStatus>("ALL");
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Job>("title");

  return {
    viewMode,
    setViewMode,
    jobStatus,
    setJobStatus,
    searchText,
    setSearchText,
    searchInput,
    setSearchInput,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    order,
    setOrder,
    orderBy,
    setOrderBy,
  };
}
