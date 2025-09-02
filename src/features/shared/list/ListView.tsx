import { Box, TablePagination } from "@mui/material";
import React from "react";

interface ListViewProps<T> {
  total: number;
  cards: T[];
  renderCard: (item: T) => React.ReactNode;
  rowsPerPageOptions: number[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

function ListView<T>({
  total,
  cards,
  renderCard,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}: ListViewProps<T>) {
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      {cards.map((item, index) => (
        <React.Fragment key={index}>{renderCard(item)}</React.Fragment>
      ))}

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => {
          const newLimit = parseInt(e.target.value, 10);
          onRowsPerPageChange(newLimit);
          onPageChange(1);
        }}
        rowsPerPageOptions={
          rowsPerPageOptions.length ? rowsPerPageOptions : [total || 5]
        }
      />
    </Box>
  );
}

export default ListView;
