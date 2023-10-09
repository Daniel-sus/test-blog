import React from "react";
import Post from "./Post";

const FullPost = ({ post }) => {
  const [opened, setOpened] = React.useState(true);

  const handleOpenComments = () => {
    setOpened((prev) => !prev);
  };
  return (
    <div>
      <Post post={post} />
      <br />
      <h3>Comments:</h3>
      {opened && (
        <div>
          <p>Comment 1</p>
        </div>
      )}
    </div>
  );
};

export default FullPost;
