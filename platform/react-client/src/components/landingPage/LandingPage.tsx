import React from "react";
import TextLoop from "react-text-loop";

import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";

const TEXT_LOOP_CONTENTS = [
  // Leave empty string in so original message is in
  "",
  // Add space after all of the messages
  ...[
    "and login",
    "and read posts",
    "and access content",
    "and remain anonymous",
  ].map((msg) => msg + "\u00a0"),
];

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#F5F5F5", flex: 1, minHeight: "100vh" }}>
      <AppBar>
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
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ flexGrow: 1, minHeight: "50vh", textAlign: "center" }}
      >
        <Grid item xs={12}>
          <Typography variant="h1">Groupage</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline">
            {"Authenticate "}
            <TextLoop
              interval={2500}
              mask={true}
              children={TEXT_LOOP_CONTENTS}
            />
            {"with the group"}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={6}
        direction="row"
        alignItems="stretch"
        alignContent="space-between"
        justify="space-between"
        style={{ justifyContent: "center" }}
      >
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Button
            style={{
              backgroundColor: "#4051B6",
              color: "white",
              width: "100%",
            }}
            onClick={async () => {
              const res = await fetch("/auth", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // TODO right now we just use a random username
                  // and password and it'll always pass auth
                  username: Math.random().toString(),
                  password: Math.random().toString(),
                }),
              });

              if (res.status === 200) {
                window.location.reload();
              }
              console.log(res);
            }}
          >
            Request Access
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}
