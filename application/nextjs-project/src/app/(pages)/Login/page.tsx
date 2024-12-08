"use client";
import React, { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { LoginFormData } from "@/components/types";
import { useRouter } from "next/navigation";
import Logout from "@/components/Logout";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

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
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPopupMessage("Login successful");
        router.push("/MyCenter");
      } else {
        const errorData = await response.json();
        setPopupMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setPopupMessage("An unexpected error occurred");
    }
  };

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-4xl">Loading...</div>;
  }

  if (authenticated) {
    return <Logout />;
  }

  const closePopup = () => setPopupMessage(null);

  return (
    <main className="bg-pink-50 min-h-screen flex items-center justify-center">
      {popupMessage && (
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center w-[90%] max-w-md">
            <p className="text-green-800 text-lg font-semibold">
              {popupMessage}
            </p>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors focus:outline-none"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col w-[60%] mx-auto max-md:w-full">
        <div className="flex overflow-hidden flex-col items-center px-10 py-10 w-full text-base font-medium bg-white rounded-xl text-stone-400 shadow-lg max-md:px-5 max-md:py-8 max-md:max-w-full">
          <h2 className="self-center mb-6 text-3xl font-extrabold text-pink-700 tracking-[3.2px]">
            Log In
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-base font-medium w-full max-w-[400px] text-stone-400"
            noValidate
          >
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              ariaLabel="Enter your email address"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
              ariaLabel="Enter your password"
            />
            <button
              type="submit"
              className="overflow-hidden self-center px-16 py-3 w-full text-xl font-semibold rounded-xl bg-green-700 max-w-[300px] text-white hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600"
              aria-label="sign in"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;
