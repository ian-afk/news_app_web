import { useNavigate } from "react-router-dom";

function NewsCards({ id, title, description, tags }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };
  return (
    <div>
      <div
        className="bg-white rounded-lg shadow-sm border-1"
        onClick={() => handleClick(id)}
        key={`news-${id}`}
      >
        <div className="h-28 border-1 border-green-500">IMAGE PLACEHOLDER</div>
        <div className="m-2">
          <p className="font-semibold text-xl">{title}</p>
          <p>{description}</p>
          <div className="flex  gap-2">
            {tags.map((item) => (
              <div key={item._id} className="border-1 px-2 rounded-sm">
                <p>#{item.tags}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCards;
