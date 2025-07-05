const Container = ({ children, noBackground = false }) => {
  const backgroundClasses = noBackground
    ? ""
    : "bg-white dark:!bg-transparent transition-colors duration-200";

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${backgroundClasses}`}
    >
      {children}
    </div>
  );
};

export default Container;
