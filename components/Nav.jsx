"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectUser } from "@redux/selectors";
import { logOut } from "@redux/slices/auth";

const Nav = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);

  return (
    <header className="header">
      <div className="container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Link href="/">
              <Typography variant="h6">Ptuxerman's Blog</Typography>
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Image
                src="/assets/photo1.jpg"
                alt="Promptopia Logo"
                width={34}
                height={34}
                className="image-anton"
              />
              <Image
                src="/assets/photo2.jpg"
                alt="Promptopia Logo"
                width={34}
                height={34}
                className="image-anton"
              />
              <Image
                src="/assets/photo3.jpg"
                alt="Promptopia Logo"
                width={34}
                height={34}
                className="image-anton"
              />
            </Box>
          </Box>

          {isAuth ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Link href="/create-post">
                <Button variant="contained">Create Post </Button>
              </Link>
              <Button
                onClick={() => dispatch(logOut())}
                variant="contained"
                color="error"
              >
                Log out
              </Button>
              <Link href="/profile">
                <AccountCircle fontSize="large" />{" "}
              </Link>
              <Link href="/profile">
                <h3>{user.nickname}</h3>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Link href="/authorize/logIn">
                <Button variant="outlined">Login</Button>
              </Link>
              <Link href="/authorize/signIn">
                <Button variant="contained">Sign in</Button>
              </Link>
            </Box>
          )}
        </Box>
      </div>
    </header>
  );
};

export default Nav;
