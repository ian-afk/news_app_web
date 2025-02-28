import { useParams } from "react-router-dom";

function NewsDetail() {
  const { id } = useParams();
  return <div>NEWS DETAIL {id}</div>;
}

export default NewsDetail;
