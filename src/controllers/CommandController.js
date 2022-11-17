const Users = require("../models/UserModel")
const regions = require("../static/regions.json")

module.exports = async (bot, user, msg) => {
  const text = msg.text.slice(1);
  const userId = msg.from.id
  const { first_name, last_name } = msg.from;
  try {
    if (text === "start") {
      if (user.location) {
        await bot.sendMessage(userId, `Assalomu alaykum <b>${first_name ? first_name + ' ' : ''}${last_name ? last_name : ''}</b>`, {
          parse_mode: "HTML",
          reply_markup: {
            resize_keyboard: true,
            keyboard: [[{ "text": "Bugungi taqvim" }], [{ text: "📍Manzilni o'zgartirish" }]]
          }
        })
      } else {
        let arr = []
        const keyboard = []

        regions.forEach(item => {
          if (arr.length == 2) {
            keyboard.push(arr);
            arr = [];
          } else {
            arr.push({ text: item.name })
          }
        })

        keyboard.push([{ text: regions[regions.length - 1].name }]);

        await bot.sendMessage(userId, `Assalomu alaykum <b>${first_name ? first_name + ' ' : ''}${last_name ? last_name : ''}</b>. Kerakli namoz vaqtini ko'rish uchun 📍manzilni tanlang:`, {
          parse_mode: "HTML",
          reply_markup: {
            resize_keyboard: true,
            keyboard
          }
        })
      }
    } else if (text === "stats") {
      const stats = await Users.find()
      await bot.sendMessage(userId, `👤Bot foydalanuvchilar soni - <code>${stats.length}</code>`, {
        parse_mode: "HTML"
      })
    }
  } catch (err) {
    console.log("❌ ERROR", err)
    await bot.sendMessage(userId, '❌ Xatolik yuz berdi')
  }
}