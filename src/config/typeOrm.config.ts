import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity"; 
import { Event } from "src/events/event.entity";

export const typeOrmConfig:TypeOrmModuleOptions={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'impelox',
    database: 'nest_db',
    autoLoadEntities: false,
    entities: [User,Event],
    synchronize: true,
    logging: true
}