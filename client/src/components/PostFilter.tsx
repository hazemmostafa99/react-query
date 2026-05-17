import { Form } from "react-bootstrap";
import { PostStatusType } from "../types";

type PostFilterProps = {
  selectedFiter: PostStatusType;
  setSelectedFilter: (value: PostStatusType) => void;
};

function PostFilter({ selectedFiter, setSelectedFilter }: PostFilterProps) {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as PostStatusType);
  };
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedFiter} onChange={onChangeHandler}>
        <option value="all">Select Status</option>
        <option value="published">Publish</option>
        <option value="draft">Draft</option>
        <option value="blocked">Blocked</option>
      </Form.Select>
    </>
  );
}

export default PostFilter;
