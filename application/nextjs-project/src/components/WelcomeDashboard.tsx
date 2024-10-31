import React from "react";
interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const features = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3a2deedd1f4bd2a42ac0dd50feb45fd8de4a83d12aba8402d322c0b44fcbe37a?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75",
    title: "Create a Task and Do it !",
    description: "New to TaskFlow? Easily set your Task by click the + button",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2d731bd1f701a81e538e4e3578d810520638ecc0b2462c01db934b11544989b1?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75",
    title: "Get points after finishing every Task",
    description: "Feeling unmotivated to complete tasks? Try our point system!",
  },
];
const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  title,
  description,
}) => (
  <div className="flex gap-6 items-center">
    <img
      loading="lazy"
      src={imageSrc}
      alt={title}
      className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square rounded-[1000px]"
    />
    <div className="flex flex-col self-stretch my-auto max-md:max-w-full">
      <div className="flex flex-col max-md:max-w-full">
        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="mt-2 text-sm text-stone-900 text-opacity-40 max-md:max-w-full">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const DashboardWelcome: React.FC = () => {
  return (
    <section className="mt-10 flex flex-col max-md:mt-10 ">
      <div className="flex flex-col mx-5">
        <article className=" flex flex-col justify-center bg-gradient-to-r from-green-200 to-green-100 p-px rounded-2xl max-md:max-w-full pt-10">
          <div className="flex overflow-hidden flex-col justify-center pr-10 pb-10 pl-10 rounded-2xl max-md:max-w-full">
            <h2 className=" text-xl font-bold text-stone-900 max-md:mt-10">
              Get Started with Your First Task!
            </h2>
            <p className=" text-sm text-stone-900 text-opacity-40 max-md:mt-10 mb-8">
              Complete your first deposit and get 10 points!
            </p>
            <div className="flex flex-col items-start max-w-full">
              <div className="flex flex-col w-full  max-md:pr-5 max-md:max-w-full">
                {features.map((feature, index) => (
                  <div key={index} className={index > 0 ? "mt-10" : ""}>
                    <FeatureCard {...feature} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
export default DashboardWelcome;
