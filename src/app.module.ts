import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Cargar las variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true,  
    }),

    // Configurar la conexión a la base de datos usando ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        schema: configService.get<string>('DATABASE_SCHEMA'),
        synchronize: configService.get<boolean>('DATABASE_SYNC'),
        retryAttempts: configService.get<number>('DATABASE_RETRYATTEMPTS'),
        retryDelay: configService.get<number>('DATABASE_RETRYDELAY'),
        logging: configService.get<boolean>('DATABASE_LOGGING'),
        entities: ["dist/**/*.entity.js"]
      }),
      inject: [ConfigService],  
    }),
    
    UsersModule,
  ],
})
export class AppModule {}
