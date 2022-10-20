import { dataBaseConstants } from './database.costants';
export const ormConfig = {
  type: dataBaseConstants.db,
  host:
    process.env.NODE_ENV === 'production'
      ? dataBaseConstants.hostProd
      : dataBaseConstants.hostDev,
  port: dataBaseConstants.port,
  username: dataBaseConstants.user,
  password: dataBaseConstants.password,
  database: dataBaseConstants.nameDb,
  entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};
