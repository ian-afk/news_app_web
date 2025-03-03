import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import NewsCards from "../../components/NewsCards";
import { useInView } from "react-intersection-observer";
import { getListNews, likeDislike } from "../../utils/api";

function NewsList() {
  const { ref, inView } = useInView({});
  const [newsId, setNewsId] = useState(null);
  const {
    data: fetchNews,
    error: errorNews,
    status: statusNews,
    isLoading: isLoadingNews,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getListNews"],
    queryFn: getListNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
  const queryClient = useQueryClient();
  const { mutate: mutateLikeDis, isSuccess } = useMutation({
    mutationFn: ({ id, body }) => likeDislike(id, body),
  });
  useEffect(() => {
    if (isSuccess) {
      console.log("success ba?");
      queryClient.invalidateQueries({ queryKey: ["getListNews"] });
    }
  }, [isSuccess]);

  const handleLike = (isLike, id) => {
    setNewsId(id);
    mutateLikeDis({ id, body: { isLike } });
    console.log("got called");
  };
  console.log(fetchNews);
  if (errorNews && !isLoadingNews) {
    return <div>An error occurred</div>;
  }

  let content = fetchNews?.pages.map((news) =>
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

  if (statusNews === "pending" || isLoadingNews) {
    content = <p>Loading...</p>;
  }

  if (statusNews === "error") {
    content = <p>{errorNews.message}</p>;
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  return (
    <div className="m-4">
      <h2 className="font-bold text-2xl">News</h2>
      <div>
        <div className="space-y-4">{content}</div>
        <div ref={ref}>
          {isFetchingNextPage && (
            <p className="text-2xl text-blue-500 text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsList;
