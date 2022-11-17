const dayjs = require("dayjs");

module.exports = ({ date, region, times: { tong_saharlik: sunrise, quyosh, peshin, asr, shom_iftor, hufton } }, forWhen,) => {
  const formatted = dayjs(date).locale("uz-latn").format("DD/MM/YYYY")
  const title = `${region} shahri uchun ${forWhen} (${formatted}) namoz vaqtlari\n\n`

  return `${title}Saharlik: ${sunrise}\nQuyosh chiqishi: ${quyosh}\nPeshin: ${peshin}\nAsr: ${asr}\nShom: ${shom_iftor}\nXufton: ${hufton}\n\n@najot_vaqti_bot`;
}