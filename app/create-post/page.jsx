"use client";

import { Button, TextField, CircularProgress } from "@mui/material";
import { selectIsAuth, selectUser } from "@redux/selectors";
import axios from "axios";
import { useRouter } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    title: "",
    description: "",
  });

  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);

  const onHandleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "/api/posts/new",
        JSON.stringify({
          creator: user._id,
          title: userInfo.title,
          description: userInfo.description,
        })
      );

      setUserInfo({
        title: "",
        description: "",
      });

      setLoading(false);

      if (res.status >= 200 && res.status <= 299) {
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const onHandleChangeInput = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  return (
    <div className="container">
      <h3>CreatePost</h3>
      <br />
      <form onSubmit={onHandleCreatePost} className="input__wrapper">
        <TextField
          label="Title"
          name="title"
          value={userInfo.title}
          onChange={onHandleChangeInput}
          variant="outlined"
        />
        <TextField
          label="Description"
          name="description"
          value={userInfo.description}
          onChange={onHandleChangeInput}
          variant="outlined"
        />
        <Button variant="contained" type="submit" disabled={loading}>
          <span>submit</span>
          {loading && (
            <CircularProgress
              size={20}
              color="inherit"
              style={{ marginLeft: "10px" }}
            />
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
