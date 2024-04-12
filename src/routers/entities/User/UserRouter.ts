import UsersRepository from "../../../repositories/UsersRepository";
import { Router } from "express";
import { getRouter } from "../getRouter";
import { User } from "../../../../models/User";
import { Policy } from "../../../security/PolicyBuilder";

export async function getUsersRouter(
  rowLevelPolicies?: Policy<User>[]
): Promise<Router> {
  const { router, repository } = await getRouter<User>(
    "users",
    UsersRepository,
    rowLevelPolicies
  );
  return router;
}
