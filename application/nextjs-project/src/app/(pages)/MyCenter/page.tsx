import React from "react";
import WelcomeCard from "@/components/WelcomeDashboard";

const userName = "User";
const showId = "123456789";
const userId = "67380aa82f7c752dc3392ecf";
const account = "qdnqlkj@gmail.com";

const OverviewPage: React.FC = () => {
  return (
    <div className="p-6 bg-green-50 rounded-lg shadow-md">
      <h1 className="pt-0 text-4xl font-bold leading-tight text-black-900 mb-6">
        Welcome, {userName}!
      </h1>
      <div className="flex gap-10 items-start leading-tight">
        <section className="flex flex-col whitespace-nowrap">
          <h2 className="text-xs text-blue-700">USER ID</h2>
          <div className="flex gap-1 items-center mt-1 text-base font-medium text-blue-900">
            {showId}
            <img
              loading="lazy"
              src="https://example.com/user_icon.png"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-[1.07]"
            />
          </div>
        </section>
        <section className="flex flex-col whitespace-nowrap">
          <h2 className="text-xs text-blue-700">Account</h2>
          <div className="flex gap-1 items-center mt-1 text-base font-medium text-blue-900">
            {account}
          </div>
        </section>
      </div>
      <div className="mt-10">
        <WelcomeCard />
      </div>
    </div>
  );
};

export default OverviewPage;
