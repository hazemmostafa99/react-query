import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IPost, PostStatusType } from "../types";

const fetchPosts = async (selectedStatus: PostStatusType): Promise<IPost[]> => {
  let url = "http://localhost:5005/posts";
  if (selectedStatus !== "all")
    url = `http://localhost:5005/posts?status=${selectedStatus}`;

  const response = await axios.get<IPost[]>(url);
  return response.data;
};

const useGetPosts = (
  selectedStatus: PostStatusType,
): UseQueryResult<IPost[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedStatus }],
    queryFn: () => fetchPosts(selectedStatus),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 15,
  });
  return query;
};

export default useGetPosts;
