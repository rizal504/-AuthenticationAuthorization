import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      // Menyimpan token ke local storage
      localStorage.setItem("token", token);

      // Menampilkan pesan toast "Login berhasil"
      toast.success("Login berhasil");

      // Menunggu 2 detik sebelum navigasi ke halaman "/home"
      setTimeout(() => {
        // Navigasi ke halaman "/home" setelah berhasil login
        navigate("/home", { state: { token: token } });
      }, 2000);
    } catch (error) {
      // Menampilkan pesan error jika terjadi kesalahan
      console.error("Error:", error.message);
      toast.error("Gagal Login. Silakan coba lagi.");
    }
  };

  // Penggunaan hook useGoogleLogin untuk login dengan Google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      // Memanggil fungsi registerLoginWithGoogleAction setelah berhasil login
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
    onError: () => {
      // Menampilkan pesan error jika login gagal
      toast.error("Gagal Login. Silakan coba lagi.");
    }
  });

  return (
    <>
      {/* Komponen ToastContainer dari react-toastify */}
      <ToastContainer />

      {/* Tombol untuk login dengan Google */}
      <button variant="primary" onClick={() => loginWithGoogle()}>
        {buttonText}
      </button>

      {/* Komponen GoogleLogin dari @react-oauth/google */}
      <Google
        onSuccess={(credentialResponse) => {
          // Menyimpan token ke local storage
          localStorage.setItem("token", credentialResponse.credential);

          // Menampilkan pesan toast "Login berhasil"
          toast.success("Login berhasil");

          // Menunggu 2 detik sebelum navigasi ke halaman "/home"
          setTimeout(() => {
            // Navigasi ke halaman "/home" setelah berhasil login
            navigate("/home", { state: { token: credentialResponse.credential } });
          }, 2000);
        }}
        onError={() => {
          // Menampilkan pesan error jika login gagal
          toast.error("Gagal Login. Silakan coba lagi.");
        }}
      />
    </>
  );
}

export default GoogleLogin;
