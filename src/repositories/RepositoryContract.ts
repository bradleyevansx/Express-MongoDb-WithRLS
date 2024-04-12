import * as mongoDB from "mongodb";
import { IDb } from "../db/IDb";

export interface IRepository<T> {
  getWhereAsync(query: Partial<T>): Promise<T[]>;
  getByIdAsync(id: string): Promise<T | null>;
  postAsync(item: T): Promise<string>;
  updateAsync(id: string, updatedFields: Partial<T>): Promise<boolean>;
  deleteAsync(id: string): Promise<boolean>;
}
