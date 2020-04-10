import  keys  from './keys'; // DB connection parameters
import mysql from 'promise-mysql';
const pool =mysql.createPool(keys.database);
pool.getConnection()
    .then(connection => {
      pool.releaseConnection(connection);
    
        console.log('DB is Connected');

    });
export default pool;
