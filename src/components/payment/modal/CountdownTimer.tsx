
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialTime: number; // Time in seconds
  onTimeUp: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialTime, 
  onTimeUp,
  className = ""
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    // Set warning state when less than 30 seconds remain
    if (timeLeft <= 30 && !isWarning) {
      setIsWarning(true);
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp, isWarning]);
  
  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <div className={`flex items-center justify-center ${className} ${isWarning ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
      <Clock className="h-4 w-4 mr-1" />
      <span className="font-mono font-medium">{formattedTime}</span>
    </div>
  );
};

export default CountdownTimer;
