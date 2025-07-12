export const checkEnvVars = (required: string[]): void => {
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`${key} environment variable is missing`);
    }
  }
};

export default checkEnvVars