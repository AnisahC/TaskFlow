import type { Metadata } from "next";
import '../josh/page.css';

export const metadata: Metadata = {
  title: "Josh",
};

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-4xl font-bold text-purple-900 animate-text-glow">Joshua Abrenica</h1>
        <h2 className="text-2xl text-yellow-700 mt-2">Scrum Master & Github Master</h2>
      </div>
    </div>
  );
};

export default About;