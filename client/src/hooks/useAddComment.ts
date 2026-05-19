import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CommentPost, CommentType } from "../types";

const addComment = async (data: CommentPost): Promise<CommentType> => {
  const response = await axios.post<CommentType>(
    "http://localhost:5005/comments",
    data,
  );
  return response.data;
};

function useAddComment(): UseMutationResult<
  CommentType,
  AxiosError,
  CommentPost
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onMutate(data) {
      // old data
      const savedData = queryClient.getQueryData([
        "comments",
        { post_id: data.post_id },
      ]);
      //  new data
      const newComment = { ...data, id: new Date() };

      queryClient.setQueryData(
        ["comments", { post_id: data.post_id }],
        (comments: CommentType[]) => {
          return [newComment, ...comments];
        },
      );

      return () => {
        queryClient.setQueryData(
          ["comments", { post_id: data.post_id }],
          savedData,
        );
      };
    },

    onError(_, __, rollBack) {
      if (rollBack) {
        rollBack();
      }
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
}

export default useAddComment;
