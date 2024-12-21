"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fairyImage from "./fairiesdoingwork.png";
import sparkleImage from "./sparkles.png";
import moreSparkleImage from "./moresparkles.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth", { credentials: "include" });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/"); // Redirect to home page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen flex-col space-y-5 bg-pink-50 overflow-hidden">
      {/* TaskFlow Title */}
      <h1 className="text-center text-5xl font-extrabold z-10">
        <span className="text-pink-600">Task</span>
        <span className="text-green-600">Flow</span>
      </h1>

      {/* Main Fairy Image */}
      <div className="z-10">
        <Image
          src={fairyImage}
          alt="A fairy-themed image"
          sizes="70vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Sparkles - Pink */}
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-10 left-10 w-20 h-20 opacity-90"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-1/4 right-16 w-24 h-24 opacity-80"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-2/3 left-16 w-20 h-20 opacity-70"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute bottom-20 right-20 w-32 h-32 opacity-85"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute bottom-10 left-20 w-28 h-28 opacity-75"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-1/2 right-10 w-16 h-16 opacity-90"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-1/3 right-5 w-20 h-20 opacity-75"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute bottom-1/3 left-1/3 w-24 h-24 opacity-80"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-20 left-1/3 w-28 h-28 opacity-70"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute bottom-10 right-1/3 w-24 h-24 opacity-85"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute top-1/6 left-1/4 w-20 h-20 opacity-80"
      />
      <Image
        src={sparkleImage}
        alt="Sparkles"
        className="absolute bottom-1/6 right-1/4 w-24 h-24 opacity-90"
      />

      {/* Sparkles - White */}
      <Image
        src={moreSparkleImage}
        alt="More Sparkles"
        className="absolute top-20 right-1/4 w-24 h-24 opacity-80"
      />
      <Image
        src={moreSparkleImage}
        alt="More Sparkles"
        className="absolute bottom-1/3 left-1/4 w-28 h-28 opacity-75"
      />
      <Image
        src={moreSparkleImage}
        alt="More Sparkles"
        className="absolute top-1/3 left-5 w-32 h-32 opacity-70"
      />
      <Image
        src={moreSparkleImage}
        alt="More Sparkles"
        className="absolute bottom-10 right-10 w-20 h-20 opacity-90"
      />
      <Image
        src={moreSparkleImage}
        alt="More Sparkles"
        className="absolute top-10 right-1/3 w-16 h-16 opacity-85"
      />
      <Image
        src={moreSparkleImage}
        alt="More Sparkles"
        className="absolute bottom-1/4 left-10 w-24 h-24 opacity-80"
      />

      {/* Conditional Button */}
      <div className="mt-8 z-10">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all"
          >
            Click here to Log out
          </button>
        ) : (
          <Link href="/CreateAccount" passHref>
            <button className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all">
              Log In / Create Account
            </button>
          </Link>
        )}
      </div>

      {/* Additional Text */}
      <div className="text-center text-lg font-medium text-green-600 z-10">
        <p>Click on "About Us" above to learn more!</p>
      </div>
    </div>
  );
}
