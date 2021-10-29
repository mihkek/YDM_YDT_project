import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PayTransactions } from "./PayTransactions";
import { User } from "./User";
import { Earnings } from "./Earings";


@Entity("balances")
export class Balances extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"float",default:0})
    YDM_balance: number
    

    @Column({type:"float",default:0})
    YDT_balance: number

    @Column({type:"float", default:0})
    CurrentDailyRoi: number

    @Column({type:"float",default:0})
    WeeklyRoi: number

    @Column({type:"float",default:0})
    AllTimeRoi: number

    @ManyToOne(type => User, user => user.balances, { cascade: true, onDelete: 'CASCADE' })
    user: User;

    @OneToMany( type => PayTransactions , pay_transactions => pay_transactions.balance)
    pay_transactions: PayTransactions[];

    @OneToMany( type => Earnings , earning => earning.balance)
    earnings: PayTransactions[];

    constructor(){
      super()
    }
}