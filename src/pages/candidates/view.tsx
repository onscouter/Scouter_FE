import CandidateTable from "@/features/recruiter/viewCandidate/components/CandidateTable";
import ViewCandidateToolBar from "@/features/recruiter/viewCandidate/components/ViewCandidateToolBar";
import { useCandidateFilter } from "@/features/recruiter/viewCandidate/useCandidateFilter";
import EmptyState from "@/components/EmptyState";
import ViewCandidateHeader from "@/features/recruiter/viewCandidate/components/ViewCandidateHeader";
// import CandidateList from "@/features/recruiter/viewCandidate/components/ListView";
import { useJobCandidate } from "@/features/recruiter/viewCandidate/useApplication";
import { useParams } from "react-router-dom";
import { setAppLoading } from "@/store/appSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import CreateCandidateModal from "../../features/recruiter/viewCandidate/components/CreateCandidatePage";
import { useDeleteCandidate } from "@/features/recruiter/viewCandidate/useDeleteCandidate";
import type { Application } from "@/types/applicaiton";

const CandidateViewPage = () => {
  const dispatch = useDispatch();
  const { job_position_public_id } = useParams<{
    job_position_public_id: string;
  }>();
  const [open, setOpen] = useState(false);
  const {
    viewMode,
    setViewMode,
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
  } = useCandidateFilter();

  const { data, isLoading, refetch } = useJobCandidate({
    job_position_public_id: job_position_public_id ?? "",
    page,
    limit: rowsPerPage,
    search: searchText,
    orderBy,
    order,
  });

  const { mutate: deleteCandidate, isPending } = useDeleteCandidate();

  useEffect(() => {
    dispatch(setAppLoading(isPending || isLoading));
  }, [isLoading, dispatch, isPending]);

  const candidates = data?.applications ?? [];
  const job = data?.job_position;
  const total = candidates.length ?? 0;

  const rowsPerPageOptions = useMemo(
    () => [5, 10, 25, 50].filter((size) => size <= total),
    [total]
  );

  const handleRequestSort = (property: keyof Application) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  const onCreateCandidate = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    refetch();
    setOpen(false);
  };

  // const onScheduleInterview = (candidateId: string) => {
  //   console.log("Schedule interview for candidate:", candidateId);
  // };

  // const onViewInterview = (candidateId: string) => {
  //   console.log("View interview for candidate:", candidateId);
  // };

  const onDelete = (candidateId: string) => {
    deleteCandidate({
      job_position_public_id: job_position_public_id ?? "",
      candidateId,
    });
  };

  const onEdit = (candidateId: string) => {
    console.log("Edit candidate:", candidateId);
  };

  const shouldShowEmptyState = !isLoading && candidates.length === 0;
  return (
    <>
      <CreateCandidateModal
        job_position_public_id={job_position_public_id}
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
      />
      <ViewCandidateHeader
        job_position_title={job?.title ?? ""}
        onCreateCandidate={onCreateCandidate}
      />
      <ViewCandidateToolBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchText={setSearchText}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {shouldShowEmptyState ? (
        <EmptyState
          title="No candidates found"
          description="Try adjusting your filters or search query."
        />
      ) : viewMode === "list" ? (
        <EmptyState
          title="List view is under construction"
          description="Please use the table view for now."
        />
      ) : (
        // <CandidateList candidates={candidates} />
        <CandidateTable
          candidates={candidates}
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
        />
      )}
    </>
  );
};

export default CandidateViewPage;
