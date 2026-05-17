import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { IPost, PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type PostsListProps = {
  selectedFiter: PostStatusType;
  searchQuery: string;
};

function PostsList({ selectedFiter, searchQuery }: PostsListProps) {
  const [paginate, setPaginate] = useState(1);
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    isStale,
    refetch,
  } = useGetPosts(selectedFiter, paginate);

  const {
    data: searchData = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searschError,
  } = useSearch(searchQuery);

  const queryClient = useQueryClient();

  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage <= 3) {
      queryClient.prefetchQuery({
        queryKey: ["posts", { selectedStatus: "all", paginate: nextPage }],
        queryFn: () => fetchPosts("all", nextPage),
        staleTime: 1000 * 60,
      });
    }
  }, [paginate, queryClient]);

  if (isLoading || isSearchLoading) {
    return <p> please wait...</p>;
  }
  if (isError) {
    return <p> {error.message}</p>;
  }
  if (isSearchError) {
    return <p> {searschError.message}</p>;
  }

  const renderList = ({
    postsData,
    type,
    key,
  }: {
    postsData: IPost[];
    type: string;
    key: string | number;
  }) => {
    return postsData.map((post: IPost, idx: number) => (
      <tr>
        <td>{++idx}</td>
        <td>
          <Link to={`/info?id=${post.id}&type=${type}&key=${key}`}>
            {post.title}
          </Link>
        </td>
        <td>{post.status}</td>
        <td style={{ textAlign: "center" }}>
          <Form.Check // prettier-ignore
            type="switch"
            checked={post.topRate}
          />
        </td>
        <td>
          <ButtonGroup aria-label="Basic example">
            <Button variant="danger">Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    ));
  };

  return (
    <>
      {isStale && !searchQuery && (
        <Button className="mb-3" onClick={() => refetch()}>
          Update Data
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderList(
            searchQuery
              ? { postsData: searchData, type: "search", key: searchQuery }
              : { postsData: posts, type: "paginate", key: paginate },
          )}
        </tbody>
      </Table>

      {!searchQuery && selectedFiter === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}

export default PostsList;
