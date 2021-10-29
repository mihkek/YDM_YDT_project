import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Balances } from "./Balances";

@Entity("earnings")
export class Earnings extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Balances, balance => balance.earnings, { cascade: true, onDelete: 'CASCADE' })
    balance: Balances

    @Column({type:"float", default:0})
    earns: number

    @Column({type: "date"})
    dat: Date

    constructor(){
      super()
    }
}