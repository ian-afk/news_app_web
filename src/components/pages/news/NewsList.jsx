import { useNavigate } from "react-router-dom";

function NewsList() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };
  return (
    <div className="m-4">
      <h2 className="font-bold text-2xl">News</h2>
      <div className="grid grid-cols-4 mt-4">
        <div
          className="bg-white rounded-lg shadow-sm border-1 border-red-500"
          onClick={() => handleClick(123)}
        >
          <div className="h-28 border-1 border-green-500">
            IMAGE PLACEHOLDER
          </div>
          <div className="m-2">
            <p className="font-semibold text-xl">TITLE</p>
            <p>DESCRIPTION</p>
            <div>Tags</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsList;
