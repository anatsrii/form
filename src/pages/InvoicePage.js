// import "../style/invoicePage.css";
import "../style/newInvoicePage.css"
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {
  addProduct,
  updateProduct,
  removeProduct,
  updateDiscount,
} from "../store/productReducer.js";
import { setPaymentOption, setReceiveBy,setRemark } from "../store/documentReducer.js";
import InvoicePdf from "../components/InvoicePdf.js";
import Sidebar from "../components/Sidebar.js";

const InvoicePage = () => {
  const dispatch = useDispatch();
  // user state
  const {
    userCompany,
    userName,
    userLastName,
    userPhone,
    userEmail,
    userAddress,
    userTaxId,
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
  } = useSelector((stateCustomer) => stateCustomer.customer);

  // document state
  const { documentReference, invoiceNumber, createDate, receiveBy, remark, paymentOption } =
    useSelector((state) => state.document);
  const handleReceiveBy = (value) => {
    dispatch(setReceiveBy(value));
  };

  // product state
  const productList = useSelector((state) => state.product.productList);

  const { totalProductPrice, vat, grandTotal, discount, grandTotalText } = useSelector(
    (state) => state.product
  );


  const handleAddProduct = () => {
    dispatch(addProduct());
  };

  const handleUpdateProduct = (index, field, value) => {
    dispatch(updateProduct({ index, product: { [field]: value } }));
  };

  const handleRemoveProduct = (index) => {
    dispatch(removeProduct(index));
  };

  const handleDiscountChange = (value) => {
    dispatch(updateDiscount(value));
  };

  const handlePaymentOption = (value) => {
    console.log(value)
    dispatch(setPaymentOption(value))
    console.log(paymentOption)
  };
  
  const handleRemark = (value) => {
    dispatch(setRemark(value));
    console.log(remark)
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <div className="invoice-container">
          <div className="invoice-header">
            <div className="company-info">
              {/* <h1>Logo</h1> */}
              <p>{userCompany || "N/A"}</p>
              <p>{`${userName || ""} ${userLastName || ""}`}</p>
              <p>ที่อยู่: {userAddress || "N/A"}</p>
              <p>เบอร์ที่ติดต่อได้: {userPhone || "N/A"}</p>
              <p>Email: {userEmail || "N/A"}</p>
              <p>เลขประจำตัวผู้เสียภาษี: {userTaxId || "N/A"}</p>
            </div>
            <div className="invoice-info">
              <h1>ใบเสร็จรับเงิน / ใบกำกับภาษี</h1>
              <p>เลขที่: {invoiceNumber || "N/A"}</p>
              <p>วันที่ออกเอกสาร: {createDate || "N/A"}</p>
              <p>เอกสารอ้างอิง: {documentReference || "N/A"}</p>
            </div>
          </div>

          <div className="customer-main">
            <section className="customer-info">
              <p>ได้รับเงินจาก</p>
              <p>{customerCompany || "N/A"}</p>
              <p>{`คุณ ${customerName || ""} ${customerLastName || ""}`}</p>
              <p>ที่อยู่: {customerAddress || "N/A"}</p>
              <p>เบอร์โทร: {customerPhone || "N/A"}</p>
              <p>Email: {customerEmail || "N/A"}</p>
              <p>เลขประจำตัวผู้เสียภาษี: {customerTaxId || "N/A"}</p>
            </section>
          </div>
          <main className="invoice-main">
            <div>
          <button onClick={handleAddProduct} className="btn-add-row">+</button> เพิ่มรายการ
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th></th>
                  <th>รหัสสินค้า</th>
                  <th>รายการ</th>
                  <th>รายละเอียด</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>รวม</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <button onClick={() => handleRemoveProduct(index)} className="btn-delete-product">
                        -
                      </button>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="productCode"
                        value={product.productCode}
                        onChange={(e) =>
                          handleUpdateProduct(
                            index,
                            "productCode",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={(e) =>
                          handleUpdateProduct(
                            index,
                            "productName",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="productDetail"
                        value={product.productDetail}
                        onChange={(e) =>
                          handleUpdateProduct(
                            index,
                            "productDetail",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="productPrice"
                        value={product.productPrice}
                        onChange={(e) =>
                          handleUpdateProduct(
                            index,
                            "productPrice",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="productQuantity"
                        value={product.productQuantity}
                        onChange={(e) =>
                          handleUpdateProduct(
                            index,
                            "productQuantity",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalPrice"
                        value={product.totalPrice}
                        onChange={(e) =>
                          handleUpdateProduct(
                            index,
                            "totalPrice",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>

          <footer className="invoice-footer">
            <div className="invoice-footer-head">
            <div className="remark">
              <p>ตัวเลือกการชำระเงิน</p>
              <form>
                <input
                  type="radio"
                  id="option1"
                  value={"Bank Transfer"}
                  name="paymentOption"
                  onChange={(e)=> handlePaymentOption(e.target.value, e.target.checked)}
                ></input>
                <label htmlFor="option1">เงินโอน</label>
                <input
                  type="radio"
                  id="option2"
                  value={"Cash"}
                  name="paymentOption"
                  onChange={(e)=> handlePaymentOption(e.target.value, e.target.checked)}
                ></input>
                <label htmlFor="option2">เงินสด</label>
                <input
                  type="radio"
                  id="option3"
                  value={"Cheque"}
                  name="paymentOption"
                  onChange={(e)=> handlePaymentOption(e.target.value, e.target.checked)}
                ></input>
                <label htmlFor="option3">เช็ค</label>
              </form>
              <textarea placeholder="หมายเหต:" value={remark} onChange={(e)=>handleRemark(e.target.value)}></textarea>
            </div>
            <div className="totals">
              <p>รวมจำนวนเงิน: {Number(totalProductPrice).toFixed(2)} บาท</p>
              <p>
                ส่วนลด:
                <input
                  type="number"
                  name="discount"
                  value={discount}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                /> บาท
              </p>
              <p>ภาษีมูลค่าเพิ่ม: {Number(vat).toFixed(2)} บาท</p>
              <p>ยอดเงินสุทธิ: {Number(grandTotal).toFixed(2)} บาท</p>
            </div>
            </div>
              <p className="text-thai">{grandTotalText}</p>
            <div className="signature">
              <p>ขอแสดงความนับถือ</p>
              
              <p>{/*Signature here*/}</p>
              <p>-------------------------</p>
              <p>
                (
                <input
                  value={receiveBy}
                  name="receiveBy"
                  onChange={(e) => handleReceiveBy(e.target.value)}
                  placeholder="ลงชื่อผู้รับเงิน"
                />
                )
              </p>
              <p>เจ้าหน้าที่ผู้รับเงิน</p>
            </div>
          </footer>

          <InvoicePdf />
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
