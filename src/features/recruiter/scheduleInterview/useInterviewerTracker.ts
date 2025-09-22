import { useState } from "react";
import type { Order } from "@/types/filters";
import type { EmployeeInterview } from "@/types/employee";

export function useInterviewerTracker() {
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof EmployeeInterview>(
    "created_at" as keyof EmployeeInterview
  );

  return {
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
