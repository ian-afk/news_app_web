import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getListNews } from "../../../utils/api";

function NewsList() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: fetchNews,
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: ["getListNews"],
    queryFn: getListNews,
  });

  if (errorNews && !isLoadingNews) {
    return <div>An error occurred</div>;
  }

  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };
  return (
    <div className="m-4">
      <h2 className="font-bold text-2xl">News</h2>
      <div>
        {!isLoadingNews && fetchNews ? (
          <div className="grid grid-cols-4 mt-4 gap-4">
            {fetchNews.docs.map((item, index) => (
              <div
                className="bg-white rounded-lg shadow-sm border-1 border-red-500"
                onClick={() => handleClick(item._id)}
                key={`news-${item._id}`}
              >
                <div className="h-28 border-1 border-green-500">
                  IMAGE PLACEHOLDER
                </div>
                <div className="m-2">
                  <p className="font-semibold text-xl">{item.title}</p>
                  <p>{item.description}</p>
                  <div className="flex  gap-2">
                    {item.tags.map((item) => (
                      <div key={item._id} className="border-1 px-2 rounded-sm">
                        <p>#{item.tags}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default NewsList;
