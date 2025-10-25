import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useQuery({
    queryKey: ["posts", query, page],
    queryFn: () => fetchPosts(query, page),
    placeholderData: keepPreviousData,
  });
  const changePage = (page: number) => {
    setPage(page);
  };
  const debouncedChangeQuery = useDebouncedCallback(() => {
    setQuery(query);
  }, 1000);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedChangeQuery} />
        {isSuccess && (
          <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={changePage} />
        )}
        <button className={css.button}>Create post</button>
      </header>
      <Modal>{/* Передати через children компонент CreatePostForm або EditPostForm */}</Modal>
      {isSuccess && data.posts.length > 0 && <PostList />}
    </div>
  );
}
