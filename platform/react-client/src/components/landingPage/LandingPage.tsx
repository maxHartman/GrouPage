import fileDialog from "file-dialog";
import React, { useState } from "react";
import TextLoop from "react-text-loop";

import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";

import * as vcs from "../../crypto/vcs";
import keypair1 from "../../keypairs/kp1.json";

// const vcs = require("../../crypto/vcs");

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
  const [error, setError] = useState("");

  async function requestAuthentication() {
    const file = await fileDialog();
    console.log(file[0]);
    var reader = new FileReader();
    reader.readAsText(file[0], "UTF-8");

    reader.onload = async function (evt) {
      // @ts-ignore
      const keypairTxt = evt.target.result as string;
      const keypair = JSON.parse(keypairTxt);

      const privateKey = keypair.privateKey;

      // Alice knows what her i value is because she is told
      // by server as soon as her public key is added

      const eVectorRes = await fetch("/getEVector");
      const eVectorResJson = await eVectorRes.json();
      const eVector = eVectorResJson.eVector;
      const publicKeys = eVectorResJson.publicKeys;

      const i = publicKeys.indexOf(keypair.publicKey);
      if (i === -1) {
        console.log("Failed to find our public key in publicKeys");
        setError("Failed to find our public key in publicKeys");
        return;
      }

      console.log(eVector);
      const decodedX = vcs.decode(eVector, i, privateKey);
      console.log(decodedX);

      const verifyRes = vcs.verify(eVector, i, privateKey, publicKeys);
      console.log(verifyRes);

      if (!verifyRes) {
        console.log("decodedX did not match!", decodedX);
        setError("decodedX did not match!");
        return;
      }

      const res = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // TODO right now we just use a random username
          // and password and it'll always pass auth
          username: "anything works here",
          password: decodedX,
        }),
      });

      if (res.status === 200) {
        window.location.reload();
      } else {
        setError("Failed to requet access");
      }
      console.log(res);
    };
  }

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
        {error.length > 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography style={{ color: "#FF0000" }}>Error: {error}</Typography>
          </Grid>
        ) : null}
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Button
            style={{
              backgroundColor: "#3F5673",
              color: "white",
              width: "100%",
            }}
            onClick={requestAuthentication}
          >
            Request Access
          </Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}
