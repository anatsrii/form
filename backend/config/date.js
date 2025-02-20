const dateNow = () => {
  const now = new Date();

const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() เริ่มที่ 0
const yyyy = now.getFullYear();
const HH = String(now.getHours()).padStart(2, '0');
const MM = String(now.getMinutes()).padStart(2, '0');
const SS = String(now.getSeconds()).padStart(2, '0');

const formattedDate = `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;

return formattedDate;

}

module.exports = { dateNow };