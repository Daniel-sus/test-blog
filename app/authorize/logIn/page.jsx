"use client";

import Modal from "@components/Modal";
import { fetchLogIn } from "@redux/slices/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onHandleLogIn = async (inputData) => {
    try {
      const data = await dispatch(fetchLogIn(inputData));
      if (!data?.error) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal__wrapper">
      <Modal
        title="Log In"
        inputs={["Email", "Password"]}
        onHandleAuthorize={onHandleLogIn}
      />
    </div>
  );
};

export default LogIn;
