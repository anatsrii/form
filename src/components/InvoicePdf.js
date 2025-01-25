import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fontSarabun from "../assets/THSarabunNew.ttf";
import fontSarabunBold from "../assets/THSarabunNewBold.ttf";
// import arial from "../assets/arial";
import arialBold from "../assets/tahoma.ttf";
import { useSelector } from "react-redux";
function InvoicePdf ( ) {
  // product state
  const productList = useSelector((state) => state.product.productList);
  const {discount, vat, totalProductPrice, grandTotal, grandTotalText} = useSelector((state) => state.product)
  
  // user state
  const {
    userCompany,
    userName,
    userLastName,
    userPhone,
    userEmail,
    userAddress,
    userTaxId,
    editUserProfile,
  } = useSelector((state) => state.user);
  
  // customer state
  const {
    customerCompany,
    customerName,
    customerLastName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerTaxId,
    editCustomerProfile,
  } = useSelector((stateCustomer) => stateCustomer.customer);
  
  // document state
  const { docType, documentReference, invoiceNumber, createDate, receiveBy, paymentOption, remark } = useSelector(
    (state) => state.document
  );
// function  create pdf
async function createPdf () {
  // const fontBytes =
//res.arrayBuffer() เป็นเมธอดที่ใช้ในการแปลงข้อมูลใน Response object ให้เป็น ArrayBuffer เป็นรูปแบบข้อมูลที่สามารถใช้ในการฝังฟอนต์ใน pdf-lib ได้
const pdfDoc = await PDFDocument.create();

// ใช้งาน fontkit กับ pdf-lib โดยการเรียกใช้เมธอด registerFontkit และส่ง fontkit ที่ import มาเข้าไป
pdfDoc.registerFontkit(fontkit);

//โหลดไฟล์ฟอนต์ Sarabun จาก URL ที่กำหนด
const fontBytes = await fetch(fontSarabun).then((res) => res.arrayBuffer());
// const arialFont = await fetch(arial).then((res) => res.arrayBuffer())
const arialBd = await fetch(arialBold).then((res) => res.arrayBuffer())
const fontBoldBytes = await fetch(fontSarabunBold).then((res) =>
  res.arrayBuffer()
);

// ฝังฟอนต์ Sarabun ลงใน PDF โดยใช้เมธอด embedFont และส่ง fontBytes ที่โหลดมาแล้วเข้าไป
const customSarabunFont = await pdfDoc.embedFont(fontBytes);
const customBoldSarabunFont = await pdfDoc.embedFont(fontBoldBytes);
const arialBdFont = await pdfDoc.embedFont(arialBd);

const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
const { width, height } = page.getSize();
const fontSize = 12;

// ส่วนหัว
// page.drawText(`Logo here`, 
//   {
//   x: 50,
//   y: height - 50,
//   size: 18,
//   font: customBoldSarabunFont,
//   color: rgb(0, 0, 0),
// });

page.drawText(`${userCompany}`, {
  x: 50,
  y: height - 70,
  size: fontSize,
  font: customSarabunFont,
});
page.drawText(`${userName} ${userLastName}`, {
  x: 50,
  y: height - 90,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`ที่อยู่:${userAddress}`, {
  x: 50,
  y: height - 110,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`เบอร์ติดต่อ:${userPhone}`, {
  x: 50,
  y: height - 130,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`อีเมล์:${userEmail}`, {
  x: 50,
  y: height - 150,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`เลขประจำตัวผู้เสียภาษี:${userTaxId}`, {
  x: 50,
  y: height -170,
  size: fontSize,
  font: customSarabunFont,
});

// ฝั่งขวา
page.drawText(`ใบเสร็จรับเงิน/ใบกำกับภาษี`, {
  x: width - 200,
  y: height - 50,
  size: 18,
  font: customBoldSarabunFont,
});

page.drawText(`เลขที่: ${invoiceNumber}`, {
  x: width - 150,
  y: height - 70,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`วันที่ออก: ${createDate}`, {
  x: width - 150,
  y: height - 90,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`เอกสารอ้างอิง: ${documentReference}`, {
  x: width - 150,
  y: height - 110,
  size: fontSize,
  font: customSarabunFont,
});

// เนื้อหาเกี่ยวกับลูกค้า
page.drawText("ได้รับเงินจาก", {
  x: width - 325,
  y: height - 160,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`บริษัท ${customerCompany}`, {
  x: width - 350,
  y: height - 180,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`คุณ${customerName} ${customerLastName}`, {
  x: width - 350,
  y: height - 200,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`ที่อยู่: ${customerAddress}`, {
  x: width - 350,
  y: height - 220,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`เบอร์โทร: ${customerPhone}`, {
  x: width - 350,
  y: height - 240,
  size: fontSize,
  font: customSarabunFont,
});

page.drawText(`เลขประจำตัวผู้เสียภาษี: ${customerTaxId}`, {
  x: width - 350,
  y: height - 260,
  size: fontSize,
  font: customSarabunFont,
});

// ตารางสินค้า
// Draw table header
const tableTop = height - 300;
const tableLeft = 50;
const tableRight = width - 50;
const rowHeight = 20;
const colWidths = [50, 150, 150, 50, 50, 50];

const drawTableRow = (y, values, alignments) => {
  let x = tableLeft;
  values.forEach((value, index) => {
    let textX = x + 5;
    if (alignments[index] === "center") {
      textX =
        x +
        colWidths[index] / 2 -
        customSarabunFont.widthOfTextAtSize(value, fontSize) / 2;
    } else if (alignments[index] === "right") {
      textX =
        x +
        colWidths[index] -
        customSarabunFont.widthOfTextAtSize(value, fontSize) -
        5;
    }
    page.drawText(value, {
      x: textX,
      y: y - 15,
      size: fontSize,
      font: customSarabunFont,
      color: rgb(0, 0, 0),
    });
    x += colWidths[index];
  });
};

// Draw table header
drawTableRow(
  tableTop,
  ["รหัสสินค้า", "รายการ", "รายละเอียด", "ราคา", "จำนวน", "รวม"],
  ["center", "center", "center", "center", "center", "center"]
);

// Draw table rows
let currentY = tableTop - rowHeight;

const tableData = productList.map(product => [
  product.productCode,
  product.productName,
  product.productDetail,
  (product.productPrice),
  product.productQuantity,
  (product.productPrice * product.productQuantity).toString() // คำนวณรวมต่อแถว
]);

tableData.forEach((row) => {
  drawTableRow(currentY, row, [
    "center",
    "left",
    "left",
    "center",
    "center",
    "center",
  ]);
  currentY -= rowHeight;
});

// Draw table lines
for (let i = 0; i <= tableData.length + 1; i++) {
  const y = tableTop - i * rowHeight;
  page.drawLine({
    start: { x: tableLeft, y },
    end: { x: tableRight, y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
}

colWidths.reduce((x, width) => {
  page.drawLine({
    start: { x, y: tableTop },
    end: { x, y: tableTop - (tableData.length + 1) * rowHeight },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  return x + width;
}, tableLeft);

// Draw the last vertical line on the right side of the table
page.drawLine({
  start: { x: tableRight, y: tableTop },
  end: { x: tableRight, y: tableTop - (tableData.length + 1) * rowHeight },
  thickness: 1,
  color: rgb(0, 0, 0),
});

// Draw totals
const totalsY = currentY - rowHeight;
// function คำนวณความกว้างของข้อความ
const calculateTotalsTextWidth = (state, fontSizeVal) => {
  const fontWidth = customBoldSarabunFont.widthOfTextAtSize(state, fontSizeVal);
  const maxWidth = tableRight - tableLeft; // ความกว้างสูงสุดของตาราง
  const textX = tableRight - fontWidth; // ชิดขวาของตาราง

  // หากข้อความยาวเกินขอบตาราง ให้ล้นไปทางซ้าย
  const adjustedX = Math.max(tableLeft, textX);

  return { fontWidth, adjustedX };
};

// แปลงค่าให้เป็น Number ก่อนใช้ .toLocaleString()
let totalProductPriceNum = Number(totalProductPrice);
let discountNum = Number(discount);
let vatNum = Number(vat);
let grandTotalNum = Number(grandTotal);
let stateTotalProductPrice = `รวมจำนวนเงิน: ${totalProductPriceNum.toFixed(2).toLocaleString()} บาท`;
let stateDiscount = `ส่วนลด: ${discountNum.toFixed(2).toLocaleString()} บาท`;
let stateVat = `ภาษีมูลค่าเพิ่ม: ${vatNum.toFixed(2).toLocaleString()} บาท`;
let stateGrandTotal = `ยอดเงินสุทธิ: ${grandTotalNum.toFixed(2).toLocaleString()} บาท`;
let newStateTotalProductPrice = calculateTotalsTextWidth(stateTotalProductPrice, fontSize);

let newStateDiscount = calculateTotalsTextWidth(stateDiscount, fontSize);

let newStateVat = calculateTotalsTextWidth(stateVat, fontSize);

let newStateGrandTotal = calculateTotalsTextWidth(stateGrandTotal, fontSize);

let stateGrandTotalText = calculateTotalsTextWidth(grandTotalText, fontSize);

// วาดข้อความ "จำนวนเงิน"
page.drawText(stateTotalProductPrice, {
  x: newStateTotalProductPrice.adjustedX,
  y: totalsY - 0.5 * rowHeight,
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});

// วาดข้อความ "ส่วนลด"
page.drawText(stateDiscount, {
  x: newStateDiscount.adjustedX,
  y: totalsY - 1.35 * rowHeight,
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});

// วาดข้อความ "ภาษีมูลค่าเพิ่ม"
page.drawText(stateVat, {
  x: newStateVat.adjustedX,
  y: totalsY - 2.2 * rowHeight,
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});

// วาดข้อความ "ยอดเงินสุทธิ"
page.drawText(stateGrandTotal, {
  x: newStateGrandTotal.adjustedX,
  y: totalsY - 3.05 * rowHeight,
  size: fontSize,
  font: customBoldSarabunFont,
  color: rgb(0, 0, 0),
});

// วาดข้อความ "grandTotalText"
page.drawText(grandTotalText, {
  x: stateGrandTotalText.adjustedX,
  y: totalsY - 4.05 * rowHeight,
  size: fontSize,
  font: customBoldSarabunFont,
  color: rgb(0, 0, 0),
});

// Drawn remark
// วาด paymentOption (ชิดซ้ายของตาราง)
// ตัวเลือกการชำระเงิน
const paymentOptions = [
  { label: "เงินโอน", selected: paymentOption === "Bank Transfer" },
  { label: "เงินสด", selected: paymentOption === "Cash" },
  { label: "เช็ค", selected: paymentOption === "Cheque" },
];

// วาด "ตัวเลือกการชำระเงิน" (ชิดซ้ายของตาราง)
page.drawText(`ตัวเลือกการชำระเงิน`, {
  x: tableLeft, // ชิดซ้ายของตาราง
  y: totalsY - 0.5 * rowHeight, // ตำแหน่ง Y เดียวกับ stateTotalProductPrice
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});

// วาด radio button group ในบรรทัดเดียวกัน
let paymentOptionX = tableLeft; // เริ่มต้นที่ตำแหน่ง X ชิดซ้าย
const optionSpacing = 80; // ระยะห่างระหว่างตัวเลือก

paymentOptions.forEach((option, index) => {
  const symbol = option.selected ? "●" : "○"; // ใช้ ● สำหรับเลือก, ○ สำหรับไม่เลือก
  page.drawText(`${symbol} ${option.label}`, {
    x: paymentOptionX + index * optionSpacing, // ตำแหน่ง X ของแต่ละตัวเลือก
    y: totalsY - 1.35 * rowHeight, // ตำแหน่ง Y ถัดจาก "ตัวเลือกการชำระเงิน"
    size: 8,
    font: arialBdFont,
    color: rgb(0, 0, 0),
  });
});

// วาด remark (บรรทัดถัดจาก radio button group)
// วาด remark (บรรทัดถัดจาก radio option)
const remarkLines = remark.split('\n'); // แยก remark เป็นบรรทัดย่อย
let remarkY = totalsY - 2.2 * rowHeight; // เริ่มต้นที่ตำแหน่ง Y ถัดจาก radio option

remarkLines.forEach((line, index) => {
  page.drawText(line, {
    x: tableLeft, // ชิดซ้ายของตาราง
    y: remarkY - index * 0.85 * rowHeight, // ระยะห่าง 0.85 เท่าของ rowHeight
    size: fontSize,
    font: customSarabunFont,
    color: rgb(0, 0, 0),
  });
});

// Draw signature
const signatureY = totalsY - 4 * rowHeight;
// ฟังก์ชันคำนวณตำแหน่งกึ่งกลางของข้อความ
const calculateCenteredTextX = (text, fontSize) => {
  const textWidth = customSarabunFont.widthOfTextAtSize(text, fontSize);
  return tableLeft + (tableRight - tableLeft) / 2 - textWidth / 2;
};

// วาด "ขอแสดงความนับถือ"
const respectText = "ขอแสดงความนับถือ";
page.drawText(respectText, {
  x: calculateCenteredTextX(respectText, 14), // ใช้ฟอนต์ขนาด 14
  y: signatureY - 3 * rowHeight,
  size: 14,
  font: customBoldSarabunFont,
  color: rgb(0, 0, 0),
});

// วาด "-------------------------"
const lineText = "-------------------------";
page.drawText(lineText, {
  x: calculateCenteredTextX(lineText, fontSize),
  y: signatureY - 5 * rowHeight,
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});

// วาด receiveBy (ลงชื่อผู้รับเงิน)
const receiveByText = `( ${receiveBy} )`;
page.drawText(receiveByText, {
  x: calculateCenteredTextX(receiveByText, fontSize),
  y: signatureY - 6 * rowHeight,
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});

// วาด "เจ้าหน้าที่ผู้รับเงิน"
const officerText = "เจ้าหน้าที่ผู้รับเงิน";
page.drawText(officerText, {
  x: calculateCenteredTextX(officerText, fontSize),
  y: signatureY - 7 * rowHeight,
  size: fontSize,
  font: customSarabunFont,
  color: rgb(0, 0, 0),
});



    const pdfBytes = await pdfDoc.save();
    // (pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return window.open(url);
  }


  return(
    <div className="print-button">
    <button onClick={createPdf}>Download PDF</button>
  </div>
  )
    
}


export default InvoicePdf