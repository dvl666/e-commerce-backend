import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';
import { CommunesModule } from './communes/communes.module';
import { ProvincesModule } from './provinces/provinces.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AddresModule } from './addres/addres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RegionsModule,
    CommunesModule,
    ProvincesModule,
    ProfilesModule,
    AddresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}