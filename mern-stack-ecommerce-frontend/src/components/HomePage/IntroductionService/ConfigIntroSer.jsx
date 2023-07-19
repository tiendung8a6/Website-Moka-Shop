import React, { useEffect, useState } from 'react';

const ConfigIntroSer = (props) => {
  const { label, number, duration } = props.data;
  const [count, setCount] = useState("0");

  useEffect(() => {
    let start = 0;
    const end = parseInt(number.substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [number, duration]);

  return (
    <div className="Count">
      <h3>
        <p className='text-center text-[50px] font-semibold text-[#1a3760]'> {count}</p>
        <div className='text-center'>{label}</div>
      </h3>
    </div>
  );
};

export default ConfigIntroSer;
