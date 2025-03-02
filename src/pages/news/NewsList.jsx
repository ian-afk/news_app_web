import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import NewsCards from "../../components/NewsCards";
import { useInView } from "react-intersection-observer";
import { getListNews } from "../../utils/api";

function NewsList() {
  const { ref, inView } = useInView({});

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
        key={item._id}
      />
    ))
  );

  if (statusNews === "pending") {
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
