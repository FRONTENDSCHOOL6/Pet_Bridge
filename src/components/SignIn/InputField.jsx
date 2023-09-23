import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

export function InputField({ type, name, id, placeholder, value, onChange }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={id} className="text-slate-900">
        {name === 'email' ? '이메일' : name === 'password' ? '비밀번호' : ''}
      </label>
      <input
        type={type === 'password' && isPasswordHidden ? 'password' : 'text'}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        className="border border-slate-300 p-2 rounded-md focus:ring-slate-500 focus:ring-opacity-50 focus:border-slate-500 focus:outline-none w-[300px]"
      />
      {type === 'password' && (
        <FontAwesomeIcon
          icon={isPasswordHidden ? faEyeSlash : faEye}
          onClick={togglePasswordHidden}
          className="cursor-pointer absolute right-[10px] top-[40px] text-gray-500"
        />
      )}
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.object.isRequired,
  name: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  placeholder: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.number.isRequired,
};
