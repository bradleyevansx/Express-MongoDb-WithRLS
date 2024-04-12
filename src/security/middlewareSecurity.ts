import * as mongoDB from "mongodb";
import { Entity } from "../../models/contracts/Entity";
import sift, { Query } from "sift";
import express, { NextFunction, Request, Response } from "express";

export function getPostRestrictions<T>(
  restrictions: Query<mongoDB.WithId<T>>[]
) {
  const response = [];

  for (const restriction of restrictions) {
    response.push(createPostMiddleware(restriction));
  }

  return response;
}

function createPostMiddleware<T>(restriction: Query<mongoDB.WithId<T>>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const test = sift(restriction as Query<mongoDB.WithId<T>>);
    const entity = req.body;
    const result = test(entity);
    if (!result) {
      res.status(403).send("Forbidden");
    } else {
      next();
    }
  };
}
