require("dotenv").config();

const { env } = process

module.exports = {
    TOKEN: env.TOKEN,
    DB_URL: env.DB_URL,
    API_URL: env.API_URL,
    APP_URL: env.APP_URL,
}