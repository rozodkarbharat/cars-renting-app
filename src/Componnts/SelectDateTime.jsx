import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


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

const SelectDateTime = ({showModal, togglemodal}) => {
    const modalRef = useRef();


  const handleSubmit = (values) => {
    
    const startDateTime = new Date(`${values.startdate}T${values.starttime}`);
    const endDateTime = new Date(`${values.enddate}T${values.endtime}`);
    const startEpoch = Math.floor(startDateTime.getTime() / 1000); // convert to seconds
    const endEpoch = Math.floor(endDateTime.getTime() / 1000); // convert to seconds
    togglemodal()
  };



  const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log("clicked")
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

  return (
    <div ref={modalRef} className='w-[60%] max-w-[500px] m-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg z-50 top-[20vh] left-[20%] fixed  bg-white ' >
        <div className="flex items-center justify-between p-2 md:pt-6 rounded-t">
                <button onClick={togglemodal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-0 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      
    >
      {({ values, handleChange }) => (
        <Form className="flex justify-center gap-8 py-10 ">
          <div>
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

            <button type='submit' className='bg-blue-600 text-white py-2 px-12 rounded mt-4 text-xl'>
              Search
            </button>
          </div>

          <div>
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
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default SelectDateTime;