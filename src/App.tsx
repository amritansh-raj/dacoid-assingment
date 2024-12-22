import { Calendar } from "./components/Calendar";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Calendar />
      </main>
      <Toaster />
    </div>
  );
};

export default App;
