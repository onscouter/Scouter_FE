import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) =>
    prop !== "noEllipsis" && prop !== "sticky" && prop !== "hoverable",
})<{
  noEllipsis?: boolean;
  sticky?: "left" | "right";
  hoverable?: boolean;
}>(({ theme, noEllipsis, sticky, hoverable }) => ({
  ...(noEllipsis
    ? {}
    : {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
      }),
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: "0.85rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    padding: "12px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.875rem",
    padding: "14px 16px",
    verticalAlign: "middle",
    ...(hoverable && {
      transition: "background-color 0.2s ease",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        cursor: "pointer",
      },
    }),
  },
  ...(sticky === "left" && {
    position: "sticky",
    left: 0,
    zIndex: 3,
    backgroundColor: theme.palette.background.paper,
  }),
  ...(sticky === "right" && {
    position: "sticky",
    right: 0,
    zIndex: 3,
    backgroundColor: theme.palette.background.paper,
  }),
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  "& td": {
    paddingTop: 12,
    paddingBottom: 12,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.selected + "10",
  },
}));
