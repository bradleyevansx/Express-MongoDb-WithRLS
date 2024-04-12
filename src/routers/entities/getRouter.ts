import { MongoDb } from "../../db/MongoDb";
import { getCollection } from "../../services/database.service";
import { initRouter } from "./BaseRouter";
import { Router } from "express";
import { Entity } from "../../../models/contracts/Entity";
import { IRepository } from "../../repositories/RepositoryContract";
import { getRepository } from "../../repositories/getRepository";
import { Policy } from "../../security/PolicyBuilder";

export async function getRouter<T extends Entity>(
  collectionName: string,
  repositoryType: new (db: MongoDb<T>) => IRepository<T>,
  rowLevelPolicies?: Policy<T>[]
): Promise<{ router: Router; repository: IRepository<T> }> {
  const repository = await getRepository<T>(collectionName, repositoryType);
  const router = initRouter(repository, rowLevelPolicies);

  return { router, repository };
}
