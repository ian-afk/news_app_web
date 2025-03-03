import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNews, getNews, likeDislike } from "../../utils/api";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiEyes } from "react-icons/pi";
import { useEffect, useState } from "react";
import {
  MdDelete,
  MdDeleteOutline,
  MdEdit,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import Modal from "../../components/Modal";

const BASE_API_URL = "http://localhost:8080";

function NewsDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    mutate: mutateDelete,
    data: deleteData,
    isSuccess: isSuccessDel,
  } = useMutation({
    mutationFn: ({ id }) => deleteNews(id),
    onSuccess: (data) => {
      alert(data.message);
      navigate("/news");
      setIsModalOpen(false);
    },
  });

  const {
    data: fetchNews,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getNews", id],
    queryFn: () => getNews(id),
  });

  const {
    mutate: mutateLikeDis,
    data: likeDisData,
    isSuccess,
  } = useMutation({
    mutationFn: ({ id, body }) => likeDislike(id, body),
    onSuccess: (data) => {},
  });

  const handleLike = (isLike, id) => {
    mutateLikeDis({ id, body: { isLike } });
  };

  const handleDelete = (id) => {
    mutateDelete({ id });
  };
  let content = <></>;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{error}</div>;
  } else {
    const data = fetchNews.doc;
    content = (
      <div className="space-y-3">
        <div className="border-1 h-72 overflow-hidden">
          <img
            src={`${BASE_API_URL}/img/news/${data.images}`}
            alt=""
            className="object-fit h-full w-full"
          />
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
          <div className="col-span-2">
            <div className="space-x-3 flex h-10 justify-end">
              <div className="flex gap-2 items-center text-xl">
                <p>
                  {isSuccess && likeDisData
                    ? likeDisData.doc.likes
                    : data.likes}
                </p>
                <button
                  className="text-xl"
                  onClick={() => handleLike(true, data._id)}
                >
                  <AiOutlineLike />
                </button>
              </div>
              <div className="flex gap-2 items-center text-xl">
                <p>
                  {isSuccess && likeDisData
                    ? likeDisData.doc.dislikes
                    : data.dislikes}
                </p>
                <button
                  className="text-xl"
                  onClick={() => handleLike(false, data._id)}
                >
                  <AiOutlineDislike />
                </button>
              </div>

              <p className="flex justify-center items-center gap-2 text-xl">
                {data.views}
                <PiEyes />
              </p>
            </div>
            <div className="text-xl space-x-2 flex justify-end">
              <button
                className="text-red-500 border-1 border-blue rounded-md hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold">Delete News</h2>
          <p className="text-gray-600">Are you sure you want to delete?</p>
          <div className="gap-4 flex justify-center items-center">
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
              onClick={() => handleDelete(data._id)}
            >
              Yes
            </button>
            <button
              className=" mt-4 text-gray-500 px-4 py-2 rounded-lg hover:cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="font-bold text-2xl">NEWS DETAIL</h2>
      {content}
    </div>
  );
}

export default NewsDetail;
