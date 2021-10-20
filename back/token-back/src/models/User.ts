import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Balances } from "./Balances";
import { ReferalLink } from "./ReferalLink";
import { RefedUser } from "./refedUser";


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

    @OneToMany( type => ReferalLink , referalLinks => referalLinks.user)
    referalLinks: ReferalLink[];

    @OneToMany( type => RefedUser , refedLinks => refedLinks.user)
    refedLinks: RefedUser[];

    constructor(){
      super()
    }
}