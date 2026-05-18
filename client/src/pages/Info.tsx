import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import { useState } from "react";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";

const Info = () => {
  const [comment, setComment] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;
  const { data, isLoading, isError, error } = useGetPost(id, type, key);
  const addComment = useAddComment();
  const { data: comments, isLoading: isCommentsLoading } = useGetComments(id);
  if (isLoading) {
    return <p> please wait...</p>;
  }
  if (isError) {
    return <p> {error.message}</p>;
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate(
      { body: comment, post_id: +id },
      { onSuccess: () => setComment("") },
    );
  };
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
          <Form className="mb-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>
          {isCommentsLoading ? (
            <p>Loading please wait...</p>
          ) : (
            comments?.map((comment) => <p key={comment.id}>{comment.body}</p>)
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Info;
