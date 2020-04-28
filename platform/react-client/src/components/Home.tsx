import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

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
    <div style={{ backgroundColor: "#F5F5F5", overflow: "hidden" }}>
      <Button
        onClick={async () => {
          await fetch("/logout");
          window.location.href = "/";
        }}
      >
        Logout
      </Button>
      <TextField
        value={postTxtContent}
        onChange={(e: any) => setPostTxtContent(e.target.value)}
      />
      <Button onClick={addPost}>Add Post</Button>
      We made it!
      {posts.map((post) => (
        <Typography>
          {post.content}, {post.timestamp}
        </Typography>
      ))}
    </div>
  );
}
