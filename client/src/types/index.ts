export interface IPost {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

export type PostStatusType = "published" | "draft" | "block" | "all";
