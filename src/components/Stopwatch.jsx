import { useState, useEffect, useRef } from "react";
import React from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(null);

  // Format time into HH:MM:SS:MS
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return (
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}.` +
      `${ms.toString().padStart(2, "0")}`
    );
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        {/* Time Display */}
        <div className="text-center mb-6">
          <div className="font-mono text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
            {formatTime(time)}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white font-semibold transition-colors ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? "Stop" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
