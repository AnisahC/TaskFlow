"use client";
import Link from "next/link";
import Image from "next/image";
import { Patrick_Hand_SC, Inria_Sans } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion, px } from "framer-motion";
import { useState } from "react";
import profileImage from "../zoe/image_zoe.png";
import dialogImage from "../zoe/dialog_zoe.png";

const patrickHandSc = Patrick_Hand_SC({
  weight: "400",
  subsets: ["latin"],
});
const Inria = Inria_Sans({
  weight: "400",
  subsets: ["latin"],
});

const FlowerAnimation = ({ isVisible }: { isVisible: boolean }) => {
  const flowers = ["🌸", "🌼", "🌷", "🌹", "💖", "❤️"];
  return (
    <div className="absolute inset-0 translate-y-[-40px] translate-x-[-30px]">
      {isVisible &&
        flowers.map((flower, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: [0, -50, 0] }}
            transition={{
              duration: 2,
              delay: index * 0.5,
              repeat: 1,
              yoyo: true,
            }}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {flower}
          </motion.div>
        ))}
    </div>
  );
};

export default function PersonalInformation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const toggleFlowers = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };
  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };
  const toggleAbout = () => {
    setIsAboutVisible(!isAboutVisible);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
      <div className="relative">
        <FlowerAnimation isVisible={isVisible} />
        <Image
          src={profileImage}
          width={150}
          height={150}
          className="rounded-full"
          alt="Zoe Long"
        />
      </div>

      <h1 className={`${patrickHandSc.className} text-5xl font-bold mt-3 z-10`}>
        Zoe Long
      </h1>
      <p className={`${Inria.className} my-2`}>Hello 648/848</p>
      <div className="flex flex-row justify-between w-30 mb-5">
        {/* <FontAwesomeIcon icon={faInstagram} width={40} height={40} /> */}

        <a href="https://github.com/ZoeLong98">
          <FontAwesomeIcon icon={faGithub} width={40} />
        </a>

        {/* <FontAwesomeIcon icon={faLinkedin} width={40} /> */}
        <div onClick={toggleDialog}>
          <FontAwesomeIcon icon={faEnvelope} width={40} />
        </div>

        {isDialogVisible && (
          <div>
            <Image
              className="absolute translate-y-[-130px]"
              src={dialogImage}
              width={200}
              height={200}
              alt=""
            ></Image>
            <div
              className={`${Inria.className} absolute text-[10px] text-center translate-x-7 translate-y-[-55px]`}
            >
              <b>Email:</b>
              <br />
              zeyulong0908@gmail.com
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between w-40">
        {isAboutVisible && (
          <div
            className={`${Inria.className} absolute border-4 border-black translate-x-[-200px] translate-y-[-50px] px-5 py-3 rounded-lg`}
          >
            <b>My position:</b>
            <p>Front end, Testing</p>
          </div>
        )}

        <button
          onClick={toggleAbout}
          className={`${Inria.className} bg-gray-300 py-1 px-2 rounded`}
        >
          About
        </button>
        <button
          className={`${Inria.className} bg-gray-300 py-1 px-2 rounded`}
          onClick={toggleFlowers}
        >
          Click me
        </button>
      </div>
    </div>
  );
}
