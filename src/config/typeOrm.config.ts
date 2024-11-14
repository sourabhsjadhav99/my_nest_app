import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity"; 
import { Event } from "src/events/event.entity";

export const typeOrmConfig:TypeOrmModuleOptions={
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'Sourabh@1999',
    database: 'nest_udemy',
    autoLoadEntities: false,
    entities: [User,Event],
    synchronize: true,
    logging: true
}