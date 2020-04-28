import { Request, Response } from "express";
import path from "path";

import * as vcs from "../../../react-client/src/crypto/vcs";
import keypair1 from "../../../react-client/src/keypairs/kp1.json";
import { Authenticated, x } from "../authenticator";
import { UserService } from "../services/users/UserService";
import { User } from "../types";

const INDEX_HTML_PATH = path.join(
  __dirname,
  "../../react-client",
  "build",
  "index.html"
);

// If no params to route, request will be passed in.
// If one param or more params to route, param(s) will be passed in as a
// JSON objectin first argument

// Always include try catch because catch will catch any
// errors thrown by a validator, which occurs when validator doesn't pass

const userService = new UserService();

const publicKeys = [keypair1.publicKey];

export async function getViewHome(
  _: Request,
  res: Response,
  user: User
): Promise<void> {
  res.sendFile(INDEX_HTML_PATH);
}

export async function authenticateUser(
  _: Request,
  res: Response,
  user: User
): Promise<void> {
  try {
    console.log("WOAH"); // TODO
    res.sendStatus(200);
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  user: User
): Promise<void> {
  try {
    await userService.logoutUser(req);
    res.redirect("/");
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function getUserInfo(
  _: Request,
  res: Response,
  auth: Authenticated
): Promise<void> {
  try {
    // const userInfo = await userService.getUser(user.username);
    // res.send(userInfo);
    res.send(auth);
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function getEVector(_: Request, res: Response): Promise<void> {
  try {
    // TODO implement
    const eVector = vcs.encode(x, publicKeys);
    res.send({ eVector, publicKeys });
  } catch (error) {
    res.status(470).send(error);
  }
}
