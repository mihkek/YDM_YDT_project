import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PayTransactions } from "./PayTransactions";
import { User } from "./User";


@Entity("balances")
export class Balances extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:0})
    YDM_balance: number
    

    @Column({default:0})
    YDT_balance: number

    @Column({default:0})
    CurrentDailyRoi: number

    @Column({default:0})
    WeeklyRoi: number

    @Column({default:0})
    AllTimeRoi: number

    @ManyToOne(type => User, user => user.balances)
    user: User;

    @OneToMany( type => PayTransactions , pay_transactions => pay_transactions.balance)
    pay_transactions: PayTransactions[];

    constructor(){
      super()
    }
}