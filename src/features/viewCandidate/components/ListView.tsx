// import ListView from "@/features/shared/list/ListView";
// import CandidateCard from "./CandidateCard";
import { type Candidate } from "@/types/user";

const CandidateList = ({ candidates }: { candidates: Candidate[] }) => {
  console.log(candidates);
  return null;
};
// <ListView
//   items={candidates}
//   renderItem={(candidate: Candidate) => (
//     <CandidateCard candidate={candidate} />
//   )}
// />

export default CandidateList;
