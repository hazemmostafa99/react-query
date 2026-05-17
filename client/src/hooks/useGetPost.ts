import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { IPost } from "../types";
const fetchPostById = async (id: string): Promise<IPost> => {
  const response = await axios.get<IPost>(`http://localhost:5005/posts/${id}`);
  return response.data;
};

function useGetPost(
  id: string,
  type: string,
  key: string | number,
): UseQueryResult<IPost> {
  const queryClient = useQueryClient();
  let cachedData: IPost[] | undefined;

  if (type === "paginate") {
    cachedData = queryClient.getQueryData([
      "posts",
      { paginate: +key, selectedStatus: "all" },
    ]);
  } else {
    cachedData = queryClient.getQueryData(["posts", "search", { q: key }]);
  }

  return useQuery({
    queryKey: ["post", { id: +id }],
    queryFn: () => fetchPostById(id),
    initialData: () => {
      if (!cachedData) {
        return undefined;
      } else {
        return cachedData.find((item) => item.id === +id);
      }
    },
  });
}

export default useGetPost;
