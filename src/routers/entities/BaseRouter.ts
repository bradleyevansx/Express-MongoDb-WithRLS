import express, { Request, Response } from "express";
import { IRepository } from "../../repositories/RepositoryContract";
import { Policy } from "../../security/PolicyBuilder";
import { getPostRestrictions } from "../../security/middlewareSecurity";
export function initRouter<T>(
  repository: IRepository<T>,
  rowLevelPolicies?: Policy<T>[]
) {
  const router = express.Router();

  router.use(express.json());

  router.get("/", async (req: Request, res: Response) => {
    try {
      const entities = (await repository.getWhereAsync(req.body)) as T[];

      res.status(200).send(entities);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
      const entity = (await repository.getByIdAsync(id)) as T;

      if (entity) {
        res.status(200).send(entity);
      }
    } catch (error) {
      res
        .status(404)
        .send(`Unable to find matching document with id: ${req.params.id}`);
    }
  });

  router.post(
    "/",
    getPostRestrictions<T>(
      rowLevelPolicies
        ?.filter((x) => x.getAction() === "Create")
        .map((x) => x.getRestriction()) || []
    ),
    async (req: Request, res: Response) => {
      try {
        const newUser = req.body as T;
        const result = await repository.postAsync(newUser);

        result
          ? res
              .status(201)
              .send(`Successfully created a new game with id ${result}`)
          : res.status(500).send("Failed to create a new user.");
      } catch (error) {
        console.error(error);
        res.status(400).send(error);
      }
    }
  );

  router.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
      const updatedEntity: Partial<T> = req.body as Partial<T>;

      const result = await repository.updateAsync(id, updatedEntity);

      result
        ? res.status(200).send(`Successfully updated user with id ${id}`)
        : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
      const result = await repository.deleteAsync(id);

      if (result) {
        res.status(202).send(`Successfully removed user with id ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove user with id ${id}`);
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });

  return router;
}
