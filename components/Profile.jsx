import React from "react";
import Post from "./Post";
import { Skeleton } from "@mui/material";

const Profile = ({ isProfileYours, userData, loading, posts }) => {
  const date =
    userData?.createdAt &&
    new Date(userData.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="profile">
      <div className="profile__block">
        <h2 className="profile__title">
          {isProfileYours ? "Your profile" : "Profile"} info:
        </h2>
        {userData ? (
          <>
            <p className="profile__user-data">Nickname: {userData?.nickname}</p>
            <p className="profile__user-data">Email: {userData?.email}</p>
            <p className="profile__user-data">Account was created: {date}</p>
          </>
        ) : (
          <>
            <Skeleton variant="text" width={200} sx={{ fontSize: "18px" }} />
            <Skeleton variant="text" width={240} sx={{ fontSize: "18px" }} />
            <Skeleton variant="text" width={280} sx={{ fontSize: "18px" }} />
          </>
        )}
      </div>

      <div className="profile__block">
        <h2 className="profile__title">Posts:</h2>
        {!loading ? (
          posts && posts?.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <Skeleton variant="rounded" width={700} height={100} />
        )}
      </div>
    </div>
  );
};
// };

export default Profile;
