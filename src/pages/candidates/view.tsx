import CandidateTable from "@/features/recruiter/viewCandidate/components/CandidateTable";
import ViewCandidateToolBar from "@/features/recruiter/viewCandidate/components/ViewCandidateToolBar";
import { useCandidateFilter } from "@/features/recruiter/viewCandidate/useCandidateFilter";
import EmptyState from "@/components/EmptyState";
import ViewCandidateHeader from "@/features/recruiter/viewCandidate/components/ViewCandidateHeader";
// import CandidateList from "@/features/recruiter/viewCandidate/components/ListView";
import { useJobCandidate } from "@/features/recruiter/viewCandidate/useApplication";
import { useNavigate, useParams } from "react-router-dom";
import { setAppLoading } from "@/store/appSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import CreateCandidateModal from "../../features/recruiter/viewCandidate/components/CreateCandidateModal";
import { useDeleteCandidate } from "@/features/recruiter/viewCandidate/useDeleteCandidate";
import type { Application } from "@/types/applicaiton";
import ViewInterviewModal from "@/features/recruiter/viewCandidate/components/ViewInterviewModal";
import type { InterviewWithMeta } from "@/types/interview";
import { useGetInterviewMeta } from "@/features/recruiter/viewCandidate/useGetInterviewMeta";

const CandidateViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job_position_public_id } = useParams<{
    job_position_public_id: string;
  }>();
  const [open, setOpen] = useState(false);
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(
    null
  );
  const [selectedInterview, setSelectedInterview] =
    useState<InterviewWithMeta | null>(null);

  const { data: interviewData, isLoading: isInterviewLoading } =
    useGetInterviewMeta(selectedInterviewId ?? "");

  useEffect(() => {
    if (interviewData) {
      setSelectedInterview(interviewData);
    }
  }, [interviewData]);
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

  const {
    data,
    isLoading: isCandidatesLoading,
    isFetching: isCandidatesFetching,
  } = useJobCandidate({
    job_position_public_id: job_position_public_id ?? "",
    page,
    limit: rowsPerPage,
    search: searchText,
    orderBy,
    order,
  });

  const { mutate: deleteCandidate, isPending } = useDeleteCandidate();

  useEffect(() => {
    dispatch(
      setAppLoading(isPending || isCandidatesLoading || isInterviewLoading)
    );
  }, [isCandidatesLoading, isInterviewLoading, dispatch, isPending]);

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
    if (open) setOpen(false);
    else if (openInterviewModal) {
      setOpenInterviewModal(false);
      setSelectedInterview(null);
      setSelectedInterviewId(null);
    }
    setOpen(false);
  };

  const onScheduleInterview = (
    job_interview_public_id: string,
    job_application_public_id: string
  ) => {
    navigate(`/recruiter/jobs/${job_position_public_id}/schedule-interview`, {
      state: {
        job_application_public_id,
        job_interview_public_id,
      },
    });
  };

  const onViewInterview = (job_interview_public_id: string) => {
    setSelectedInterviewId(job_interview_public_id);
    setOpenInterviewModal(true);
  };

  const onDelete = (candidateId: string) => {
    deleteCandidate({
      job_position_public_id: job_position_public_id ?? "",
      candidateId,
    });
  };

  const onEdit = (candidateId: string) => {
    console.log("Edit candidate:", candidateId);
  };

  const shouldShowEmptyState = !isCandidatesLoading && candidates.length === 0;
  return (
    <>
      <CreateCandidateModal
        job_position_public_id={job_position_public_id}
        open={open}
        onClose={onClose}
      />
      <ViewInterviewModal
        open={openInterviewModal}
        onClose={onClose}
        interviewer={selectedInterview}
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
          isFetching={isCandidatesFetching}
          onRequestSort={handleRequestSort}
          rowsPerPageOptions={rowsPerPageOptions}
          onEdit={onEdit}
          onDelete={onDelete}
          onScheduleInterview={onScheduleInterview}
          onViewInterview={onViewInterview}
        />
      )}
    </>
  );
};

export default CandidateViewPage;
