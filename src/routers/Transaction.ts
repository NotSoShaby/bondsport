import { body, param } from "express-validator";
import { TransactionController } from "../controller/TransactionController";

export const TransactionRoutes = [{
  method: "get",
  route: "/transactions",
  controller: TransactionController,
  action: "all",
  validation: [],
}, {
  method: "get",
  route: "/transactions/:id",
  controller: TransactionController,
  action: "one",
  validation: [
    param('id').isInt(),
  ],
}, {
  method: "post",
  route: "/transactions",
  controller: TransactionController,
  action: "save",
  validation: [
    body('value').isInt(),
    body('accountId').isInt(),
  ],
}, {
  method: "delete",
  route: "/transactions/:id",
  controller: TransactionController,
  action: "remove",
  validation: [
    param('id').isInt(),
  ],
}];