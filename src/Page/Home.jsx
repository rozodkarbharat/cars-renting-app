import React, { useState } from 'react'
import SelectDateTime from '../Componnts/SelectDateTime'
import HeroBanner from '../Componnts/HeroBanner';
import FeaturedCars from '../Componnts/FeaturedCars';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  function togglemodal() {
    setShowModal(!showModal);
  }
  
  return (
    <div className='pt-22'>
      <HeroBanner togglemodal={togglemodal}/>
      {showModal&&<SelectDateTime showModal={showModal} togglemodal={togglemodal}  />}
    <FeaturedCars/>
    </div>
  )
}

export default Home