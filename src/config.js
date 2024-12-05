import dotenv from "dotenv";
dotenv.config();

export const {
    PORT = 3000,
    TOKEN_SECRET = '',
    DB_PASS = '',
    DB_USER = '',
    DB_HOST = 'http://localhost',
    DB_NAME = 'notes',
    CORS_ORIGIN='http://localhost:5173',
    BACKEND_HOST='http://localhost',
    NODE_ENV='local'
} = process.env