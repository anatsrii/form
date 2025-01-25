import '../style/dashboard.css';

function Stats () {
  return (
    <div className="stats-container">
        <div className='stat-card'><p>จำนวนเอกสารทั้งหมด <b>32</b></p></div>
        <div className='stat-card'><p>จำนวนใบเสร็จ <b>26</b></p></div>
        <div className='stat-card'><p>จำนวนใบเสนอราคา <b>6</b></p></div>
      </div>
  )
}

export default Stats;