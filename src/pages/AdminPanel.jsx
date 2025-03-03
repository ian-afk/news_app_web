import { useState } from "react";
import { addNews } from "../utils/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    tags: "",
    images: "",
  });
  const navigate = useNavigate();

  const { mutate: mutationNews, isSuccess: isSuccessNews } = useMutation({
    mutationFn: addNews,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setInputs({ ...inputs, images: image });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("tags", inputs.tags);
    formData.append("images", inputs.images);

    function submitData(data) {
      mutationNews(data, {
        onSuccess: (data) => {
          if (data.success) {
            alert("News Added Successfully");
            navigate("/news");
          } else {
            alert("Error adding news: " + data.message);
          }
        },
        onError: (error) => {
          alert("An error occurred: " + error.message);
        },
      });
    }
    submitData(formData);
  };

  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl my-2">Admin Panel</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex">
          <label htmlFor="title" className="w-28 font-semibold">
            Title
          </label>
          <input
            className="border-1 px-2"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label htmlFor="description" className="w-28 font-semibold">
            Description
          </label>
          <input
            className="border-1 px-2"
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label htmlFor="tags" className="w-28 font-semibold">
            Tags
          </label>
          <input
            className="border-1 px-2"
            type="text"
            name="tags"
            value={inputs.tags}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label htmlFor="image" className="w-28 font-semibold">
            Image
          </label>
          <input
            type="file"
            className="block px-2 py-1 mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            name="images"
            onChange={handleFileChange}
          />
        </div>
        <button className="rounded-full border-1 px-2 bg-blue-500 text-white mt-4">
          Add News
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
