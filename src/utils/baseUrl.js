export const getBaseUrl = () => {
  return `${import.meta.env.VITE_BASE_URL}/api/v1`;
};

export const getImageUrl = () => {
  return import.meta.env.VITE_BASE_URL;
};
