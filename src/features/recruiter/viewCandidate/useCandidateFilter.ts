import { useState } from "react";
import type { Application } from "@/types/applicaiton";
import type { Order } from "@/types/filters";

export function useCandidateFilter() {
  const [viewMode, setViewMode] = useState<"table" | "list">("table");
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Application>("created_at");

  return {
    viewMode,
    setViewMode,
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
