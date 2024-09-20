import type { Metadata } from "next";
import '../josh/page.css';

export const metadata: Metadata = {
    title: "Josh",
};

const About = () => {
  return (
    <div className="container">
      <h1 className="text-[2.5rem] font-bold text-[#3e007c]">Joshua Abrenica</h1>
      <h2 className="text-[1.5rem] text-[#97770d]">Scrum Master & Github Master</h2>
    </div>
  );
};

export default About;