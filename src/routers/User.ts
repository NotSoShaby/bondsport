import { body, param } from "express-validator";
import {UserController} from "../controller/UserController";

export const UserRoutes = [{
  method: "get",
  route: "/users",
  controller: UserController,
  action: "all",
  validation: [],
}, {
  method: "get",
  route: "/users/:id",
  controller: UserController,
  action: "one",
  validation: [
    param('id').isInt(),
  ],
}, {
  method: "post",
  route: "/users",
  controller: UserController,
  action: "save",
  validation: [
    body('name').isString(),
    body('birthDay').isString(),
    body('document').isString(),
  ],
}, {
  method: "delete",
  route: "/users/:id",
  controller: UserController,
  action: "remove",
  validation: [
    param('id').isInt(),
  ],
}];