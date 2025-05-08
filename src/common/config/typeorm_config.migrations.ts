import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: process.env.DATABASE_TYPE as any || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '44332211',
  database: process.env.DATABASE_NAME || 'SPG_NESTJS',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'advanced-console',
};

export const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource inicializado com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao inicializar o DataSource', error);
  });
