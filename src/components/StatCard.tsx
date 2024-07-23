import { useEffect, useState } from 'react';

interface StatCardProps {
  label: string;
  max: number;
  duration: number;
}

const StatCard = ({ label, max, duration }: StatCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (currentValue < max) {
      const interval = setInterval(() => {
        const newValue = Math.min(currentValue + 1, max);
        setCurrentValue(newValue);

        if (newValue === max) {
          clearInterval(interval);
        }
      }, duration);

      return () => clearInterval(interval);
    }
  }, [currentValue, max, duration]);

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="text-2xl md:text-5xl text-amber-500">{currentValue}+</div>
      <div className="text-sm md:text-base">{label}</div>
    </div>
  );
}

export default StatCard;
