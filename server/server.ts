import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import prisma from "./lib/prisma";
import { z } from "zod";

// tRPC resolvers
const appRouter = trpc
  .router()
  .query("subjects", {
    async resolve() {
      return prisma.subject.findMany();
    },
  })
  .mutation("subject", {
    input: z.object({ title: z.string(), description: z.string() }),
    async resolve(req) {
      return prisma.subject.create({
        data: req.input,
      });
    },
  })
  .mutation("upvote", {
    input: z.object({ id: z.string() }),
    async resolve(req) {
      return prisma.subject.update({
        where: {
          id: req.input.id,
        },
        data: {
          upvotes: {
            increment: 1,
          },
        },
      });
    },
  });

// Export server definition
export type AppRouter = typeof appRouter;

// Express
const app = express();

app.use(cors());

// tRPC middleware
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    createContext: () => {},
    router: appRouter,
  })
);

app.listen(1337);
