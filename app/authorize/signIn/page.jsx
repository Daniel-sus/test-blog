"use client";

import Modal from "@components/Modal";
import { fetchSignIn } from "@redux/slices/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onHandleSignIn = async (inputData) => {
    try {
      const data = await dispatch(fetchSignIn(inputData));
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
        title="Sign In"
        inputs={["Nickname", "Email", "Password"]}
        onHandleAuthorize={onHandleSignIn}
      />
    </div>
  );
};

export default SignIn;
