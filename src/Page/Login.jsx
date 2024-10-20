import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../Redux/Slices/AuthSlice';
import Loader from '../Componnts/Loader';
import toast, { Toaster } from 'react-hot-toast';
const notify = (message, type) => toast[type](message)

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)
  
  const onSubmit = async(values) => {
    try{

      if (isLoading) return 
      let signinRes =  await dispatch(signIn(values))
      if(signinRes?.payload?.data && !signinRes?.payload?.data?.error){
      }
      else{
        notify(signinRes?.payload?.data?.message || "Something went wrong, Please try again",'error')
      }
    }
    catch(error){
      console.log(error,'error')
      notify("Something went wrong, Please try again",'error')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
     {isLoading &&  <Loader/>}
     <Toaster />
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    required
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                  </div>
                  <Field
                    name="password"
                    type="password"
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              to="/signup"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
