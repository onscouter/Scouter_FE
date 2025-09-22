import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import DateTimePicker from "@/features/recruiter/scheduleInterview/components/DateTimePicker";
import InterviewerTable from "@/features/recruiter/scheduleInterview/components/InterviewerTable";
import { useEffect, useMemo, useState } from "react";
import { useGetInterviewers } from "@/features/recruiter/scheduleInterview/useGetInterviewers";
import type { EmployeeInterview } from "@/types/employee";
import { setAppLoading } from "@/store/appSlice";
import { useInterviewerTracker } from "@/features/recruiter/scheduleInterview/useInterviewerTracker";
import ScheduleInterviewerHeader from "@/features/recruiter/scheduleInterview/components/ScheduleInterviewerHeader";
import AppButton from "@/components/AppButton";
import { useAddInterview } from "@/features/recruiter/scheduleInterview/useAddInterview";

const ScheduleInterviewPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { job_position_public_id } = useParams<{
    job_position_public_id: string;
  }>();
  const { job_interview_public_id, job_application_public_id } =
    (location.state || {}) as {
      job_application_public_id?: string;
      job_interview_public_id?: string;
    };

  const {
    searchInput,
    setSearchInput,
    searchText,
    setSearchText,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    order,
    setOrder,
    orderBy,
    setOrderBy,
  } = useInterviewerTracker();

  console.log(searchText);

  const { data, isLoading } = useGetInterviewers(
    job_position_public_id ?? "",
    job_interview_public_id ?? "",
    job_application_public_id ?? ""
  );

  const { mutate: addInterview, isPending } = useAddInterview({
    job_position_public_id: job_position_public_id ?? "",
  });

  useEffect(() => {
    dispatch(setAppLoading(isLoading || isPending));
  }, [isLoading, isPending, dispatch]);

  const employees = data?.employees ?? [];
  const competency = data?.competency;
  const candidate = data?.candidate;
  const total = data?.total ?? 0;

  const rowsPerPageOptions = useMemo(
    () => [5, 10, 25, 50].filter((size) => size <= total),
    [total]
  );

  const handleRequestSort = (property: keyof EmployeeInterview) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  const [selectedInterviewerId, setSelectedInterviewerId] = useState<
    string | null
  >(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleSelectInterviewer = (employee_public_id: string) => {
    if (employee_public_id === selectedInterviewerId) {
      setSelectedInterviewerId(null);
      return;
    }
    setSelectedInterviewerId(employee_public_id);
  };

  const handleSubmit = () => {
    if (!selectedDateTime || !selectedInterviewerId) return;
    const date = selectedDateTime.toISOString();

    addInterview({
      job_interview_public_id: job_interview_public_id ?? "",
      interviewer_public_id: selectedInterviewerId,
      datetime: date,
    });
  };

  if (isLoading || !data?.candidate || !data?.competency) {
    return null;
  }

  return (
    <>
      <ScheduleInterviewerHeader
        candidate={candidate!}
        competency={competency!}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchText={setSearchText}
      />

      <InterviewerTable
        employees={employees}
        total={total}
        page={page}
        rowsPerPage={rowsPerPage}
        order={order}
        orderBy={orderBy}
        onPageChange={setPage}
        onRowsPerPageChange={(limit) => {
          setRowsPerPage(limit);
          setPage(1);
        }}
        onRequestSort={handleRequestSort}
        rowsPerPageOptions={rowsPerPageOptions}
        onSelectInterviewer={handleSelectInterviewer}
        selectedInterviewerId={selectedInterviewerId}
      />

      <Box
        mt={4}
        px={{ xs: 1, sm: 0 }}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "flex-end" }}
        gap={2}
      >
        <DateTimePicker
          value={selectedDateTime}
          onChange={setSelectedDateTime}
        />

        <AppButton
          type="submit"
          colorVariant="primary"
          size="large"
          sx={{ width: "20%" }}
          onClick={handleSubmit}
          disabled={!selectedDateTime || !selectedInterviewerId}
        >
          Schedule Interview
        </AppButton>
      </Box>
    </>
  );
};

export default ScheduleInterviewPage;
