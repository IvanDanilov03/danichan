const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'LoL. Happened something really unexpected :1';
};

export default getErrorMessage;
