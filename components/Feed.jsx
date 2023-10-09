"use client";

import React from "react";
import Post from "./Post";
import axios from "axios";
import { Skeleton } from "@mui/material";

const Feed = () => {
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts");
      setLoading(false);
      setPosts(data);
    } catch (error) {
      setLoading(false);
      alert("Error", error);
    }
  };

  React.useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="feed">
        <Skeleton variant="rounded" width={700} height={100} />
        <br />
        <Skeleton variant="rounded" width={700} height={100} />
        <br />
        <Skeleton variant="rounded" width={700} height={100} />
        <br />
        <Skeleton variant="rounded" width={700} height={100} />
        <br />
        <Skeleton variant="rounded" width={700} height={100} />
      </div>
    );
  }

  return (
    <div className="feed">
      {posts && posts?.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
