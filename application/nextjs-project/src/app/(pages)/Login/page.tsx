"use client";
import React, { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { LoginFormData } from "@/components/types";
import { useRouter } from "next/navigation";
import Logout from "@/components/Logout";

const SignInForm: React.FC = () => {
  const router = useRouter();
  // verify user status
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        alert("Login successful");
        // Redirect or handle login success
        router.push("/MyCenter");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleInputChange =
    (field: keyof LoginFormData) =>
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

  return (
    <main className="bg-stone-300 h-screen">
      <div className="flex gap-5 max-md:flex-col h-full">
        <section className="relative flex pl-10 flex-col w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-8 text-2xl tracking-tight text-orange-950 max-md:mt-10 max-md:max-w-full">
            <h1 className="self-start font-bold">TaskFlow</h1>
            <p className="mt-24 max-md:mt-10 max-md:max-w-full">
              TaskFlow helps users to manage daily schedules and activities more
              effectively.
            </p>
          </div>
        </section>
        <section className="flex flex-col w-[67%] ml-0 max-md:w-full">
          <div className="h-full flex overflow-hidden flex-col items-center pt-5 pr-5 pb-32 pl-20 mx-auto w-full text-base font-medium bg-white rounded-[40px_0px_0px_40px] text-stone-400 max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
            <h2 className="self-start mt-12 mb-8 text-3xl font-extrabold text-foreground tracking-[3.2px] max-md:mt-10">
              Log In
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col text-base font-medium rounded-none max-w-[561px] text-stone-400"
              noValidate
            >
              <div className="mt-14 max-md:mt-10">
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

              <div className="mt-16 max-md:mt-10 relative">
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
                className="overflow-hidden self-center px-16 pt-2 pb-5 mt-16 w-full text-xl font-semibold rounded-xl bg-stone-500 max-w-[405px] text-orange-950 hover:bg-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:opacity-50 disabled:cursor-not-allowed max-md:px-5 max-md:mt-10"
                aria-label="sign in"
              >
                Sign In
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignInForm;
