import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ReferalLink } from "./ReferalLink";


@Entity("refe_user")
export class RefedUser extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.refedLinks, { cascade: true, onDelete: 'CASCADE' })
    user: User

    @ManyToOne(type => ReferalLink, referalLink => referalLink.refedLinks, { cascade: true, onDelete: 'CASCADE' })
    referalLink: ReferalLink
    
    @Column()
    link: string

    @Column({default:0})
    earns: number

    constructor(){
      super()
    }
}