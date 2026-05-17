import { Row, Col } from "react-bootstrap";
import PostsList from "../components/PostsList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { PostStatusType } from "../types";
import SearchQuery from "../components/SearchQuery";

const Home = () => {
  const [selectedFiter, setSelectedFilter] = useState<PostStatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Row>
      <Col xs={9}>
        <PostsList selectedFiter={selectedFiter} searchQuery={searchQuery} />
      </Col>
      <Col>
        <SearchQuery setSearchQuery={setSearchQuery} />
        <PostFilter
          selectedFiter={selectedFiter}
          setSelectedFilter={setSelectedFilter}
        />
      </Col>
    </Row>
  );
};

export default Home;
