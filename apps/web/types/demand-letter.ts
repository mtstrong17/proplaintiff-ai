export type DemandLetterVersionType = {
  id: string;
  version: number;
  content: string;
  createdAt: string;
  createdBy: string;
  status: 'draft' | 'sent' | 'approved';
};

export type DemandLetterType = {
  id: string;
  caseId: string;
  currentVersion: number;
  versions: DemandLetterVersionType[];
}; 