export interface IPost {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

export type PostStatusType = "published" | "draft" | "block" | "all";

export interface CommentPost {
  body: string;
  post_id: number;
}
export interface CommentType {
  id: number;
  body: string;
  post_id: number;
}

export interface TopRatePost {
  postId: number;
  rateValue: boolean;
  pageNumber: number;
}
