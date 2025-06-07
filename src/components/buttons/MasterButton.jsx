function MasterButton({
  onClick,
  children,
  className = '',
  icon: Icon,
  color = 'primary',
  size = 'base',
}) {
  const baseStyles =
    'btn flex items-center gap-2 font-semibold transition-transform hover:scale-[1.02]';
  const colorClass =
    {
      primary: 'btn-primary text-white',
      success: 'btn-success text-white',
      danger: 'btn-error text-white',
      neutral: 'btn-neutral text-white',
      outline: 'btn-outline',
    }[color] || '';

  const sizeClass =
    {
      sm: 'px-3 py-1 text-sm',
      base: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    }[size] || '';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorClass} ${sizeClass} ${className}`}
    >
      {Icon && <Icon className="text-sm" />}
      {children}
    </button>
  );
}

export default MasterButton;
