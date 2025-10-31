/* export interface Issue {
  uid?: any;  // Optional if backend auto-generates
  name: string;
  email: string;
  date: string;  // e.g., "2025-10-17"
  issueType: string;
  description: string;
  location: string;
  status?: 'open' | 'in-progress' | 'closed';  // default is 'open'
}
 */


export interface Issue {
  _id?:any;
  name: string;
  email: string;
  issueType: string;
  description: string;
  date: string;
  location: string;
   status?: any; // Optional
}
