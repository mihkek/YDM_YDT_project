import { BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("change_password_wait")
export class ChangePasswordWait extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    code: string;
  
    @Column()
    userId: number;

    constructor(){
      super()
    }
}