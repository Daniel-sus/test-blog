"use client";

import { Button, CircularProgress, TextField } from "@mui/material";
import { selectIsLoading } from "@redux/selectors";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Modal = ({ title, inputs, onHandleAuthorize }) => {
  const loadingStatusSignIn = useSelector(selectIsLoading);

  const createInputsObject = () => {
    const neededInputs = {};
    for (let i = 0; i < inputs.length; i++) {
      neededInputs[inputs[i].toLowerCase()] = "";
    }
    return neededInputs;
  };

  const correctInputs = React.useMemo(() => createInputsObject(), []);

  const [authorizationInfo, setAuthorizationInfo] =
    React.useState(correctInputs);

  const onHandleChangeInput = (event) => {
    const { value, name } = event.target;
    setAuthorizationInfo({ ...authorizationInfo, [name]: value });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    onHandleAuthorize(authorizationInfo);
  };

  React.useEffect(() => {
    if (loadingStatusSignIn === "fulfilled") {
      setAuthorizationInfo(correctInputs);
    }
  }, [loadingStatusSignIn]);

  return (
    <div className="modal">
      <h3 className="modal__title">{title}</h3>
      <form onSubmit={onSubmitForm} className="form">
        <div className="modal__inputs">
          {inputs.map((input, index) => (
            <TextField
              key={index}
              name={input.toLowerCase()}
              label={input}
              value={authorizationInfo[input.toLowerCase()]}
              onChange={onHandleChangeInput}
            />
          ))}
        </div>
        <div className="modal__buttons-wrapper">
          <Link href="/">
            <Button variant="contained" color="error">
              cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            disabled={loadingStatusSignIn === "pending"}
          >
            <span>submit</span>
            {loadingStatusSignIn === "pending" && (
              <CircularProgress
                size={20}
                color="inherit"
                style={{ marginLeft: "10px" }}
              />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
