"use client";

import React from "react";
import Profile from "@components/Profile";
import axios from "axios";

const UserProfile = ({ params }) => {
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  const getUserPosts = async () => {
    try {
      const { data } = await axios.get(`/api/user/${params.id}/posts`);
      setLoading(false);
      setPosts(data);
    } catch (error) {
      setLoading(false);
      alert("Error", error);
    }
  };

  React.useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="container">
      <Profile
        isProfileYours={false}
        userData={posts?.[0]?.creator}
        loading={loading}
        posts={posts}
      />
    </div>
  );
};

export default UserProfile;
