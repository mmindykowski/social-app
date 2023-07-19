import axios from "axios";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    axios
      .post("http://akademia108.pl/api/social-app/post/latest")
      .then((res) => {
        setPosts(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const getNextPosts = () => {
    axios
      .post("http://akademia108.pl/api/social-app/post/older-then", {
        date: posts[posts.length - 1].created_at,
      })
      .then((res) => {
        setPosts(posts.concat(res.data));
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLatestPosts();
  }, []);

  console.log(posts);
  return (
    <div className="home">
      <div className="postList">
        {posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
        <button onClick={getNextPosts}>Load more</button>
      </div>
    </div>
  );
};

export default Home;