import { CSSProperties, InputHTMLAttributes, useState } from 'react';
import { DARK_MODE, LIGHT_MODE } from '@/constants/colors';
import { getLabelStyle, TRANSITIONS } from '@/constants/styles';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label: string;
  darkMode?: boolean;
}

export function FormField({ label, darkMode, id, ...inputProps }: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '16px', // Minimum 16px to prevent mobile zoom
    color: darkMode ? DARK_MODE.TEXT : LIGHT_MODE.TEXT,
    backgroundColor: darkMode ? DARK_MODE.SECONDARY_BG : LIGHT_MODE.SECONDARY_BG,
    border: `2px solid ${
      isFocused 
        ? (darkMode ? '#606060' : '#3A3A3A')
        : (darkMode ? DARK_MODE.SECONDARY_BORDER : LIGHT_MODE.SECONDARY_BORDER)
    }`,
    borderRadius: '0.5rem',
    outline: 'none',
    transition: TRANSITIONS.ALL_THEME,
    userSelect: 'text',
    WebkitUserSelect: 'text',
  };

  const labelStyle = getLabelStyle(darkMode ? DARK_MODE.TEXT : LIGHT_MODE.TEXT);

  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        style={inputStyle}
        onFocus={(e) => {
          setIsFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          inputProps.onBlur?.(e);
        }}
      />
    </div>
  );
}