import React, { useState } from 'react'
import SelectDateTime from '../Componnts/SelectDateTime'
import HeroBanner from '../Componnts/HeroBanner';
import FeaturedCars from '../Componnts/FeaturedCars';
import AddCar from '../Componnts/AddCar';
import GooglePlayStore from '../Componnts/GooglePlayStore';
import Footer from '../Componnts/Footer';


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCarAddModal, setShowCarAddModal] = useState(false);

  function togglemodal() {
    setShowModal(!showModal);
  }

  function togglAddCarModal() {
    setShowCarAddModal(!showCarAddModal)
  }

  return (
    <div className='pt-22'>
      <HeroBanner togglemodal={togglemodal} togglAddCarModal= {togglAddCarModal}/>
      {showModal&&<SelectDateTime showModal={showModal} togglemodal={togglemodal}  />}
      {showCarAddModal && <AddCar togglAddCarModal={togglAddCarModal}/>}
    <FeaturedCars/>
    <GooglePlayStore/>  
    <Footer/>
    </div>
  )
}

export default Home