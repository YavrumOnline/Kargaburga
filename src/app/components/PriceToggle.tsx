import { useState, useEffect, useRef } from 'react';
import { TRANSITIONS } from '@/constants/styles';

interface PriceToggleProps {
  online: string;
  örgün: string;
  textColor: string;
  darkMode?: boolean;
}

const characters = '₺0123456789.';
const labelCharacters = 'abcdefghijklmnopqrstuvwxyzüğöçş';

export function PriceToggle({ online, örgün, textColor, darkMode }: PriceToggleProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [displayText, setDisplayText] = useState(online);
  const [displayLabel, setDisplayLabel] = useState('online');
  const [isScrambling, setIsScrambling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const labelIntervalRef = useRef<number | null>(null);
  const loopTimerRef = useRef<number | null>(null);

  const currentPrice = isOnline ? online : örgün;
  const currentLabel = isOnline ? 'online' : 'örgün';
  
  // Green color based on theme - darker for light mode, lighter for dark mode
  const greenColor = darkMode ? '#10b981' : '#047857';

  // Auto-loop timer
  useEffect(() => {
    if (isHovered) {
      // Clear the timer when hovered
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
        loopTimerRef.current = null;
      }
      return;
    }

    // Start or restart the timer when not hovered
    loopTimerRef.current = window.setInterval(() => {
      setIsOnline(prev => !prev);
      setIsScrambling(true);
    }, 1500);

    return () => {
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
      }
    };
  }, [isHovered]);

  // Scramble animation
  useEffect(() => {
    if (isScrambling) {
      let frame = 0;
      const maxFrames = 20;
      const targetText = currentPrice;

      intervalRef.current = window.setInterval(() => {
        if (frame >= maxFrames) {
          setDisplayText(targetText);
          setIsScrambling(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return;
        }

        const progress = frame / maxFrames;
        let scrambled = '';
        
        for (let i = 0; i < targetText.length; i++) {
          // Don't scramble the "." character
          if (targetText[i] === '.') {
            scrambled += '.';
          } else if (i < targetText.length * progress) {
            scrambled += targetText[i];
          } else {
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            scrambled += randomChar;
          }
        }

        setDisplayText(scrambled);
        frame++;
      }, 20);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isScrambling, currentPrice]);

  // Label scramble animation
  useEffect(() => {
    if (isScrambling) {
      let frame = 0;
      const maxFrames = 20;
      const targetLabel = currentLabel;

      labelIntervalRef.current = window.setInterval(() => {
        if (frame >= maxFrames) {
          setDisplayLabel(targetLabel);
          if (labelIntervalRef.current) {
            clearInterval(labelIntervalRef.current);
          }
          return;
        }

        const progress = frame / maxFrames;
        let scrambled = '';
        
        for (let i = 0; i < targetLabel.length; i++) {
          if (i < targetLabel.length * progress) {
            scrambled += targetLabel[i];
          } else {
            const randomChar = labelCharacters[Math.floor(Math.random() * labelCharacters.length)];
            scrambled += randomChar;
          }
        }

        setDisplayLabel(scrambled);
        frame++;
      }, 20);

      return () => {
        if (labelIntervalRef.current) {
          clearInterval(labelIntervalRef.current);
        }
      };
    }
  }, [isScrambling, currentLabel]);

  const handleToggle = () => {
    // Reset the auto-loop timer when manually clicked
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
    }
    
    setIsOnline(!isOnline);
    setIsScrambling(true);

    // Restart auto-loop after manual click
    loopTimerRef.current = window.setInterval(() => {
      setIsOnline(prev => !prev);
      setIsScrambling(true);
    }, 1500);
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        fontSize: '14px',
        color: isOnline ? greenColor : textColor,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'baseline',
        position: 'relative',
        transition: `${TRANSITIONS.COLOR}, opacity 0.2s ease`,
        textShadow: isOnline ? `0 0 8px ${greenColor}40, 0 0 12px ${greenColor}20` : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.7';
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        setIsHovered(false);
      }}
    >
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{displayText}</span>
      <span
        style={{
          fontSize: '14px',
          opacity: 0.6,
          fontWeight: 500,
          textTransform: 'lowercase',
          position: 'absolute',
          left: '100%',
          marginLeft: '0.5rem',
          whiteSpace: 'nowrap',
        }}
      >
        {displayLabel}
      </span>
    </button>
  );
}