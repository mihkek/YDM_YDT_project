import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    constructor(){
      super()
    }
}