import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Balances } from "./Balances";


@Entity("transactions")
export class PayTransactions extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Balances, balance => balance.pay_transactions, { cascade: true, onDelete: 'CASCADE' })
    balance: Balances
    

    @Column({default:0})
    summa: number

    constructor(){
      super()
    }
}