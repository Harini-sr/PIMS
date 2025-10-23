// export interface Issue {
// date: string|number|Date;
//   id: number;
//   user_id: number;
//   title: string;
//   description: string;
//   category: string;
//   status: string;
//   admin_comment?: string;
//   created_at: string;
// }


export interface Issue {
date: string|number|Date;
  id: number;
  user_id: number;
  title: string;
  description: string;
  issueType: string;
  location: string;
  category: string;
  status: string;
  admin_comment?: string;
  created_at: string;
}
