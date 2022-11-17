const TelegramBot = require("node-telegram-bot-api")
const mongo = require("./modules/mongo")
const { TOKEN } = require("../config")
const CommandController = require("./controllers/CommandController")
const Users = require("./models/UserModel")
const MessageController = require("./controllers/MessageController")

const bot = new TelegramBot(TOKEN, {
    polling: true
})

mongo()

bot.on("message", async (msg) => {
    const userId = msg.from.id
    const text = msg.text
    let user = await Users.findOne({ userId })
    if (!user) {
        user = await Users.create({
            userId
        })
    }
    try {
        if (text.startsWith("/")) {
            await CommandController(bot, user, msg)
        } else {
            await MessageController(bot, user, msg)
        }
    } catch (err) {
        console.log("🚀 ~ file: index.js ~ line 15 ~ bot.on ~ err", err)
        bot.sendMessage(userId, '❌ Xatolik yuz berdi')
    }
})