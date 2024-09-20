import type { Metadata } from "next";
import '../jun/page.css';

export const metadata: Metadata = {
    title: "Jun",
};

const About = () => {
  return (
    <div className="container">
      <h1 className="text-[40pt] font-bold text-[#000000]">Jun Kim(Junyoung Kim)</h1>
      <h2 className="text-[20pt] text-[#FFFFFF]">Backend</h2>
    </div>
  );
};

export default About;
