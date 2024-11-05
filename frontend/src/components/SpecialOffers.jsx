import  { useState, useEffect } from 'react';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-yellow-100 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Deals of the Day</h2>
      <p className="text-lg mb-2">Limited time offers - Grab them before they’re gone!</p>
      <div className="text-2xl font-mono mb-4">{formatTime(timeLeft)}</div>
      <button className="bg-red-600 text-white py-2 px-6 rounded shadow-lg hover:bg-red-700 transition">
        View All Deals
      </button>
    </section>
  );
};

export default SpecialOffers;
