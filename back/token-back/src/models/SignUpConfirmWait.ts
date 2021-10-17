import { userInfo } from "os";
import { BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("signup_confirm_wait")
export class SignUpConfirmWait extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column()
    confirmcode: string

    @Column()
    timeofborn: string

    constructor(){
      super()
    }
}