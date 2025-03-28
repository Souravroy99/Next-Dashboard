"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchField, setSearchField] = useState<"title" | "id">("title");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const postsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result: Post[] = await response.json();
        setData(result);
      } catch (error) {
        alert("Error fetching data...");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((post: Post) =>
    searchField === "title"
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
      : post.id.toString().includes(searchQuery)
  );

  const paginatedData = filteredData.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

  const nextPage = () => {
    if ((currentPage + 1) * postsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 pb-20">
      <h2 className="text-2xl font-bold mb-4">Main Content</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Search & Filter Section */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder={`Search by ${searchField === "title" ? "Title" : "ID"}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0);
              }}
              className="border border-gray-300 px-4 py-2 rounded w-full"
            />
            <select
              value={searchField}
              onChange={(e) => {
                setSearchField(e.target.value as "title" | "id");
                setSearchQuery("");
                setCurrentPage(0);
              }}
              className="border border-gray-300 px-4 py-2 rounded"
            >
              <option value="title">Title</option>
              <option value="id">ID</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <div className="bottom-0 left-0 right-0 shadow-md p-0 flex justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-gray-500 mb-8 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Back
            </button>

            <button
              onClick={nextPage}
              disabled={(currentPage + 1) * postsPerPage >= filteredData.length}
              className="bg-blue-500 mr-4 mb-8 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>

          {/* Table Data */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border px-4 py-2">Id</th>
                  <th className="border px-6 py-2">User Id</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Body</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((post) => (
                    <tr
                      key={post.id}
                      className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900"
                    >
                      <td className="border px-4 py-2">{post.id}</td>
                      <td className="border px-4 py-2">{post.userId}</td>
                      <td className="border px-4 py-2">{post.title}</td>
                      <td className="border px-4 py-2">{post.body}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
