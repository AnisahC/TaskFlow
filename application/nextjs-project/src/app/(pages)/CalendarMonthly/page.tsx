import Calendar from "@/components/MonthlyCalendar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Calendar />
    </main>
  );
}
