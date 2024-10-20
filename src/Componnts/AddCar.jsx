import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, getAllCarsModels } from '../Redux/Slices/carSlice';
import Loader from './Loader';

const validationSchema = Yup.object({
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  fuelType: Yup.string().required('Fuel type is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  charge: Yup.number().required('Charge is required').positive('Charge must be positive'),
  file: Yup.mixed().required('File is required'),
});

const AddCar = ({ togglAddCarModal }) => {
  const { AllCarsModels, isLoading } = useSelector(state => state.car);
  const [allBrands, setAllBrands] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const {userId, token} = useSelector(state=>state.auth)


  useEffect(() => {
    dispatch(getAllCarsModels(token));
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      togglAddCarModal();
    }
  };

  useEffect(() => {
    let tempAllCarsbrands = {}
    let tempmodels = AllCarsModels.map((car) => {
      tempAllCarsbrands[car.brandname] = 1
      return car.modelname
    })
    tempAllCarsbrands = Object.keys(tempAllCarsbrands)
    setAllBrands(tempAllCarsbrands)
    setAllModels(tempmodels)
  }, [AllCarsModels])

  const selectBrand = (e, setFieldValue) => {
    const brand = e.target.value;
    let tempselectedModels = [];
    if (brand !== "") {
      AllCarsModels.forEach((model) => {
        if (model.brandname === brand) {
          tempselectedModels.push(model.modelname);
        }
      });
      setAllModels(tempselectedModels);
      setFieldValue('model', tempselectedModels.includes(e.target.value) ? e.target.value : ""); // Reset model if it's not in the new brand's models
    } else {
      setAllModels(AllCarsModels.map(car => car.modelname));
      setFieldValue('model', "");
    }
    setFieldValue('brand', brand);
  };

  const selectModel = (e, setFieldValue) => {
    const selectedModel = e.target.value;
    const selectedBrand = AllCarsModels.find(model => model.modelname === selectedModel)?.brandname || "";
    setFieldValue('brand', selectedBrand);
    setFieldValue('model', selectedModel);
  };

  const handleSubmit = async (values) => {
    let selectedModelDetail = AllCarsModels.filter((model)=>model.modelname == values.model)
    let carid = Date.now() 

    const formData = new FormData();
      formData.append('image', values.file); // Assuming the file input's name is 'image'
      formData.append('brandname', values.brand);
      formData.append('modelname', values.model);
      formData.append('fueltype', values.fuelType);
      formData.append('carnumber', values.registrationNumber);
      formData.append('charge', values.charge);
      formData.append('modelid', selectedModelDetail[0].id);
      formData.append('carid', carid);
      formData.append('userid', userId);

     let response = await dispatch(addCard({formData, token}));
     if(!response.payload.error){
      togglAddCarModal()
     }
     else{
      alert(response?.payload?.message || "something went wrong")
     }
  };

  return (
    <div ref={modalRef} className='w-[60%] max-w-[500px] m-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg z-50 top-[20vh] left-[20%] fixed bg-white pt-3'>
      <div className="flex items-center justify-between p-2 md:pt-6 rounded-t">
        <button onClick={togglAddCarModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-0 ms-auto inline-flex justify-center items-center">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
      {isLoading && <Loader/>}
      <Formik
        initialValues={{
          brand: '',
          model: '',
          fuelType: '',
          registrationNumber: '',
          charge: '',
          file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className='pb-10'>
            <div className='flex justify-center gap-8 w-[100%] mb-2'>
              <div className='w-[40%]'>
                <label className="block my-2 dark:text-white">Select Brand</label>
                <Field as="select" name="brand" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => selectBrand(e, setFieldValue)}>
                  <option value="">Select Brand</option>
                  {allBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Field>
                <ErrorMessage name="brand" component="div" className="text-red-500" />
              </div>
              <div className='w-[40%]'>
                <label className="block my-2 dark:text-white">Select Model</label>
                <Field as="select" name="model" className="py-3 px-2 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => selectModel(e, setFieldValue)}>
                  <option value="">Select Model</option>
                  {allModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </Field>
                <ErrorMessage name="model" component="div" className="text-red-500" />
              </div>
            </div>
            <div className='flex justify-center gap-8 w-[100%] mb-2'>
              <div className='w-[40%]'>
                <label className="block my-2 dark:text-white">Fuel Type</label>
                <Field as="select" name="fuelType" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </Field>
                <ErrorMessage name="fuelType" component="div" className="text-red-500" />
              </div>
              <div className='w-[40%]'>
                <label className="block my-2 dark:text-white">Registration Number</label>
                <Field name="registrationNumber" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="MH02AC0215" />
                <ErrorMessage name="registrationNumber" component="div" className="text-red-500" />
              </div>
            </div>
            <div className='flex justify-left gap-8 w-[100%] ml-[7%] mb-2'>
              <div className='w-[40%]'>
                <label className="block my-2 dark:text-white">Charge (per hour)</label>
                <Field name="charge" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="200" />
                <ErrorMessage name="charge" component="div" className="text-red-500" />
              </div>
              <div className='w-[40%]'>
                <label className="block my-2 dark:text-white">Upload Car Image</label>
                <input className='"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="file" onChange={(event) => setFieldValue('file', event.currentTarget.files[0])} required />
                <ErrorMessage name="file" component="div" className="text-red-500" />
              </div>
            </div>
            <button type='submit' className='bg-blue-600 text-white py-2 px-12 rounded mt-4 text-xl ml-[7%]'>
              Add Car
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCar;
