import { useQuery } from "@tanstack/react-query";
import { getListTags, getNewsByTag } from "../../utils/api";
import TagsCard from "../../components/TagsCard";
import NewsCards from "../../components/NewsCards";
import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";

function NewsTags() {
  const [showNews, setShowNews] = useState(false);
  const [tag, setTag] = useState({
    id: "",
    tagName: "",
  });
  const {
    data: fetchTags,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getListTags"],
    queryFn: getListTags,
  });

  const {
    data: fetchNews,
    refetch,
    isFetching,
    isError: isErrorNews,
    error: errorNews,
  } = useQuery({
    queryKey: ["getNewsByTag", tag.id],
    queryFn: () => getNewsByTag(tag.id),
    enabled: false,
  });

  const handleShowNews = ({ id, tag }) => {
    setTag({
      id,
      tagName: tag,
    });
    setShowNews(!showNews);
  };

  useEffect(() => {
    if (tag.id) refetch();
  }, [tag.id]);

  let newsContent = <></>;
  if (isFetching) {
    newsContent = <div>Loading...</div>;
  } else if (isErrorNews) {
    newsContent = <div>{errorNews}</div>;
  } else if (fetchNews?.docs?.length > 0) {
    const data = fetchNews.docs;
    console.log(data);
    newsContent = (
      <>
        {data.map((item) => (
          <NewsCards
            description={item.description}
            id={item._id}
            tags={item.tags}
            title={item.title}
            key={item._id}
          />
        ))}
      </>
    );
  } else {
    newsContent = <div>No news found.</div>;
  }
  let content = <></>;
  if (isLoading) {
  } else if (isError) {
    content = <div>{error}</div>;
  } else {
    const data = fetchTags.docs;
    content = (
      <>
        {data.map((item) => (
          <TagsCard
            key={item._id}
            id={item._id}
            tags={item.tags}
            count={item.newsCount}
            showNews={handleShowNews}
          />
        ))}
      </>
    );
  }
  return (
    <div>
      <h2 className="font-bold text-2xl my-2">News by Tag</h2>
      {showNews ? (
        <>
          <div>
            <button
              className="text-lg h-12 p-4 flex justify-center items-center border-1 rounded-full mb-4"
              onClick={() => handleShowNews({ id: "", tagName: "" })}
            >
              <MdArrowBackIos />
            </button>
            <h3></h3>
          </div>
          <div className="space-y-4">{newsContent}</div>
        </>
      ) : (
        <div className="grid grid-cols-10 gap-4">{content}</div>
      )}
    </div>
  );
}

export default NewsTags;
