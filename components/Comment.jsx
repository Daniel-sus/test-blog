import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsAuth } from "@redux/selectors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Reply from "./Reply";

const Comment = ({
  comment,
  handleCreateReply,
  loadingReply,
  setLoadingReply,
  replies,
}) => {
  const [replyOpened, setReplyOpened] = React.useState(true);
  const [reply, setReply] = React.useState("");
  const isAuth = useSelector(selectIsAuth);
  const [replySectionOpened, setReplySectionOpened] = React.useState(false);

  const date = new Date(comment?.createdAt);

  const formattedDate =
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
    " " +
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleChangeInput = (event) => {
    setReply(event.target.value);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    handleCreateReply({
      reply,
      commentReplied: comment,
    });
  };

  return (
    <div>
      <div className="comment">
        <div className="comment__nickname">{comment?.creator?.nickname}:</div>
        <div className="comment__text">{comment?.text}</div>
        <div className="comment__date">{formattedDate}</div>
        {isAuth && (
          <ReplyIcon onClick={() => setReplyOpened((prev) => !prev)} />
        )}
        {replies.length > 0 && (
          <ArrowDropDownIcon
            onClick={() => setReplySectionOpened(!replySectionOpened)}
          />
        )}
        {replySectionOpened && replies.map((reply) => <Reply reply={reply} />)}
      </div>

      {replyOpened && isAuth && (
        <form className="wrapper__create-comment reply">
          <TextField
            size="small"
            variant="outlined"
            label={`Reply to ${comment?.creator?.nickname}`}
            type="text"
            fullWidth
            onChange={handleChangeInput}
            value={reply}
            id="comment"
          />
          <div className="post__buttons">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setReply("");
                setReplyOpened(false);
                setLoadingReply(false);
              }}
            >
              <span>cancel</span>
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={loadingReply}
              onClick={(event) => handleClickSubmit(event)}
            >
              <span>submit</span>
              {loadingReply && (
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
  );
};

export default Comment;
