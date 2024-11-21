export interface Post {
  content: string;
  scheduleTime: Date;
  status?: "pending" | "posted" | "failed";
}
