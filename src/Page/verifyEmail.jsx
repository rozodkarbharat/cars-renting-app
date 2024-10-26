import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../Redux/Slices/AuthSlice";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchResponse() {
      let res = await dispatch(verifyEmail(token))

      if(res.payload.data && !res.payload.data.error){
            navigate('/')
      }
      else{
        alert("Verification Failed!")
      }
    }
    fetchResponse()
  }, [token]);
  return (
    <div className="w-[100%] m-auto flex justify-center h-[100vh] items-center gap-4">
      <p className="text-4xl text-blue-400 capitalise">verifying</p>
      <div aria-label="Loading..." role="status">
        <svg
          className="h-20 w-20 animate-spin stroke-blue-400"
          viewBox="0 0 256 256"
        >
          <line
            x1="128"
            y1="32"
            x2="128"
            y2="64"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="224"
            y1="128"
            x2="192"
            y2="128"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="128"
            y1="224"
            x2="128"
            y2="192"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="32"
            y1="128"
            x2="64"
            y2="128"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
        </svg>
      </div>
    </div>
  );
};

export default VerifyEmail;
