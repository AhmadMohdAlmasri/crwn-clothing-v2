import { useState, FormEvent, ChangeEvent } from 'react';

import FormInput from '../../form-input/Form-input.component';
import { ButtonContainer, SignupContainer } from './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../../button/Button.component';
import { useDispatch } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../../store/user/user.action';

const SignInForm = () => {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };
  const resetInputFields = () => {
    setInputFields(defultInputFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      resetInputFields();
    } catch (error) {
      console.log(error);
      // switch ((error as AuthError).code){
      //   case AuthErrorCodes.INVALID_PASSWORD:
      //     alert('Incorrect password');
      //     break;
      //   case 'auth/user-not-found':
      //     alert('No such user');
      //     break;
      //   default:
      //     console.log(error);
      // }

      // if (error.code === '') {
      //   alert('Incorrect password');
      // }
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

  const { email, password } = inputFileds;

  return (
    <SignupContainer>
      <h2>Already have an acount?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" required name="email" type="email" value={email} onChange={onChangeHandler} />
        <FormInput
          label="Password"
          required
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
        />

        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignupContainer>
  );
};

export default SignInForm;
