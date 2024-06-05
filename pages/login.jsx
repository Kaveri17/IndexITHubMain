"use client";
import React, { useState } from "react";
import { GiThreeLeaves } from "react-icons/gi";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { authenticate, userLogin } from "./api/userApi";

const login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let [error, setError] = useState("");
  let [success, setSuccess] = useState(false);

  let router = useRouter();

  let { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    // console.log(formData)
    event.preventDefault();

    if (email == null || password == null) {
      setError("Please enter all required fields");
    } else {
      userLogin(formData)
        .then((data) => {
          if (data.error) {
            setSuccess(false);
            setError(data.error);
          } else {
            setError("");
            setSuccess(true);
            setFormData({
              email: "",
              password: "",
            });
            authenticate(data);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const showError = () => {
    if (error) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: "error",
        text: error,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: "#d33",
      });
      setError("");
    }
  };

  const showSuccess = () => {
    if (success) {
      Swal.fire({
        icon: "success",
        toast: true,
        title: "success",
        text: "Login Successfull",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: "#64DD17",
      });
      setSuccess("");
      return router.push("/admin");
    }
  };

  return (
    <div>
      {showError()}
      {showSuccess()}

      <div className="log_in flex justify-center text-center items-center font-serif ">
        <div className="circle lg:border-8 border-4 bg-blue-200 opacity-80 flex flex-col justify-center items-center">
          <div className="flex justify-center md:text-3xl text-xl font-bold">
            Log <GiThreeLeaves className="text-blue-700 ml-1 mr-1" /> In
          </div>
          <div className="login-div ">
            <div className="flex flex-col">
              <label htmlFor="email" className="p-2 ">
                <div className="flex p-1 font-3 md:text-lg test-sm ">
                  Email: <MdEmail className="mt-1 ml-2 " />
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email.."
                  onChange={handleChange}
                  className=" rounded-md py-1.5 w-full placeholder:p-1 p-4 bg-white text-sm md:text-xl"
                  required
                />
              </label>
              <label htmlFor="password" className="p-2">
                <div className="flex p-1 md:text-lg test-sm">
                  Password: <FaUnlockKeyhole className="mt-1 ml-2" />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password..."
                    onChange={handleChange}
                    className=" rounded-md py-1.5 w-full  placeholder:p-1 p-4 bg-white text-sm md:text-xl"
                    required
                  />

                  {showPassword ? (
                    <IoIosEye
                      type="button"
                      aria-label={
                        showPassword
                          ? "Password Visible"
                          : "Password Invisible."
                      }
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      className="absolute right-3 top-0 translate-y-1/2 text-xl"
                    />
                  ) : (
                    <IoIosEyeOff
                      type="button"
                      aria-label={
                        showPassword
                          ? "Password Visible"
                          : "Password Invisible."
                      }
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      className="absolute right-3 top-0 translate-y-1/2 text-xl"
                    />
                  )}
                </div>
              </label>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  onChange={handleChange}
                  id="remember"
                  className=""
                />
                <label htmlFor="remember" className="lg:text-base md:text-sm text-xs">
                  Remember Me
                </label>
              </div>
              <a href="/users/forgetpassword" className="md:text-md lg:text-base md:text-sm text-xs text-blue-600 hover:text-blue-700 font-semibold">
                Forgot Password?
              </a>
            </div>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-indigo-500 mt-4 font-medium text-sm md:text-base lg:text-lg"
            >
              <a href="#" className="text-white hover:text-black md:text-base text-sm">
                Login
              </a>
            </button>
            <p className="text-center lg:text-base md:text-sm text-xs pt-2">
              Don't have an account?{" "}
              <Link
                href={"/register"}
                className="text-blue-500 font-semibold lg:text-base md:text-sm text-xs"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
