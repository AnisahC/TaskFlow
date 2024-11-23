"use client";
import React, { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { SignupFormData } from "@/components/types";
import Logout from "@/components/Logout";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  // verify user status
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setPopupMessage("Invalid email format");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful");
        // Optionally, redirect to login page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred during registration.");
      setPopupMessage("Registration successful");
      } else {
        const errorData = await response.json();
        setPopupMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setPopupMessage("An error occurred during registration.");
    }

    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange =
    (field: keyof SignupFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  if (authenticated) {
    return <Logout />;
  }
  const closePopup = () => setPopupMessage(null);

  return (
    <main className="bg-pink-50 min-h-screen flex items-center justify-center">
      {/* Popup Message */}
      {popupMessage && (
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center w-[90%] max-w-md">
            <p className="text-green-800 text-lg font-semibold">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors focus:outline-none"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Signup Form */}
      <div className="flex flex-col w-[60%] mx-auto max-md:w-full">
        <div className="flex overflow-hidden flex-col items-center px-10 py-10 w-full text-base font-medium bg-white rounded-xl text-stone-400 shadow-lg max-md:px-5 max-md:py-8 max-md:max-w-full">
          <h2 className="self-center mb-6 text-3xl font-extrabold text-pink-700 tracking-[3.2px]">
            Create Account
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-base font-medium w-full max-w-[400px] text-stone-400"
            noValidate
          >
            <div className="mb-6">
              <InputField
                id="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
                required
                ariaLabel="Enter your full name"
              />
            </div>

            <div className="mb-6">
              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                required
                ariaLabel="Enter your email address"
              />
            </div>

            <div className="mb-8 relative">
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange("password")}
                required
                ariaLabel="Enter your password"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/010b4eadd99f66bd19937c8dbb807b2ebe998544e46d5d596a90a486d60bcaa3?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
                alt=""
                className="absolute right-2 bottom-5 object-contain aspect-[1.1] w-[22px]"
                aria-hidden="true"
              />
            </div>

            <button
              type="submit"
              className="overflow-hidden self-center px-16 py-3 w-full text-xl font-semibold rounded-xl bg-green-700 max-w-[300px] text-white hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600"
              aria-label="Create new account"
            >
              Create Account
            </button>

            <p className="self-center mt-6">
              Already have an account?{" "}
              <a
                href="/Login"
                className="text-pink-600 hover:text-pink-700 focus:outline-none focus:underline"
                aria-label="Go to login page"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
