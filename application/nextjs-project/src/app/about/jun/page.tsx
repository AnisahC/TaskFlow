import type { Metadata } from "next";
import '../jun/page.css';

export const metadata: Metadata = {
    title: "Jun",
};

const About = () => {
  return (
    <div className="container">
      <h1>Jun Kim(Junyoung Kim)</h1>
      <h2>Backend</h2>
    </div>
  );
};

export default About;
