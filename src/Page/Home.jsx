import React, { useState } from 'react'
import SelectDateTime from '../Componnts/SelectDateTime'
import HeroBanner from '../Componnts/HeroBanner';

const Home = () => {
  const [showModal, setShowModal] = useState(true);
  function togglemodal() {
    setShowModal(!showModal);
  }
  return (
    <div className='pt-22'>
      <HeroBanner togglemodal={togglemodal}/>
      {showModal&&<SelectDateTime showModal={showModal} togglemodal={togglemodal}  />}
      <div inline-datepicker data-date="02/25/2022"></div>
    </div>
  )
}

export default Home