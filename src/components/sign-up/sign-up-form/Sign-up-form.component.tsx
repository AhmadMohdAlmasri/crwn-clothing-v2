import { useState, ChangeEvent, FormEvent } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import FormInput from '../../form-input/Form-input.component';
import { SignupContainer } from './sign-up-form.styles';
import Button from '../../button/Button.component';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../../store/user/user.action';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const resetInputFields = () => {
    setInputFields(defultInputFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert('mismatch passport');
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));

      resetInputFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('email in use');
      } else console.log('error', error);
    }
  };

  const defultInputFields = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const [inputFileds, setInputFields] = useState(defultInputFields);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFileds, [name]: value });
  };

  const { displayName, email, password, passwordConfirmation } = inputFileds;

  return (
    <SignupContainer>
      <h2>Do you have an account?</h2>
      <span>Sign up wirh your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          required
          name="displayName"
          type="text"
          value={displayName}
          onChange={onChangeHandler}
        />
        <FormInput label="Email" required name="email" type="email" value={email} onChange={onChangeHandler} />
        <FormInput
          label="Password"
          required
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
        />
        <FormInput
          label="Password confirmation"
          required
          name="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          onChange={onChangeHandler}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUpForm;
