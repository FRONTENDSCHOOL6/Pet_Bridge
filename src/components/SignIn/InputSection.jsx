import { InputField } from './InputField';
import { PropTypes } from 'prop-types';

function InputSection({ formState, handleInput }) {
  return (
    <>
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="이메일을 입력해 주세요"
        value={formState.email}
        onChange={handleInput}
      />
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호를 입력해 주세요"
        value={formState.password}
        onChange={handleInput}
      />
    </>
  );
}

export default InputSection;

InputSection.propTypes = {
  formState: PropTypes.object.isRequired,
  handleInput: PropTypes.number.isRequired,
};
