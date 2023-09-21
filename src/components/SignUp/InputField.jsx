import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Message({ text, isValid }) {
  if (!text || text === '') {
    return null;
  }

  const messageText = isValid ? (
    <span className="text-green-600 text-xs">{text}</span>
  ) : (
    <span className="text-red-500 text-xs">{text}</span>
  );

  return <div className="message">{messageText}</div>;
}

export default function InputField({
  name,
  label,
  defaultValue,
  placeholder,
  type,
  onChange,
  isValid,
  passMessage,
  failMessage,
  isPasswordHidden = false,
  togglePasswordHidden = () => {},
}) {
  const hasValue =
    defaultValue !== undefined && defaultValue !== null && defaultValue !== '';

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={name} className="text-slate-900">
        {label}
      </label>
      <input
        type={type === 'password' && isPasswordHidden ? 'password' : 'text'}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
      />
      {type === 'password' && (
        <FontAwesomeIcon
          icon={isPasswordHidden ? faEyeSlash : faEye}
          onClick={togglePasswordHidden}
          className="cursor-pointer absolute right-[10px] top-[40px] text-gray-500"
        />
      )}
      {hasValue && ( // 입력값이 있을 때만 메시지 표시
        <Message text={isValid ? passMessage : failMessage} isValid={isValid} />
      )}
    </div>
  );
}
