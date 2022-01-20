import { body, param } from "express-validator";
import {AccountController} from "../controller/AccountController";

export const AccountRoutes = [{
  method: "get",
  route: "/accounts",
  controller: AccountController,
  action: "all",
  validation: [],
}, {
  method: "get",
  route: "/accounts/:id",
  controller: AccountController,
  action: "one",
  validation: [
    param('id').isInt(),
  ],
}, {
  method: "post",
  route: "/accounts",
  controller: AccountController,
  action: "save",
  validation: [
    body('activeFlag').isBoolean(),
    body('accountType').isInt({ min: 0 }).withMessage('Invalid account type'),
    body('dailyWithdrawlLimit').isInt(),
    body('userId').isInt(),
  ],
}, {
  method: "delete",
  route: "/accounts/:id",
  controller: AccountController,
  action: "remove",
  validation: [
    param('id').isInt(),
  ],
}, {
  method: "get",
  route: "/accounts/:id/balance",
  controller: AccountController,
  action: "checkBalance",
  validation: [
    param('id').isInt(),
  ],
}, {
  method: "get",
  route: "/accounts/:id/transactions",
  controller: AccountController,
  action: "getTransactions",
  validation: [
    param('id').isInt(),
  ],
},  {
  method: "post",
  route: "/accounts/block",
  controller: AccountController,
  action: "block",
  validation: [
    body('accountId').isInt(),
  ],
}, {
  method: "post",
  route: "/accounts/deposit",
  controller: AccountController,
  action: "deposit",
  validation: [
    body('accountId').isInt(),
    body('amount').isInt(),
  ],
}, {
  method: "post",
  route: "/accounts/withdraw",
  controller: AccountController,
  action: "withdraw",
  validation: [
    body('accountId').isInt(),
    body('amount').isInt(),
  ],
}];