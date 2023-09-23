export default function Input({ name, value, onChange, readOnly = false }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className="border border-gray-300 p-2 w-[10rem] rounded-md"
    />
  );
}
