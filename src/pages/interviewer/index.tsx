import { Box } from "@mui/material";
import EmptyState from "@/components/EmptyState";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { selectUser } from "@/store/authSlice";
import { setAppLoading } from "@/store/appSlice";
import InterviewTrackerHeader from "@/features/interviewer/interviewTracker/components/InterviewTrackerHeader";
import { useInterviewTracker } from "@/features/interviewer/interviewTracker/useInterviewTracker";
import InterviewTable from "@/features/interviewer/interviewTracker/components/InterviewTable";
import { useInterviews } from "@/features/interviewer/interviewTracker/useInterviews";
import type { Interview } from "@/types/interview";

const InterviewerLandingPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const employee_id = user?.employee_public_id ?? "";

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

  const { data, isLoading, isFetching } = useInterviews({
    employee_public_id: employee_id,
    page,
    limit: rowsPerPage,
    search: searchText,
    orderBy,
    order,
  });

  useEffect(() => {
    dispatch(setAppLoading(isLoading));
  }, [isLoading, dispatch]);

  //   const { mutate: deleteInterview } = useDeleteInterview();

  const interviews = useMemo(() => data?.interviews ?? [], [data]);
  const total = data?.total ?? 0;

  console.log(data);

  const rowsPerPageOptions = useMemo(
    () => [5, 10, 25, 50].filter((size) => size <= total),
    [total]
  );

  const handleRequestSort = (property: keyof Interview) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  const shouldShowEmptyState = total === 0;

  return (
    <>
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
        ) : (
          <InterviewTable
            interviews={interviews}
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
            isFetching={isFetching}
            // onEdit={onEdit}
            // onDelete={onDelete}
            // onViewCandidates={onViewCandidates}
          />
        )}
      </Box>
    </>
  );
};

export default InterviewerLandingPage;
