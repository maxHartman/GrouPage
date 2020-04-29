import React, { useEffect, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { Post } from "../types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modifyToRefresh, setModifyToRefresh] = useState(false);
  const [postTxtContent, setPostTxtContent] = useState("");

  useEffect(() => {
    async function reqPosts() {
      const postsRes = await fetch("/getPosts");
      const postsResJson = await postsRes.json();
      setPosts(postsResJson.posts);
    }
    reqPosts();
  }, [modifyToRefresh]);

  async function addPost() {
    if (postTxtContent.length === 0) {
      return;
    }
    await fetch("/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: postTxtContent,
        timestamp: Date.now(),
      }),
    });
    setPostTxtContent("");
    setModifyToRefresh(!modifyToRefresh);
  }

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <Grid container xs={12} justify="center">
        <Grid item xs={12}>
          <AppBar style={{ backgroundColor: "#3F5673" }}>
            <Toolbar>
              <div style={{ flex: 1 }}>
                <img
                  src="logo.png"
                  style={{
                    maxHeight: 50,
                    marginRight: "1ch",
                  }}
                />
              </div>
              <Button
                onClick={async () => {
                  await fetch("/logout");
                  window.location.href = "/";
                }}
                style={{ color: "white" }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Box m={8} />
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter post here..."
              value={postTxtContent}
              onChange={(e: any) => setPostTxtContent(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} style={{ width: "100%", textAlign: "center" }}>
            <Button onClick={addPost} style={{ width: "100%" }}>
              Add Post
            </Button>
          </Grid>
          {posts.map((post) => (
            <>
              <Grid container item xs={12} justify="center">
                <Paper elevation={10} style={{ borderRadius: 10 }}>
                  <Box border={1} borderColor="#000000" borderRadius={10}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Typography>{post.content}</Typography>
                      <Typography
                        variant="body2"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {new Date(post.timestamp).toString()}
                      </Typography>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Box m={1} />
            </>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
