const Button = ({ icon, text, className, onClick }) => {
  return (
    <button
      type="button"
      className={`flex-center border-br border-tl transform cursor-pointer gap-x-2 rounded  border-b-white/30 border-l-secondary-color    border-r-white/30  border-t-secondary-color px-4 py-2 text-sm font-semibold   tracking-wide text-white transition-transform  duration-100 hover:border-l-white/30 hover:border-t-white/30 active:scale-95  ${className ? className : "bg-tertiary-color   hover:bg-primary-color"}`}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="" width={20} height={20} />}
      {text}
    </button>
  );
};

export default Button;
