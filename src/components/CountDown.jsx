import React, { useState, useEffect, useMemo } from "react";

const BirthdayCountdown = () => {
  const [birthDate, setBirthDate] = useState(""); // Store user input
  const [timeLeft, setTimeLeft] = useState(null); // Store countdown result

  // Function to calculate time left
  const calculateTimeLeft = useMemo(() => {
    return (birthDate) => {
      if (!birthDate) return null; // If no date is selected, return null

      const now = new Date();
      const birth = new Date(birthDate);
      let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());

      // ✅ If birthday has already passed this year, move to next year
      if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      // ✅ Handle Leap Year Edge Case (Feb 29)
      const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (birth.getMonth() === 1 && birth.getDate() === 29 && !isLeapYear(nextBirthday.getFullYear())) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }

      // ✅ Calculate time difference
      const timeDiff = nextBirthday - now;

      return {
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
        seconds: Math.floor((timeDiff / 1000) % 60),
        isBirthday: timeDiff <= 0, // ✅ Check if today is the birthday
      };
    };
  }, []);

  useEffect(() => {
    if (!birthDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(birthDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [birthDate, calculateTimeLeft]);

  return (
    <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
      <h2>🎉 Enter Your Birthday 🎂</h2>
      
      {/* User Input Field */}
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid gray",
          marginBottom: "20px"
        }}
      />

      {/* Display Countdown */}
      {timeLeft && (
        timeLeft.isBirthday ? (
          <h1 style={{ color: "green" }}>🎊 Happy Birthday! 🎊</h1>
        ) : (
          <p>
            {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes,{" "}
            {timeLeft.seconds} Seconds
          </p>
        )
      )}
    </div>
  );
};

export default BirthdayCountdown;
