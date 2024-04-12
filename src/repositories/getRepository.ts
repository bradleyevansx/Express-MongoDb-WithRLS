import { Entity } from "../../models/contracts/Entity";
import { MongoDb } from "../db/MongoDb";
import { getCollection } from "../services/database.service";
import { IRepository } from "./RepositoryContract";

export async function getRepository<T extends Entity>(
  collectionName: string,
  repositoryType: new (db: MongoDb<T>) => IRepository<T>
) {
  const collection = await getCollection<T>(collectionName);
  const db = new MongoDb<T>(collection);
  const repository = new repositoryType(db);

  return repository;
}
