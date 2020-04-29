import { Request, Response } from "express";
import path from "path";

import * as vcs from "../../../react-client/src/crypto/vcs";
import authorizedGroups from "../../authority.json";
import { Authenticated, x } from "../authenticator";
import { UserService } from "../services/users/UserService";
import { Post } from "../types";

const INDEX_HTML_PATH = path.join(
  __dirname,
  "../../react-client",
  "build",
  "index.html"
);

// Add posts array for each group
const posts = {};
Object.keys(authorizedGroups).forEach((key) => (posts[key] = []));

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
  { groupId }: Authenticated
): Promise<void> {
  try {
    res.send({
      posts: posts[groupId].sort(
        (post1: Post, post2: Post) => post2.timestamp - post1.timestamp
      ),
    });
  } catch (error) {
    res.status(470).send(error);
  }
}

export async function addPost(
  post: Post,
  res: Response,
  { groupId }: Authenticated
): Promise<void> {
  try {
    posts[groupId].push(post);
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

export async function getEVector(
  groupId: string,
  res: Response
): Promise<void> {
  try {
    // TODO implement
    const publicKeys = authorizedGroups[groupId];
    if (publicKeys == null) {
      throw new Error("Group not found");
    }
    const eVector = vcs.encode(x[groupId], publicKeys);
    res.send({ eVector, publicKeys });
  } catch (error) {
    res.status(470).send(error);
  }
}
