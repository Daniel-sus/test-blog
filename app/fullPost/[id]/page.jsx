"use client";

import Post from "@components/Post";
import { Skeleton } from "@mui/material";
import axios from "axios";
import React from "react";

const FullPostPage = ({ params }) => {
  const [loading, setLoading] = React.useState(true);
  const [post, setPost] = React.useState({});

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/posts/${params.id}`);
      console.log(data);
      setPost(...data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="container">
      <h2 className="fullPost">FullPost</h2>
      {!loading ? (
        <Post post={post} isFullPost />
      ) : (
        <Skeleton variant="rounded" width={700} height={100} />
      )}
    </div>
  );
};

export default FullPostPage;
