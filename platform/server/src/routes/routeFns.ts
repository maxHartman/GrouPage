import { Request, Response } from "express";
import path from "path";

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
    console.log("WOAH");
    res.sendStatus(200);
  } catch (error) {
    res.status(469).send(error);
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
    res.status(469).send(error);
  }
}

export async function getUserInfo(
  _: Request,
  res: Response,
  user: User
): Promise<void> {
  try {
    const userInfo = await userService.getUser(user.username);
    res.send(userInfo);
  } catch (error) {
    res.status(469).send(error);
  }
}
