import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
import { IPost, PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";

type PostsListProps = {
  selectedFiter: PostStatusType;
  searchQuery: string;
};

function PostsList({ selectedFiter, searchQuery }: PostsListProps) {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    isStale,
    refetch,
  } = useGetPosts(selectedFiter);

  const {
    data: searchData = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searschError,
  } = useSearch(searchQuery);

  if (isLoading || isSearchLoading) {
    return <p> please wait...</p>;
  }
  if (isError) {
    return <p> {error.message}</p>;
  }
  if (isSearchError) {
    return <p> {searschError.message}</p>;
  }

  const renderList = (postsData: IPost[]) => {
    return postsData.map((post: IPost, idx: number) => (
      <tr>
        <td>{++idx}</td>
        <td>
          <Link to="/info">{post.title} </Link>
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
  console.log(isStale);

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
        <tbody>{renderList(searchQuery ? searchData : posts)}</tbody>
      </Table>
    </>
  );
}

export default PostsList;
