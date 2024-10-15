import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarsModels, getFilteredCars } from '../Redux/Slices/carSlice';
import { useNavigate } from 'react-router-dom';


const initialValues = {
  startdate: '',
  enddate: '',
  starttime: '00:00',
  endtime: '00:00',
};

const validationSchema = Yup.object({
  startdate: Yup.date().required('Start date is required'),
  enddate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startdate'), 'End date must be later than start date'),
  starttime: Yup.string().required('Start time is required'),
  endtime: Yup.string().required('End time is required'),
});



const SelectDateTime = ({ showModal, togglemodal }) => {
  const {AllCarsModels} = useSelector(state=>state.car)
  const [allBrands,setAllBrands]=useState({})
  const [allModels,setAllModels]=useState([])
  const [selectedBrand,setSelectedBrand]=useState("")
  const [selectedModel,setSelectedModel]=useState("")

  const modalRef = useRef();
  const dispatch= useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCarsModels())
  },[])

  useEffect(() => {
    let tempAllCarsbrands ={}
    let tempmodels= AllCarsModels.map((car)=>{
      tempAllCarsbrands[car.brandname] = 1
      return car.modelname
     })
     tempAllCarsbrands = Object.keys(tempAllCarsbrands)
     setAllBrands(tempAllCarsbrands)
     setAllModels(tempmodels)
  },[AllCarsModels])

  const handleSubmit = (values) => {
    
    const startDateTime = new Date(`${values.startdate}T${values.starttime}`);
    const endDateTime = new Date(`${values.enddate}T${values.endtime}`);
    const startEpoch = Math.floor(startDateTime.getTime() / 1000);
    const endEpoch = Math.floor(endDateTime.getTime() / 1000); 
    let selectedModelDetail = AllCarsModels.filter((model)=>model.modelname == selectedModel)
    console.log(startEpoch, endEpoch, selectedModel, selectedModelDetail[0].id,'submit')
    // dispatch(getFilteredCars({starttime:startEpoch, endtime:endEpoch,modelid:selectedModelDetail[0].id}))
      togglemodal()
      navigate(`/cars?endtime=${endEpoch}&starttime=${startEpoch}&modelid=${selectedModelDetail[0].id}`)
  };



  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      togglemodal();
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function selectBrand(e){
    let tempselectedModels=[]
     AllCarsModels.map((model) =>{
      if(model.brandname === e.target.value){
        tempselectedModels.push( model.modelname)
      }
     })

     if(selectBrand){
      if(!tempselectedModels.includes(selectModel)){
          setSelectedModel("")
      }
     }
     setAllModels(tempselectedModels)
     setSelectedBrand(e.target.value)
  }

  function selectModel(e){
    let tempSelectedbrand = AllCarsModels.filter((model) =>{
      if(model.modelname === e.target.value){
        return true
      }
      else return false
     })
     setSelectedBrand(tempSelectedbrand[0].brandname)
     setSelectedModel(e.target.value)
  }

  return (
    <div ref={modalRef} className='w-[60%] max-w-[500px] m-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg z-50 top-[20vh] left-[20%] fixed  bg-white ' >
      <div className="flex items-center justify-between p-2 md:pt-6 rounded-t">
        <button onClick={togglemodal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-0 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}

      >
        {({ values, handleChange }) => (
          <Form className='py-10' >
            <div className="flex justify-center gap-8  ">
              <div className='w-[40%]'>
                <p>From Date</p>
                <Field name="startdate">
                  {({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="my-5 bg-gray-50 border-2 border-gray-300 rounded-md p-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  )}
                </Field>
                <ErrorMessage name="startdate" component="div" className="text-red-500 text-sm" />

                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Field name="starttime">
                    {({ field }) => (
                      <input
                        {...field}
                        type="time"
                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min="09:00"
                        max="18:00"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="starttime" component="div" className="text-red-500 text-sm" />
                </div>

              </div>

              <div className='w-[40%]'>
                <p>Till Date</p>
                <Field name="enddate">
                  {({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="my-5 bg-gray-50 border-2 border-gray-300 rounded-md p-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  )}
                </Field>
                <ErrorMessage name="enddate" component="div" className="text-red-500 text-sm" />

                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Field name="endtime">
                    {({ field }) => (
                      <input
                        {...field}
                        type="time"
                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min="09:00"
                        max="18:00"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="endtime" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
            </div>
            <div className='flex justify-center gap-8 w-[100%]'>

              <div className='w-[40%]'>
                <label for="hs-select-label" class="block  my-2 dark:text-white">Select Brand</label>
                <select value={selectedBrand} onChange={selectBrand} id="hs-select-label" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option selected="">Select Brand</option>
                  {
                  allBrands.length>0 &&  allBrands?.map((brand)=>{
                   return  <option value={brand}>{brand}</option>})
                  }
                </select>
              </div>
              <div className='w-[40%]'>
                <label for="hs-select-label" class="block  my-2 dark:text-white">Select Model</label>
                <select value={selectedModel} onChange={selectModel} id="hs-select-label" class="py-3 px-2 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option selected="">Select Model</option>
                  {
                   allModels.length>0 && allModels?.map((model)=>(<option key ={model.id} value={model}>{model}</option>))
                  }
                </select>
              </div>
            </div>
            <button type='submit' className='bg-blue-600 text-white py-2 px-12 rounded mt-4 text-xl ml-[7%]'>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SelectDateTime;
