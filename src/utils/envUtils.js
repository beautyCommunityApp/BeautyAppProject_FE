export const isMockMode = () => {
  return (
    import.meta.env.MODE === "development" &&
    import.meta.env.VITE_API_ACTIVE === "false"
  );
};
