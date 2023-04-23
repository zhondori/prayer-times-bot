require("dotenv").config();

const { env } = process

module.exports = {
    TOKEN: env.TOKEN,
    DB_URL: env.DB_URL,
}