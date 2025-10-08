export interface Feedback {
  id: number;
  user_id: number;
  issue_id?: number;
  message: string;
  created_at: string;
}
