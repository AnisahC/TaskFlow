import React, { useEffect, useState } from "react";

const Quotes: React.FC = () => {
  const quotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
"The key to success is to start before you are ready.",
"A goal without a plan is just a wish.",
"Don’t watch the clock; do what it does. Keep going.",
"Your future is created by what you do today, not tomorrow.",
"The way to get started is to quit talking and begin doing.",
"Focus on being productive instead of busy.",
"Great things are not done by impulse, but by a series of small things brought together.",
"Discipline is the bridge between goals and accomplishment.",
"It’s not about having time; it’s about making time.",
"The secret of getting ahead is getting started.",
"Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
"You don’t have to be great to start, but you have to start to be great.",
"Work hard in silence, let your success be your noise.",
"Don’t wait for the right opportunity, create it.",
"Set your goals high, and don’t stop until you get there.",
"Do something today that your future self will thank you for.",
"Every task you complete brings you one step closer to your goal.",
"The best time to start is always now.",
"Success doesn’t come from what you do occasionally; it comes from what you do consistently."

  ];

  const [randomQuote, setRandomQuote] = useState<string>("");

  useEffect(() => {
    // Select a random quote when the component mounts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="flex max-w-[408px] mr-6 items-center px-10 py-6 w-full bg-green-50 rounded-2xl border border-solid border-green-300 min-h-[150px] max-md:px-5 shadow-md">
      <div className="flex flex-col w-full">

        <p className="text-center text-green-700 text-sm italic">"{randomQuote}"</p>
      </div>
    </div>
  );
};

export default Quotes;