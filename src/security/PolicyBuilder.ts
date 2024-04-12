import * as mongoDB from "mongodb";
import { Entity } from "../../models/contracts/Entity";
import { Query } from "sift";

export class Policy<T> {
  private action?: "Create" | "Read" | "Update" | "Delete";
  private restriction: Query<mongoDB.WithId<T>>;

  constructor(
    action: "Create" | "Read" | "Update" | "Delete",
    restriction: Query<mongoDB.WithId<T>>
  ) {
    this.action = action;
    this.restriction = restriction;
  }

  getAction() {
    return this.action;
  }

  getRestriction() {
    return this.restriction;
  }
}
