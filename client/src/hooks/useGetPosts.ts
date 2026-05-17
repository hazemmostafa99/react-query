import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface IPost {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
}

const fetchPosts = async (): Promise<IPost[]> => {
  const response = await axios.get<IPost[]>(" http://localhost:5005/posts");
  return response.data;
};

const useGetPosts = (): UseQueryResult<IPost[]> => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  return query;
};

export default useGetPosts;
