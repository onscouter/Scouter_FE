import { Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/features/shared/table/StyledTable";
import EvaluationCell from "./EvaluationCell";
import type { ApplicationOut } from "../api";
import theme from "@/styles/theme";
import type React from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface CandidateTableRowProps {
  candidate: ApplicationOut;
  headCells: {
    id: string;
    label: string;
    sticky?: "left" | "right";
    width?: number | string;
    align?: "left" | "center" | "right";
  }[];
}

function formatPhoneNumberIntl(countryCode: string, number: string): string {
  const phoneNumber = parsePhoneNumberFromString(`${countryCode}${number}`);
  return phoneNumber
    ? phoneNumber.formatInternational()
    : `${countryCode} ${number}`;
}

const CandidateTableRow: React.FC<CandidateTableRowProps> = ({
  candidate,
  headCells,
}: CandidateTableRowProps) => {
  const validScores = candidate.interviews
    .map((i) => i.score)
    .filter((s): s is number => s !== null && s !== undefined);

  const averageScore =
    validScores.length > 0
      ? Number(
          (
            validScores.reduce((sum, s) => sum + s, 0) / validScores.length
          ).toFixed(1)
        )
      : null;
  return (
    <StyledTableRow>
      {headCells.map((cell) => {
        const { id, sticky, width, align = "left" } = cell;

        if (id === "full_name") {
          return (
            <StyledTableCell
              key={id}
              sticky={sticky}
              noEllipsis
              align={align}
              sx={{ minWidth: width }}
            >
              <Typography fontWeight={600} fontSize="0.95rem" gutterBottom>
                {candidate.candidate.full_name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {candidate.candidate.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPhoneNumberIntl(
                  candidate.candidate.phone_number.country_code,
                  candidate.candidate.phone_number.number
                )}
              </Typography>
            </StyledTableCell>
          );
        }
        if (id.startsWith("eval:")) {
          const competencyName = id.replace("eval:", "");
          const evaluation = candidate.interviews.find(
            (e) => e.competency.name === competencyName
          );

          return (
            <StyledTableCell
              key={id}
              sticky={sticky}
              align={align}
              sx={{
                minWidth: width,
                borderLeft: `1px solid ${theme.palette.divider}`,
                pl: 2,
                pr: 2,
              }}
            >
              {evaluation ? (
                <EvaluationCell evaluation={evaluation} />
              ) : (
                <Typography color="text.disabled" align="center">
                  —
                </Typography>
              )}
            </StyledTableCell>
          );
        }

        if (id === "averageScore") {
          return (
            <StyledTableCell
              key={id}
              sticky={sticky}
              align={align}
              noEllipsis
              sx={{
                minWidth: width,
                right: 140,
                borderLeft: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Chip
                label={averageScore ?? "N/A"}
                size="small"
                sx={{
                  backgroundColor:
                    averageScore === null
                      ? "#E5E7EB"
                      : averageScore >= 4
                      ? "#34D399"
                      : averageScore >= 3
                      ? "#FBBF24"
                      : "#F87171",

                  color: "#fff",
                  fontWeight: 600,
                  px: 1.5,
                  fontSize: "0.75rem",
                  borderRadius: 1,
                }}
              />
            </StyledTableCell>
          );
        }

        if (id === "decision") {
          return (
            <StyledTableCell
              key={id}
              sticky={sticky}
              align={align}
              noEllipsis
              sx={{ minWidth: width }}
            >
              <Chip
                label={candidate.status}
                size="small"
                sx={{
                  backgroundColor:
                    candidate.status === "HIRE"
                      ? "#D1FAE5"
                      : candidate.status === "PENDING"
                      ? "#E5E7EB"
                      : "#FECACA",
                  color: "#111827",
                  fontWeight: 500,
                  px: 1.5,
                  fontSize: "0.75rem",
                }}
              />
            </StyledTableCell>
          );
        }

        return null;
      })}
    </StyledTableRow>
  );
};

export default CandidateTableRow;
