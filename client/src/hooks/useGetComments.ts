import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { CommentType } from "../types";

const fetchComments = async (
  post_id: string,
  signal: AbortSignal,
): Promise<CommentType[]> => {
  const response = await axios.get<CommentType[]>(
    `http://localhost:5005/comments?post_id=${post_id}&_sort=id&_order=desc`,
    {
      signal,
    },
  );
  return response.data;
};

function useGetComments(post_id: string): UseQueryResult<CommentType[]> {
  return useQuery({
    queryKey: ["comments", { post_id: +post_id }],
    queryFn: ({ signal }) => fetchComments(post_id, signal),
  });
}

export default useGetComments;
