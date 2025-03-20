import React, { useState, useEffect, useMemo } from "react";

const BirthdayCountdown = ({ birthMonth, birthDay }) => {
  // Function to calculate time left until the next birthday
  const calculateTimeLeft = useMemo(() => {
    return () => {
      const now = new Date();
      let nextBirthday = new Date(now.getFullYear(), birthMonth - 1, birthDay);

      // ✅ Check if birthday has passed this year → Move to next year
      if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      // ✅ Handle Leap Year Edge Case (Feb 29)
      const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (birthMonth === 2 && birthDay === 29 && !isLeapYear(nextBirthday.getFullYear())) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }

      // ✅ Calculate remaining time in milliseconds
      const timeDiff = nextBirthday - now;

      return {
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
        seconds: Math.floor((timeDiff / 1000) % 60),
        isBirthday: timeDiff <= 0, // ✅ Check if today is the birthday
      };
    };
  }, [birthMonth, birthDay]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
      <h2>🎉 Birthday Countdown 🎂</h2>
      {timeLeft.isBirthday ? (
        <h1 style={{ color: "green" }}>🎊 Happy Birthday! 🎊</h1>
      ) : (
        <p>
          {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes,{" "}
          {timeLeft.seconds} Seconds
        </p>
      )}
    </div>
  );
};

export default BirthdayCountdown;
