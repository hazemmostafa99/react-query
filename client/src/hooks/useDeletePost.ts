import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePost = async (id: number) => {
  const res = await axios.delete(`http://localhost:5005/posts/${id}`);
  return res.data;
};

function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
    },
  });
}

export default useDeletePost;
