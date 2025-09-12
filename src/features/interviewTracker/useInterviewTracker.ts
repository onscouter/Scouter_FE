import { useState } from "react";
import type { Job, Order } from "@/types/job";

export function useInterviewTracker() {
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Job>("title");

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
