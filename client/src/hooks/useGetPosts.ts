import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IPost, PostStatusType } from "../types";

export const fetchPosts = async (
  selectedStatus: PostStatusType,
  paginate: number,
): Promise<IPost[]> => {
  let url = `http://localhost:5005/posts?_page=${paginate}&_limit=${5}`;
  if (selectedStatus !== "all")
    url = `http://localhost:5005/posts?status=${selectedStatus}`;

  const response = await axios.get<IPost[]>(url);
  return response.data;
};

const useGetPosts = (
  selectedStatus: PostStatusType,
  paginate: number,
): UseQueryResult<IPost[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedStatus, paginate }],
    queryFn: () => fetchPosts(selectedStatus, paginate),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60 * 2,
  });
  return query;
};

export default useGetPosts;
