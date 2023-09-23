export default function Button({
  onClick,
  border,
  text,
  bgColor,
  hoverColor,
  textColor = 'text-white',
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${textColor} ${border} ${bgColor} hover:${hoverColor} rounded transition-[0.3s]`}
    >
      {text}
    </button>
  );
}
