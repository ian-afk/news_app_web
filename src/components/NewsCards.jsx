import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { PiEyes } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function NewsCards({
  id,
  title,
  description,
  tags,
  images,
  likes,
  dislikes,
  views,
  ld,
}) {
  const BASE_API_URL = "http://localhost:8080";
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg shadow-sm border-1 p-2"
        key={`news-${id}`}
      >
        <div
          className="border-1  h-72 overflow-hidden hover:cursor-pointer "
          onClick={() => handleClick(id)}
        >
          <img
            src={`${BASE_API_URL}/img/news/${images}`}
            alt=""
            className="object-fit h-full w-full"
          />
        </div>
        <div className="grid grid-cols-10">
          <div className="m-2 col-span-8">
            <p
              className="font-semibold text-xl hover:cursor-pointer"
              onClick={() => handleClick(id)}
            >
              {title}
            </p>
            <p>{description}</p>
            <div className="flex  gap-2">
              {tags.map((item) => (
                <div key={item._id} className="border-1 px-2 rounded-sm">
                  <p>#{item.tags}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 space-x-3 flex h-10 justify-end">
            <div className="flex gap-2 items-center text-xl">
              <p>{likes}</p>
              <button
                className="text-xl hover:cursor-pointer"
                onClick={() => ld(true, id)}
              >
                <AiOutlineLike />
              </button>
            </div>
            <div className="flex gap-2 items-center text-xl">
              <p>{dislikes}</p>
              <button
                className="text-xl hover:cursor-pointer"
                onClick={() => ld(false, id)}
              >
                <AiOutlineDislike />
              </button>
            </div>

            <p className="flex justify-center items-center gap-2 text-xl">
              {views}
              <PiEyes />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCards;
