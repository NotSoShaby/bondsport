import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Transaction } from "../entity/Transaction";

export class TransactionController {

  private transactionRepository = getRepository(Transaction);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let transaction = request.body;
    transaction.account = await this.transactionRepository.findOne(transaction.accountId);
    delete transaction.accountId;
    return this.transactionRepository.save(transaction);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let transactionToRemove = await this.transactionRepository.findOne(request.params.id);
    if (!transactionToRemove) throw new Error('Transaction not found');
    await this.transactionRepository.remove(transactionToRemove);
  }
}
