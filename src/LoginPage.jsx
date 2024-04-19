import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol tampilan password
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error("Email dan kata sandi wajib diisi");
      return;
    }
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email,
          password,
          expiresInMins: 30,
        }
      );

      const receivedToken = response.data.data.token;
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
      toast.success("Login berhasil!");
      setTimeout(() => {
        navigate("/home", {
          state: { login: response.data.results },
        });
      }, 1500); // Delay sebelum pindah halaman
    } catch (error) {
      console.error("Error:", error.response.data);
      toast.error("Email atau kata sandi yang dimasukkan salah");
    }
  };

  useEffect(() => {
    console.log("token", localStorage.getItem("token"));
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      alert("Tidak perlu login lagi, kamu masih aktif");
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  // Fungsi untuk menampilkan atau menyembunyikan kata sandi
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFA500]">
      <div className="border border-black py-10 px-24 rounded-3xl bg-black shadow-xl">
        <h2 className="flex justify-center pb-10 text-3xl font-bold text-white">
          Login MovieKU
        </h2>
        <form className="grid grid-col-1" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            className="border p-2 rounded-lg mb-5 focus:bg-gray-100 focus:text-gray-500 focus:ring-0"
          />
          <div className="relative">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              className="border py-2 pl-2 pr-8 rounded-lg mb-5 focus:bg-gray-100 focus:text-gray-500 focus:ring-0"
            />
            {/* Ikon mata untuk menampilkan atau menyembunyikan kata sandi */}
            {showPassword ? (
              <EyeSlashIcon
                className="absolute right-2 top-2 h-6 w-6 text-slate-300 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeIcon
                className="absolute right-2 top-2 h-6 w-6 text-slate-300 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          <button
            type="submit"
            className="p-2 bg-[#FFA500] hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105 mb-5"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center">
          <div className="border-t border-white w-full"></div>
          <p className="text-white mx-3">OR</p>
          <div className="border-t border-white w-full"></div>
        </div>
        <div className="py-3">
          <GoogleLogin
            buttonText={"Lanjutkan Dengan Google"}
            isAuthenticated={false}
          />
        </div>
        <div className="flex justify-center text-white hover:text-[#FFA500] ">
          <Link to={"/register"}>Belum Punya Akun? Daftar</Link>
        </div>
      </div>
   
    </div>
  );
};

export default Login;
