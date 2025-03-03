import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getListTags, getNewsByTag, likeDislike } from "../../utils/api";
import TagsCard from "../../components/TagsCard";
import NewsCards from "../../components/NewsCards";
import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useInView } from "react-intersection-observer";

function NewsTags() {
  const [showNews, setShowNews] = useState(false);
  const [tag, setTag] = useState({
    id: "",
    tagName: "",
  });
  const { ref, inView } = useInView({});
  const [newsId, setNewsId] = useState(null);
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
    error: errorNews,
    status: statusNews,
    isLoading: isLoadingNews,
    isError: isErrorNews,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getNewsByTag", tag.id],
    queryFn: () => getNewsByTag(tag.id),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
  const handleShowNews = ({ id, tag }) => {
    setTag({
      id,
      tagName: tag,
    });
    setShowNews(!showNews);
  };
  const queryClient = useQueryClient();
  const { mutate: mutateLikeDis, isSuccess } = useMutation({
    mutationFn: ({ id, body }) => likeDislike(id, body),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("sucess");
      queryClient.invalidateQueries({ queryKey: ["getNewsByTag"] });
    }
  }, [isSuccess]);

  const handleLike = (isLike, id) => {
    setNewsId(id);
    mutateLikeDis({ id, body: { isLike } });
    console.log("got called");
  };

  useEffect(() => {
    if (tag.id) refetch();
  }, [tag.id]);

  console.log(fetchNews);
  let newsContent = <></>;
  newsContent = fetchNews?.pages.map((news) =>
    news.docs.map((item, index) => (
      <NewsCards
        id={item._id}
        description={item.description}
        tags={item.tags}
        title={item.title}
        images={item.images}
        dislikes={item.dislikes}
        likes={item.likes}
        views={item.views}
        ld={handleLike}
        key={item._id}
      />
    ))
  );
  // if (isLoadingNews) {
  //   newsContent = <div>Loading...</div>;
  // } else if (isErrorNews) {
  //   newsContent = <div>{errorNews}</div>;
  // } else if (fetchNews?.docs?.length > 0) {
  //   const data = fetchNews.docs;
  //   console.log(data);
  //   newsContent = (
  //     <>
  //       {data.map((item) => (
  //         <NewsCards
  //           description={item.description}
  //           id={item._id}
  //           tags={item.tags}
  //           title={item.title}
  //           key={item._id}
  //           images={item.images}
  //           likes={item.likes}
  //           dislikes={item.dislikes}
  //           views={item.views}
  //           ld={handleLike}
  //         />
  //       ))}
  //     </>
  //   );
  // } else {
  //   newsContent = <div>No news found.</div>;
  // }
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
          <div ref={ref}>
            {isFetchingNextPage && (
              <p className="text-2xl text-blue-500 text-center">Loading...</p>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-10 gap-4">{content}</div>
      )}
    </div>
  );
}

export default NewsTags;
