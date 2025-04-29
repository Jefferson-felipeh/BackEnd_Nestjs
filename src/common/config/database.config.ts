import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
}))