import { Box } from "@mui/material";
import JobTrackerHeader from "@/features/recruiter/jobTracker/components/JobTrackerHeader";
import JobToolBar from "@/features/recruiter/jobTracker/components/JobToolBar";
import JobList from "@/features/recruiter/jobTracker/components/JobList";
import JobTable from "@/features/recruiter/jobTracker/components/JobTable";
import EmptyState from "@/components/EmptyState";
import { useJobTracker } from "@/features/recruiter/jobTracker/useJobTracker";
import { useJobs } from "@/features/recruiter/jobTracker/useJobs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { selectUser } from "@/store/authSlice";
import { setAppLoading } from "@/store/appSlice";
import type { Job } from "@/types/job";
import { useNavigate } from "react-router-dom";
import { useDeleteJob } from "@/features/recruiter/jobTracker/useDeleteJob";

const ActiveRolesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const companyId = user?.company?.company_public_id ?? "";

  const {
    viewMode,
    setViewMode,
    jobStatus,
    setJobStatus,
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
  } = useJobTracker();

  const { data, isLoading } = useJobs({
    company_public_id: companyId,
    page,
    limit: rowsPerPage,
    search: searchText,
    job_status: jobStatus,
    orderBy,
    order,
  });

  const { mutate: deleteJob } = useDeleteJob();

  const jobs = useMemo(() => data?.jobs ?? [], [data]);
  const total = data?.total ?? 0;

  const rowsPerPageOptions = useMemo(
    () => [5, 10, 25, 50].filter((size) => size <= total),
    [total]
  );

  useEffect(() => {
    dispatch(setAppLoading(isLoading));
  }, [isLoading, dispatch]);
  const handleRequestSort = (property: keyof Job) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  const onDelete = (jobId: string) => {
    deleteJob(jobId);
  };

  const onEdit = (jobId: string) => {
    navigate(`/recruiter/edit-job/${jobId}`);
  };

  const onViewCandidates = (jobId: string) => {
    navigate(`/recruiter/jobs/${jobId}`);
  };

  const onNewRole = () => {
    navigate("/recruiter/create-job");
  };

  const shouldShowEmptyState = total === 0;

  return (
    <>
      <JobTrackerHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchText={setSearchText}
        onNewRole={onNewRole}
      />

      <JobToolBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        jobStatus={jobStatus}
        setJobStatus={setJobStatus}
      />

      <Box
        sx={{
          width: "100%",
          minHeight: 400,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          mt: 2,
          px: viewMode === "list" ? 2 : 0,
          backgroundColor: "background.paper",
          borderColor: "divider",
        }}
      >
        {shouldShowEmptyState ? (
          <EmptyState
            title="No roles found"
            description="You don't have any roles matching this filter. Start by creating a new one."
          />
        ) : viewMode === "list" ? (
          <JobList
            jobs={jobs}
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewCandidates={onViewCandidates}
          />
        ) : (
          <JobTable
            jobs={jobs}
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
            onEdit={onEdit}
            onDelete={onDelete}
            onViewCandidates={onViewCandidates}
          />
        )}
      </Box>
    </>
  );
};

export default ActiveRolesPage;
