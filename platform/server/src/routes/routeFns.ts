import { Request, Response } from "express";
import path from "path";

import * as vcs from "../../../react-client/src/crypto/vcs";
import { Authenticated, x } from "../authenticator";
import { UserService } from "../services/users/UserService";

const INDEX_HTML_PATH = path.join(
  __dirname,
  "../../react-client",
  "build",
  "index.html"
);

import authorizedGroups from "../../authority.json";
import { Post } from "../types";

const userService = new UserService();

const publicKeys = authorizedGroups.group1;

const posts = [];

export async function getViewHome(
  _: Request,
  res: Response,
  auth: Authenticated
): Promise<void> {
  res.sendFile(INDEX_HTML_PATH);
}

export async function authenticateUser(
  _: Request,
  res: Response,
  auth: Authenticated
): Promise<void> {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  auth: Authenticated
): Promise<void> {
  try {
    req.logout();
    await new Promise((resolve) => req.session.destroy(resolve));
    // await userService.logoutUser(req);
    res.redirect("/");
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function getPosts(
  req: Request,
  res: Response,
  auth: Authenticated
): Promise<void> {
  try {
    res.send({ posts });
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function addPost(
  post: Post,
  res: Response,
  auth: Authenticated
): Promise<void> {
  try {
    posts.push(post);
    res.sendStatus(200);
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
