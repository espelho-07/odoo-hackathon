import clsx from 'clsx';

const Badge = ({ children, variant = 'primary', className }) => {
  const variants = {
    primary: "bg-primary-100 text-primary-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    gray: "bg-slate-100 text-slate-700",
  };

  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
