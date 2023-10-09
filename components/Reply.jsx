import React from "react";

const Reply = ({ reply }) => {
  const date = new Date(reply?.createdAt);

  const formattedDate =
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
    " " +
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="comment">
      <div className="comment__nickname">{reply?.creator?.nickname}:</div>
      <div className="comment__text">{reply?.text}</div>
      <div className="comment__date">{formattedDate}</div>
    </div>
  );
};

export default Reply;
