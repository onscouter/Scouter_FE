import TrackerLayout from "@/layout/TrackerLayout";
import { Box } from "@mui/material";
import JobTrackerHeader from "@/features/jobTracker/components/JobTrackerHeader";
import JobToolBar from "@/features/jobTracker/components/JobToolBar";
import JobList from "@/features/jobTracker/components/JobList";
import JobTable from "@/features/jobTracker/components/JobTable";
import EmptyState from "@/components/EmptyState";
import { useJobTracker } from "@/features/jobTracker/useJobTracker";
import { useJobs } from "@/features/jobTracker/useJobs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { selectUser } from "@/store/authSlice";
import { setAppLoading } from "@/store/appSlice";
import type { Job } from "@/types/job";
import { useNavigate } from "react-router-dom";
import { useDeleteJob } from "@/features/jobTracker/useDeleteJob";
import InterviewTrackerHeader from "@/features/interviewTracker/components/InterviewTrackerHeader";
import { useInterviewTracker } from "@/features/interviewTracker/useInterviewTracker";
import InterviewTable from "@/features/interviewTracker/components/InterviewTable";

const InterviewTrackerPage = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const user = useSelector(selectUser);
  //   const companyId = user?.company?.company_public_id ?? "";

  const {
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
  } = useInterviewTracker();

  //   const { data, isLoading } = useInterviews({
  //     company_id: companyId,
  //     page,
  //     limit: rowsPerPage,
  //     search: searchText,
  //     job_status: jobStatus,
  //     orderBy,
  //     order,
  //   });

  //   const { mutate: deleteJob } = useDeleteJob();

  //   const jobs = useMemo(() => data?.jobs ?? [], [data]);
  //   const total = data?.total ?? 0;

  //   const rowsPerPageOptions = useMemo(
  //     () => [5, 10, 25, 50].filter((size) => size <= total),
  //     [total]
  //   );

  //   useEffect(() => {
  //     dispatch(setAppLoading(!(data && Array.isArray(jobs))));
  //   }, [isLoading, data, dispatch, jobs]);

  const handleRequestSort = (property: keyof Job) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  //   const shouldShowEmptyState = !isLoading && jobs.length === 0;
  const shouldShowEmptyState = true;

  return (
    <TrackerLayout>
      <InterviewTrackerHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchText={setSearchText}
      />
      <Box
        sx={{
          width: "100%",
          minHeight: 400,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          mt: 2,
          px: 0,
          backgroundColor: "background.paper",
          borderColor: "divider",
        }}
      >
        {shouldShowEmptyState ? (
          <EmptyState
            title="No interviews found"
            description="You don't have any interviews matching this filter. Start by creating a new one."
          />
        ) : //   <InterviewTable
        //     jobs={jobs}
        //     total={total}
        //     page={page}
        //     rowsPerPage={rowsPerPage}
        //     order={order}
        //     orderBy={orderBy}
        //     onPageChange={setPage}
        //     onRowsPerPageChange={(limit) => {
        //       setRowsPerPage(limit);
        //       setPage(1);
        //     }}
        //     onRequestSort={handleRequestSort}
        //     rowsPerPageOptions={rowsPerPageOptions}
        //     onEdit={onEdit}
        //     onDelete={onDelete}
        //     onViewCandidates={onViewCandidates}
        //   />
        null}
      </Box>
    </TrackerLayout>
  );
};

export default InterviewTrackerPage;
