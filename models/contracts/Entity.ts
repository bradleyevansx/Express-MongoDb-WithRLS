import { ObjectId } from "mongodb";

export interface Entity extends Document {
  _id: ObjectId;
}
