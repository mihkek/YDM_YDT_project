import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Balances } from "./Balances";


@Entity("users")
export class User extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column()
    salt: string

    @Column({default:null})
    name : string

    @Column({default:null})
    adress: string

    @Column({default:null})
    wallet: string

    @OneToMany( type => Balances , balances => balances.user)
    balances: Balances[];

    
    
    constructor(){
      super()
    }
}