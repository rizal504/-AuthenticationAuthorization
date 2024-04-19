import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseRegister = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          password: password,
          name: name,
          email: email,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(responseRegister.data);
      // setSuccessMessage("Registrasi berhasil. Data Anda telah disimpan.");
      localStorage.setItem("token", responseRegister.data.token);
      toast.success("Registrasi berhasil. Silakan login.");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setSuccessMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        // setSuccessMessage("Terjadi kesalahan saat mendaftar.");
        toast.error("Terjadi kesalahan saat mendaftar.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black ">
      <div className="border border-black py-10 px-24 rounded-3xl  bg-[#FFA500]">
        <h2 className="flex justify-center pb-10 text-3xl font-bold ">
          Daftar Akun MovieKU
        </h2>
        <form className="grid grid-col-1" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 rounded-lg mb-5 focus:bg-gray-100 focus:text-gray-500 focus:ring-0"
          />
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            className="border p-2 rounded-lg mb-5 focus:bg-gray-100 focus:text-gray-500 focus:ring-0"
          />

          <div className="relative">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className=" text-left placeholder-left border pl-2 pr-12 py-2 rounded-lg mb-5 focus:bg-gray-100 focus:text-gray-500 focus:ring-0"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-2"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? (
                <EyeIcon className="absolute right-2 top-2 h-6 w-6 text-black cursor-pointer" />
              ) : (
                <EyeSlashIcon className="absolute right-2 top-2 h-6 w-6 text-black cursor-pointer" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="p-2 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105 mb-5"
          >
            Register
          </button>
          {successMessage && <p>{successMessage}</p>}
        </form>

        <div className="flex justify-center text-white hover:text-black ">
          <button onClick={handleLoginClick}> Sudah Punya Akun? Login</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
