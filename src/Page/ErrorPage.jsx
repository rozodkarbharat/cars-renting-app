import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center ">
      <div class="text-center">
        <h1 class="mb-4 text-6xl font-semibold text-blue-500">404</h1>
        <p class="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
        <div class="animate-bounce">
          <svg
            class="mx-auto h-16 w-16 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p onClick={()=> navigate("/")} class="mt-4 text-gray-600 cursor-pointer ">
          Let's get you back{" "}
          <p  class="text-blue-500">
            home
          </p>
          .
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
