export interface Competency {
  id: string;
  name: string;
  description?: string;
}

export interface NewJobState {
  title: string;
  description: string;
  suggested: Competency[];
  selected: Competency[];
}

export interface CompetencyState {
  title: string;
  description: string;
  suggested: Competency[];
  selected: Competency[];
}
