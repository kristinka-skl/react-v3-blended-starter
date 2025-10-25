import { Post } from "../../types/post";
import css from "./PostList.module.css";
interface PostListProps {
  posts: Post[];
}
export default function PostList({ posts }: PostListProps) {
  return (
    <ul className={css.list}>
      {posts.map((post) => {
        <li className={css.listItem}>
          <h2 className={css.title}>Title</h2>
          <p className={css.content}>Контент</p>
          <div className={css.footer}>
            <button className={css.edit}>Edit</button>
            <button className={css.delete}>Delete</button>
          </div>
        </li>;
      })}
    </ul>
  );
}
