import type { Metadata } from "next";
import "./styles.css";
import Image from "next/image";
import profileImage from "./catOnComputer.png";

export const metadata: Metadata = {
    title: "Bisum",
};

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-400">
            <div className="text-center neo-box p-6 flex-col space-y-5">
                <Image
                    src={profileImage}
                    alt="Profile image of a cat sitting at a computer."
                    sizes="70vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    className="rounded-[16px]"
                />
                <div>
                    <h1 className="text-4xl font-bold mb-4">Bisum Tiwana</h1>
                    <p className="text-2xl">Team Leader</p>
                </div>
            </div>
        </div>
    );
}
