import { Row, Col, Form } from "react-bootstrap";
import PostsList from "../components/PostsList";

const Home = () => {
  return (
    <Row>
      <Col xs={9}>
        <PostsList />
      </Col>
      <Col>
        <h5>Filter By Status</h5>
        <Form.Select>
          <option value="">Select Status</option>
          <option value="Publish">Publish</option>
          <option value="Draft">Draft</option>
          <option value="Blocked">Blocked</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Home;
