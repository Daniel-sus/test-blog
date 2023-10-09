import React from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUser } from "@redux/selectors";
import { useRouter } from "next/navigation";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import Comment from "./Comment";

const Post = ({ post, isFullPost }) => {
  const [loading, setLoading] = React.useState(false);
  const [loadingReply, setLoadingReply] = React.useState(false);
  const [opened, setOpened] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(post?.comments || []);
  const router = useRouter();
  const userData = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);

  const { title, description, _id } = post;
  const date = new Date(post?.createdAt);

  const formattedDate =
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
    " " +
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleProfileClick = (event) => {
    event.stopPropagation();
    if (post.creator._id === userData?._id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}`);
  };

  const handleOpenFullPost = () => {
    router.push(`/fullPost/${_id}`);
  };

  const handleOpenComments = () => {
    setOpened((prev) => !prev);
  };

  const handleChangeInput = (event) => {
    setComment(event.target.value);
  };

  const handleCreateComment = async (event) => {
    event.stopPropagation();
    try {
      setLoading(true);
      console.log({ creator: userData._id, post: post._id, text: comment });
      const { data } = await axios.post("/api/comments/new", {
        post: post._id,
        creator: userData._id,
        text: comment,
      });
      setComments([...comments, data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(post, "POST");

  // console.log(comments, "COMMENTS");

  const handleCreateReply = async (info) => {
    const { reply, commentReplied } = info;
    try {
      console.log({
        "reply: ": reply,
        "commentReplied: ": commentReplied,
        "userData: ": userData,
      });
      setLoadingReply(true);
      const { data } = await axios.post("/api/comments/new", {
        creator: userData._id,
        post: post._id,
        replyToComment: commentReplied._id,
        text: reply,
      });
      console.log(data);
      setComments([...comments, data]);
      setLoadingReply(false);
    } catch (error) {
      setLoadingReply(false);
      console.log(error);
    }
  };

  const filteredComments = comments.filter(
    (comment) => !comment.replyToComment
  );
  const replies = comments.reduce((acc, comment) => {
    const { replyToComment } = comment;

    let group = acc.find((group) => group.replyTo === replyToComment);

    if (!group) {
      group = { replyTo: replyToComment, replies: [] };
      acc.push(group);
    }

    group.replies.push(comment);

    return acc;
  }, []);

  // console.log("REPLIES", replies);
  // console.log("FsilteredComments", filteredComments);
  // console.log("Comments", comments);

  return (
    <div
      className={`post ${!isFullPost && "post-pointer"}`}
      onClick={handleOpenFullPost}
    >
      <div className="post__wrapper">
        <h5
          className="post__creator"
          onClick={(event) => handleProfileClick(event)}
        >
          {post.creator?.nickname}
        </h5>
        <p className="post__date">{formattedDate}</p>
      </div>

      <h3 className="title">{title}</h3>
      <p className="description">{description} </p>
      <div className="wrapper__line">
        <div className="wrapper__comments-icon">
          <ChatBubbleOutlineOutlinedIcon />
          <span>{comments.length}</span>
          {isFullPost && (
            <div
              className={`arrowDropDownIcon ${opened && "closed-icon"}`}
              onClick={handleOpenComments}
            >
              <ArrowDropDownIcon />
            </div>
          )}
        </div>

        {isFullPost && isAuth && (
          <form className="wrapper__create-comment">
            <TextField
              size="small"
              variant="outlined"
              label="Leave a comment"
              type="text"
              fullWidth
              onChange={handleChangeInput}
              value={comment}
              id="comment"
            />
            <div className="post__buttons">
              <Button
                variant="contained"
                color="error"
                onClick={() => setComment("")}
              >
                <span>cancel</span>
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                onClick={(event) => handleCreateComment(event)}
              >
                <span>submit</span>
                {loading && (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    style={{ marginLeft: "10px" }}
                  />
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
      {isFullPost && opened && (
        <div className="comments__list">
          {filteredComments.map((comment, index) => (
            <Comment
              key={index}
              loadingReply={loadingReply}
              setLoadingReply={setLoadingReply}
              comment={comment}
              handleCreateReply={handleCreateReply}
              replies={
                replies.find((reply) => reply.replyTo === comment._id)
                  ?.replies || []
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
