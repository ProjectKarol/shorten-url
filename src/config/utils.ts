export const createRequiredStringFormat = (errorName: string) => (str: string): void => {
  if (!str) {
    throw new Error(`${errorName} required`);
  }
};
