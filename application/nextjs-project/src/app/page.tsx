import Image from "next/image";
import houseImage from "./house.png";
import type { Metadata } from "next";
import TaskManagement from "./components/TaskManagement";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-5">
      <div>
        <Image
          src={houseImage}
          alt="A picture of a house"
          sizes="70vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="text-center">
        {/* <h1 className="text-4xl font-bold mb-4">Home</h1> */}
        <p className="text-2xl">Click on "about" above to see more</p>
      </div>
    </div>
  );
}
