import { InputHTMLAttributes, FC } from 'react';
import { Group, Input, FormInputLabel } from './form-input.style';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      {label && (
        <FormInputLabel
          shrink={Boolean(inputOptions.value && typeof inputOptions.value === 'string' && inputOptions.value.length)}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
export default FormInput;
