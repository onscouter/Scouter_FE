export interface Evaluation {
  name: string;
  status: "Completed" | "Scheduled" | "Not Started" | "N/A";
  score: number | null;
  scheduledDate?: string;
}
