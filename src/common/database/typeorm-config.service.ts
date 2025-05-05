import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SubscriberUser } from 'src/modules/users/subscribers/subscriber.subscriber';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory{
    
    constructor(private config:ConfigService){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{

            type: this.config.get('database.type') === 'postgres' ? this.config.get('database.type') : 'postgres',
            database: this.config.get('database.database') === 'SPG_NESTJS' ? this.config.get('database.database') : 'SPG_NESTJS',
            port: this.config.get('database.port') == 5432 ? this.config.get('database.port') : 5432,
            host:this.config.get('database.host'),
            password: '44332211',
            username:'postgres',


            entities:[__dirname + '/../**/*.entity{.ts,.js}'],
            //migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            synchronize: false,
            cli:{
                entitiesDir: 'src',
                migrationsDir: 'src/modules/subscribe',
                subscribersDir: 'subscriber'
            },
            appname:'Api Restifull',
            subscribers:[SubscriberUser],
            logger:'file',
            logging:true,
            autoLoadEntities: true

        } as TypeOrmModuleOptions
    }
}