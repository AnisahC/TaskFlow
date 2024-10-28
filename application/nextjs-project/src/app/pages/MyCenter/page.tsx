import React from "react";
import WelcomeCard from "../../components/WelcomeDashboard";

const userName = "User";
const userId = "123456789";
const account = "qdnqlkj@gmail.com";

const OverviewPage: React.FC = () => {
  return (
    <div>
      <h1 className="pt-0 text-4xl font-bold leading-tight text-stone-900 mb-6">
        Welcome, {userName}!
      </h1>
      <div className="flex gap-10 items-start leading-tight">
        <section className="flex flex-col whitespace-nowrap">
          <h2 className="text-xs text-stone-900 text-opacity-40">USER ID</h2>
          <div className="flex gap-1 items-center mt-1 text-base font-medium text-stone-900">
            {userId}

            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ef411e77bcdd254612a05aa8c0b07fdb4019faa05c4a57e8129625c2a5a6596?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-[1.07]"
            />
          </div>
        </section>
        <section className="flex flex-col whitespace-nowrap">
          <h2 className="text-xs text-stone-900 text-opacity-40">Account</h2>
          <div className="flex gap-1 items-center mt-1 text-base font-medium text-stone-900">
            {account}
          </div>
        </section>
      </div>
      <WelcomeCard />
    </div>
  );
};

export default OverviewPage;
