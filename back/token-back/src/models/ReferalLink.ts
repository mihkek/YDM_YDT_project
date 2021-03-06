import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { RefedUser } from "./refedUser";


@Entity("referal_link")
export class ReferalLink extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    link: string

    @Column({type:"float", default:0})
    earns: number

    @ManyToOne(type => User, user => user.referalLinks, { cascade: true, onDelete: 'CASCADE' })
    user: User

    @OneToMany( type => RefedUser , refedLinks => refedLinks.referallink)
    refedLinks: RefedUser[];

    constructor(){
      super()
    }
}