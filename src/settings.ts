export const settings = {
    MONGO_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'incubator',
    JWT_SECRET: process.env.JWT_SECRET || '123'
}