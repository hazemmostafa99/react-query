import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";

const Info = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;
  const { data, isLoading, isError, error } = useGetPost(id, type, key);
  if (isLoading) {
    return <p> please wait...</p>;
  }
  if (isError) {
    return <p> {error.message}</p>;
  }
  return (
    <Row>
      <Col xs={6}>
        <div>
          <h4>Title: {data?.title}</h4>
          <p>Status: {data?.status}</p>
          <p>Top Rate: {data?.topRate ? "true" : "false"}</p>
          <p>Body: {data?.body}</p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div>
      </Col>
    </Row>
  );
};

export default Info;
