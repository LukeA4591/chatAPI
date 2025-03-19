import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import Logger from './logger';
dotenv.config();

const state = {
    // @ts-ignore
    pool: null
};

const connect = async (): Promise<void> => {
    state.pool = await mysql.createPool({
        host: process.env.SENG365_MYSQL_HOST,
        user: process.env.SENG365_MYSQL_USER,
        password: process.env.SENG365_MYSQL_PASSWORD,
        database: process.env.SENG365_MYSQL_DATABASE,
        ssl: {
            rejectUnauthorized: false
            }
        });
    await state.pool.getConnection(); // Check connection
    Logger.info(`
 Successfully connected to database`
    )
    return

     };

const getPool = () => {

    return state.pool;
     };

 export {connect, getPool}