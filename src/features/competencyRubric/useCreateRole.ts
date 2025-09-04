// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { saveAllRubrics } from "@/api/rubrics";
// import type { Rubric } from "@/types/rubric";

// export const useSaveAllRubrics = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: saveAllRubrics,

//     onSuccess: () => {
//       queryClient.invalidateQueries(["rubrics"]);
//     },

//     onError: (err) => {
//       console.error("Failed to save all rubrics:", err);
//     },
//   });
// };
