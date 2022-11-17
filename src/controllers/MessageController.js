const Users = require("../models/UserModel");
const regions = require("../static/regions.json")
const axios = require("axios")
const { API_URL } = require("../../config");
const CalendarFormat = require("../modules/CalendarFormat");

const api = axios.create({
	baseURL: API_URL
})

module.exports = async (bot, user, msg) => {
	const text = msg.text;
	const userId = msg.from.id
	try {
		const region = regions.find(rg => rg.name == text)

		if (region && user.step !== "update_region") {
			await Users.findOneAndUpdate({ userId }, { location: region.name });
			await bot.sendMessage(userId, `Mana endi najot vaqtlarini bilib olishingiz mumkin`, {
				parse_mode: "HTML",
				reply_markup: {
					resize_keyboard: true,
					keyboard: [[{ text: 'Bugungi taqvim' }], [{ text: "📍Manzilni o'zgartirish" }]]
				}
			})
		} else if (text === "Bugungi taqvim") {
			const { data } = await api.get(`/present/day`, {
				params: {
					region: user.location
				}
			});

			await bot.sendMessage(userId, CalendarFormat(data, "bugungi"), {
				parse_mode: "HTML"
			})
		} else if (text === "📍Manzilni o'zgartirish") {
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

			await bot.sendMessage(userId, `📍Yangi manzilni tanlang:`, {
				parse_mode: "HTML",
				reply_markup: {
					resize_keyboard: true,
					keyboard
				}
			})

			await Users.findOneAndUpdate({ userId }, { step: "update_region" })
		} else if (user.step === 'update_region') {
			await Users.findOneAndUpdate({ userId }, { step: "normal", location: text });

			await bot.sendMessage(userId, `📍Manzil yangilandi. Mana endi najot vaqtlarini bilib olishingiz mumkin`, {
				parse_mode: "HTML",
				reply_markup: {
					resize_keyboard: true,
					keyboard: [[{ text: 'Bugungi taqvim' }], [{ text: "📍Manzilni o'zgartirish" }]]
				}
			})
		}
	} catch (err) {
		console.log("❌ ERROR", err)
		await bot.sendMessage(userId, '❌ Xatolik yuz berdi')
	}
}