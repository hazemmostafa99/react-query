import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPost } from "../types";
import axios from "axios";

const fetchSearchQuery = async (q: string): Promise<IPost[]> => {
  console.log("FETCHING...");
  const res = await axios.get<IPost[]>(`http://localhost:5005/posts?q=${q}`);
  return res.data;
};

function useSearch(q: string): UseQueryResult<IPost[]> {
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchSearchQuery(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0,
  });
}

export default useSearch;
