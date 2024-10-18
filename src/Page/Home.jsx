import React, { useState } from 'react'
import SelectDateTime from '../Componnts/SelectDateTime'
import HeroBanner from '../Componnts/HeroBanner';
import FeaturedCars from '../Componnts/FeaturedCars';
import AddCar from '../Componnts/AddCar';
import { Toaster } from 'react-hot-toast';

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
      <Toaster />
      <HeroBanner togglemodal={togglemodal} togglAddCarModal={togglAddCarModal} />
      {showModal && <SelectDateTime showModal={showModal} togglemodal={togglemodal} />}
      {showCarAddModal && <AddCar togglAddCarModal={togglAddCarModal} />}
      <FeaturedCars />
    </div>
  )
}

export default Home