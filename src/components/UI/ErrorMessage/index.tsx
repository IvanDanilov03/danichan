import React from 'react';
import getErrorMessage from '../../../utils/getErrorMessage';

export interface ErrorProps {
  error: unknown;
}

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => {
  const errorMessage = getErrorMessage(error);

  return (
    <p className="text-red-500">
      <p>Oops :c</p>
      <p>{errorMessage}</p>
    </p>
  );
};

export default ErrorMessage;
