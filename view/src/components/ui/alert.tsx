import React from 'react';
import '../../Style/Alert.css'; // Assuming you have a separate CSS file for styling alerts

interface AlertProps {
  className?: string;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ className = '', children }) => {
  return (
    <div className={`alert-container ${className}`}>
      {children}
    </div>
  );
};

interface AlertTitleProps {
  children: React.ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => {
  return (
    <h4 className="alert-title">
      {children}
    </h4>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
  return (
    <p className="alert-description">
      {children}
    </p>
  );
};
