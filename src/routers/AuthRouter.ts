import express from "express";

import { IAuth } from "../auth/IAuth";

export async function getAuthRouter(authService: IAuth) {
  const router = express.Router();

  router.use(express.json());

  router.post("/login", async (req, res) => {
    try {
      if (req.headers.cookie && (!req.body.username || !req.body.password)) {
        const newToken = authService.tryLoginAsync(
          "",
          "",
          req.headers.cookie?.split("=")[1]
        );
        if (newToken === null) {
          res.clearCookie("token");
          res.status(500).send("Invalid token");
          return;
        } else {
          res.cookie("token", newToken, { httpOnly: true });
          res.status(200).send("Login successful");
          return;
        }
      }

      if (!req.body.username || !req.body.password) {
        res.status(400).send("Must input valid username and password");
        return;
      }

      const newToken = await authService.tryLoginAsync(
        req.body.username,
        req.body.password
      );
      if (newToken === null) {
        res.status(401).send("Invalid username or password");
        return;
      } else {
        res.cookie("token", newToken, { httpOnly: true });
        res.status(200).send("Login successful");
        return;
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const result = await authService.tryRegisterAsync(
        req.body.username,
        req.body.password
      );
      if (result.response === "User created") {
        res.cookie("token", result.token, { httpOnly: true });
        res.status(201).send(result.response);
      } else {
        res.status(400).send(result.response);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post("/logout", async (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out");
  });

  return router;
}
