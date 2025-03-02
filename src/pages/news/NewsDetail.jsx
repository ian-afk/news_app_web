import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getNews } from "../../utils/api";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiEyes } from "react-icons/pi";
function NewsDetail() {
  const { id } = useParams();

  const {
    data: fetchNews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getNews", id],
    queryFn: () => getNews(id),
  });

  console.log(fetchNews);

  let content = <></>;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{error}</div>;
  } else {
    const data = fetchNews.doc;
    content = (
      <div className="space-y-3">
        <div className="border-1 border-green-400 h-72">
          <img src="" alt="" />
        </div>

        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <h3 className="text-xl font-semibold">{data.title}</h3>
            <p>{data.description}</p>
            <ul className="flex gap-2 mt-2">
              {data.tags.map((item) => (
                <li key={item._id} className="border-1 px-2 py-1">
                  #{item.tags}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 space-x-3 flex h-10">
            <div className="flex gap-2 items-center text-xl">
              <p>{data.likes}</p>
              <button className="text-xl">
                <AiOutlineLike />
              </button>
            </div>
            <div className="flex gap-2 items-center text-xl">
              <p>{data.dislikes}</p>
              <button className="text-xl">
                <AiOutlineDislike />
              </button>
            </div>

            <p className="flex justify-center items-center gap-2 text-xl">
              {data.views}
              <PiEyes />
            </p>
          </div>
        </div>
      </div>
    );
  }
  console.log(fetchNews);
  return (
    <div className="mt-4">
      <h2 className="font-bold text-2xl">NEWS DETAIL</h2>
      {content}
    </div>
  );
}

export default NewsDetail;
