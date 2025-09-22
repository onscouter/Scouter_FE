import { Checkbox, Typography, Chip } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/features/shared/table/StyledTable";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { EmployeeInterview } from "@/types/employee";
import dayjs from "dayjs";

interface InterviewerTableRowProps {
  interviewer: EmployeeInterview;
  onSelectInterviewer: (employee_public_id: string) => void;
  selectedInterviewerId: string | null;
}

function formatPhoneNumberIntl(countryCode: string, number: string): string {
  const phoneNumber = parsePhoneNumberFromString(`${countryCode}${number}`);
  return phoneNumber
    ? phoneNumber.formatInternational()
    : `${countryCode} ${number}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return dayjs(dateStr).format("MMM D, YYYY • h:mm A");
}

const InterviewerTableRow: React.FC<InterviewerTableRowProps> = ({
  interviewer,
  onSelectInterviewer,
  selectedInterviewerId,
}) => {
  const fullName = `${interviewer.first_name} ${interviewer.last_name}`;
  const phone = formatPhoneNumberIntl(
    interviewer.phone_number.country_code,
    interviewer.phone_number.number
  );

  return (
    <StyledTableRow hover>
      {/* Checkbox */}
      <StyledTableCell align="center" sticky="left" sx={{ width: 50 }}>
        <Checkbox
          checked={selectedInterviewerId === interviewer.employee_public_id}
          onChange={() => onSelectInterviewer(interviewer.employee_public_id)}
        />
      </StyledTableCell>

      {/* Name & Phone */}
      <StyledTableCell>
        <Typography fontWeight={600} fontSize="0.95rem">
          {fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {phone}
        </Typography>
      </StyledTableCell>

      {/* Job Title */}
      <StyledTableCell>
        <Typography variant="body2" fontWeight={500}>
          {interviewer.job_position?.title || "—"}
        </Typography>
      </StyledTableCell>

      {/* Interview Count */}
      <StyledTableCell align="center">
        <Chip
          label={interviewer.interview_count}
          size="small"
          sx={{
            backgroundColor: "#E0E7FF",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </StyledTableCell>

      {/* Last Interview */}
      <StyledTableCell>
        <Typography variant="body2">
          {formatDate(interviewer.last_interviewed_at)}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InterviewerTableRow;
