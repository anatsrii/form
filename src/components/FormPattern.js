import '../style/formPattern.css'
function FormPattern () {
    return(
        <div className="main-container">
            <div className="header-name">
                <h1>ใบเสร็จรับเงิน</h1>
            </div>
            <div className="address-container">
                <div className="address-customer">
                    <p>name: <input type='text'></input></p>
                    <p>address: <input type='text'></input></p>
                    <p>เบอร์ติดต่อ <input type='number'></input></p>
                    <p>Email:<input type='email'></input></p>
                    <p>เลขผู้เสียภาษี<input type='number'></input></p>
                </div>
                <div className="address-user">
                    <p>name: <input type='text'></input></p>
                    <p>address: <input type='text'></input></p>
                    <p>เบอร์ติดต่อ <input type='number'></input></p>
                    <p>Email:<input type='email'></input></p>
                    <p>เลขผู้เสียภาษี:<input type='number'></input></p>
                    </div>
            </div>
            <div className="document-control-container">
                <div className="document-no">
                    <p>Document No</p>
                    <p>Create Date</p>
                </div>
                <div className="document-ref">
                    <p>Document Ref</p>
                    <p>Money receipt Date</p>
                </div>
            </div>
            <div className="items-list-container">
                <div className="table-items">
                    <table>
                        <tr>
                            <th>Items-code</th>
                            <th>Detail</th>
                            <th>Price / Unit</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </table>
                </div>
                <div className="table-total">
                    <table>
                        <tr>
                            <td>Remark</td>
                            <td>ยอดรวม</td>
                            <td>บาท</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>ส่วนลด</td>
                            <td>บาท</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>ยอดรวมหักส่วนลด</td>
                            <td>บาท</td>
                        </tr>
                        <tr>
                            <td>ห้าร้อยบาทถ้วน</td>
                            <td>ยอดรวมสุทธิ</td>
                            <td>บาท</td>
                        </tr>
                    </table>
                </div>
                <div className="signature-container">
                    <div className="customer-signature">
                        <p>---------------</p>
                        <p>(               )</p>
                        <p>ผู้มีอำนาจลงนาม</p>
                    </div>
                    <div>ตราประทับ</div>
                    <div className="user-signature">
                        <p>---------------</p>
                        <p>(               )</p>
                        <p>ผู้รับเงิน</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPattern