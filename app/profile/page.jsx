"use client";

import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import axios from "axios";

const MyProfile = () => {
  const router = useRouter();
  const userData = useSelector(selectUser);
  const isAuth = useSelector(selectUser);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  const getUserPosts = async () => {
    try {
      const { data } = await axios.get(`/api/user/${userData._id}/posts`);
      setLoading(false);
      setPosts(data);
    } catch (error) {
      setLoading(false);
      alert("Error", error);
    }
  };

  React.useEffect(() => {
    if (isAuth) {
      getUserPosts();
    } else {
      router.push("/");
    }
  }, [isAuth]);

  return (
    <div className="container">
      <Profile
        isProfileYours={true}
        userData={userData}
        loading={loading}
        posts={posts}
      />
    </div>
  );
};

export default MyProfile;
