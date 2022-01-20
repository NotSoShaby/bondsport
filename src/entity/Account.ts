import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { "cascade": true })
  @JoinColumn({ name: "id" } )
  user: User | null;

  @Column()
  balance: number;

  @Column()
  dailyWithdrawlLimit: number;

  @Column()
  accountType: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({default: true})
  activeFlag: boolean = true;

  @OneToMany(type => Transaction, transaction => transaction.account)
  transactions: Transaction[] | null;
}
