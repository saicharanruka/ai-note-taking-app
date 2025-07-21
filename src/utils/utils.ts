export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return { errorMessage: error.message };
  } else {
    return { errorMessage: "An unexpected error occurred" };
  }
};
