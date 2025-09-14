import React from "react";
import { TableRow, TableSortLabel, Box } from "@mui/material";
import { StyledTableCell } from "@/features/shared/table/StyledTable";
import { visuallyHidden } from "@mui/utils";

export interface HeadCell {
  id: string;
  label: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  sticky?: "left" | "right";
  sortable?: boolean;
}

interface TableHeaderProps<T> {
  headCells: HeadCell[];
  order: "asc" | "desc";
  orderBy: keyof T;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

function TableHeader<T>({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: TableHeaderProps<T>) {
  return (
    <TableRow>
      {headCells.map((cell) => (
        <StyledTableCell
          key={cell.id}
          align={cell.align ?? "left"}
          sticky={cell.sticky}
          sx={{
            width: cell.width,
            minWidth: cell.width,
            position: cell.sticky ? "sticky" : "static",
            right:
              cell.sticky === "right"
                ? cell.id === "decision"
                  ? 50
                  : 0
                : undefined,
            left: cell.sticky === "left" ? 0 : undefined,
            zIndex: cell.sticky ? 3 : undefined,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderLeft:
              cell.id.startsWith("eval:") ||
              cell.id === "averageScore" ||
              cell.id === "decision"
                ? (theme) => `1px solid ${theme.palette.divider}`
                : undefined,
          }}
          sortDirection={orderBy === cell.id ? order : false}
        >
          {cell.sortable === false ? (
            cell.label
          ) : (
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={(e) => onRequestSort(e, cell.id as keyof T)}
            >
              {cell.label}
              {orderBy === cell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          )}
        </StyledTableCell>
      ))}
    </TableRow>
  );
}

export default TableHeader;
