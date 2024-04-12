import * as mongoDB from "mongodb";
import { IDb } from "./IDb";
export class MongoDb<T extends mongoDB.Document> implements IDb<T> {
  private collection: mongoDB.Collection<T>;

  constructor(collection: mongoDB.Collection<T>) {
    this.collection = collection;
  }

  async getWhereAsync(query: Partial<T>) {
    const response = await this.collection
      .find(query as mongoDB.Filter<T>)
      .toArray();

    return response as T[];
  }

  async getByIdAsync(id: string) {
    const response = await this.collection.findOne({
      _id: new mongoDB.ObjectId(id),
    } as mongoDB.Filter<T>);

    return response as T;
  }

  async postAsync(item: T) {
    const response = await this.collection.insertOne(
      item as mongoDB.OptionalUnlessRequiredId<T>
    );

    return response.insertedId.toString();
  }

  async updateAsync(id: string, updatedFields: Partial<T>) {
    const oldValue = await this.getByIdAsync(id);
    const response = await this.collection.updateOne(
      { _id: new mongoDB.ObjectId(id) } as mongoDB.Filter<T>,
      { $set: { ...oldValue, ...updatedFields } }
    );

    return response.acknowledged;
  }

  async deleteAsync(id: string) {
    const response = await this.collection.deleteOne({
      _id: new mongoDB.ObjectId(id),
    } as mongoDB.Filter<T>);

    return response.acknowledged;
  }
}
