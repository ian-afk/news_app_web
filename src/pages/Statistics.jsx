import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../utils/api";

function Statistics() {
  const {
    data: fetchStcs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStatistics"],
    queryFn: getStatistics,
  });

  let content = <></>;
  if (isLoading) {
    content = <div>Loading ....</div>;
  } else if (isSuccess) {
    const data = fetchStcs;
    console.log(data);
    const newsLikes = data.newsLikes[0];
    content = (
      <>
        <h2 className="font-bold text-2xl">Statistics</h2>
        <div className="grid grid-cols-2 gap-24 m-4">
          <div className="h-56 border-1 rounded-md flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">News</p>
            <p className="">
              News posted{" "}
              <span className="font-semibold text-xl">{data.news}</span>
            </p>
          </div>
          <div className="h-56 border-1 rounded-md flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">Likes</p>
            <p>
              Total Overall likes{" "}
              <span className="font-semibold text-xl">
                {newsLikes.totalLikes}
              </span>
            </p>
          </div>
          <div className="h-56 border-1 rounded-md flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">Dislikes</p>
            <p>
              Total Overall dislikes{" "}
              <span className="font-semibold text-xl">
                {newsLikes.totalDislikes}
              </span>
            </p>
          </div>
          <div className="h-56 border-1 rounded-md flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">Views</p>
            <p>
              Total overall views{" "}
              <span className="font-semibold text-xl">
                {newsLikes.totalViews}
              </span>
            </p>
          </div>
          <div className="h-56 border-1 rounded-md flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">Tags</p>
            <p>
              Total tags{" "}
              <span className="font-semibold text-xl"> {data.tags}</span>
            </p>
          </div>
        </div>
      </>
    );
  } else {
    content = <div>{error}</div>;
  }
  return <div>{content}</div>;
}

export default Statistics;
