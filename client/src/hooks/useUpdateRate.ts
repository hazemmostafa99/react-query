import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IPost, TopRatePost } from "../types";

const updateRate = async (rate: TopRatePost): Promise<IPost> => {
  const response = await axios.patch<IPost>(
    `http://localhost:5005/posts/${rate.postId}`,
    {
      topRate: rate.rateValue,
    },
  );
  return response.data;
};

function useUpdateRate(): UseMutationResult<IPost, AxiosError, TopRatePost> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRate,
    onMutate(data) {
      //   old data
      const savedPosts = queryClient.getQueryData([
        "posts",
        { paginate: data.pageNumber, selectedStatus: "all" },
      ]);

      //  push for new data to old
      queryClient.setQueryData(
        ["posts", { paginate: data.pageNumber, selectedStatus: "all" }],
        (prevState: IPost[]) => {
          return prevState.map((post) =>
            post.id === data.postId
              ? { ...post, topRate: data.rateValue }
              : post,
          );
        },
      );

      // roolback
      return () => {
        queryClient.setQueryData(
          ["posts", { paginate: data.pageNumber, selectedStatus: "all" }],
          savedPosts,
        );
      };
    },

    onError(_, __, rollBack) {
      if (rollBack) {
        rollBack();
      }
    },
  });
}

export default useUpdateRate;
