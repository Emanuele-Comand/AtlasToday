const Button = ({
  children = "Button",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}) => {
  // Varianti di colore
  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer",
    success:
      "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white cursor-pointer",
    danger:
      "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white cursor-pointer",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white cursor-pointer",
    outline:
      "bg-transparent border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white",
    ghost:
      "bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900",
  };

  // Varianti di dimensione
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const baseClasses =
    "rounded-full transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
