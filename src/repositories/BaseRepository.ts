import * as mongoDB from "mongodb";
import { IDb } from "../db/IDb";

export class BaseRepository<T> implements IDb<T> {
  private db: IDb<T>;

  constructor(db: IDb<T>) {
    this.db = db;
  }

  async getWhereAsync(query: Partial<T>) {
    return await this.db.getWhereAsync(query);
  }

  async getByIdAsync(id: string) {
    return await this.db.getByIdAsync(id);
  }

  async postAsync(item: T) {
    return await this.db.postAsync(item);
  }

  async updateAsync(id: string, updatedFields: Partial<T>) {
    const oldValue = await this.getByIdAsync(id);
    return await this.db.updateAsync(id, { ...oldValue, ...updatedFields });
  }

  async deleteAsync(id: string) {
    return await this.db.deleteAsync(id);
  }
}
