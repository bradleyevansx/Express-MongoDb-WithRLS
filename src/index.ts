import express from "express";
import { getUsersRouter } from "./routers/entities/User/UserRouter";
import { getAuthRouter } from "./routers/AuthRouter";
import { AuthService } from "./auth/AuthService";
import { getRepository } from "./repositories/getRepository";
import UsersRepository from "./repositories/UsersRepository";
import { User } from "../models/User";
import userPolicies from "./routers/entities/User/UserPolicies";
import { jwtMiddleware } from "./middleware/Auth";

const app = express();
const port = 8080;

async function init() {
  try {
    app.use(
      "/auth",
      await getAuthRouter(
        await new AuthService(
          await getRepository<User>("users", UsersRepository)
        )
      )
    );
    app.use(jwtMiddleware);
    app.use("/users", await getUsersRouter(userPolicies));

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
}

init();
