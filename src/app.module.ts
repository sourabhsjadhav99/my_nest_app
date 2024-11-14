import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { EventsModule } from './events/events.module';
@Module({
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(typeOrmConfig),AuthModule, ConfigModule.forRoot(), EventsModule],

  providers: [AppService],
})
export class AppModule {}
