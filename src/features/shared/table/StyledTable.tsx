import {
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  type Theme,
} from "@mui/material";

interface StyledCellProps {
  noEllipsis?: boolean;
  sticky?: "left" | "right";
  hoverable?: boolean;
}

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) =>
    prop !== "noEllipsis" && prop !== "sticky" && prop !== "hoverable",
})<StyledCellProps>(({ theme, noEllipsis, sticky, hoverable }) => {
  const commonStickyStyles = {
    position: "sticky" as const,
    zIndex: 3,
    backgroundColor: theme.palette.background.paper,
  };

  return {
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
      ...commonStickyStyles,
      left: 0,
    }),
    ...(sticky === "right" && {
      ...commonStickyStyles,
      right: 0,
    }),
  };
});

export const StyledTableRow = styled(TableRow)(
  ({ theme }: { theme: Theme }) => ({
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
      backgroundColor: `${theme.palette.action.selected}10`,
    },
  })
);
