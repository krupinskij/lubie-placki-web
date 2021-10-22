import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';

import { SubmitButton } from '../button/SubmitButton';
import { CardContainer } from '../card/Card';
import { FormTextField, FormEmailField, FormPasswordField } from '../form/Field';
import { FormActions, FormContainer, FormFields, FormHeader, FormLink } from '../form/Form';

import { REGISTER_MUTATION } from '../../graphql/register.mutation';
import { Data } from '../../typings/types';
import { UserSession } from '../../utils/user-session';

import * as Yup from 'yup';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  username: Yup.string().required('To pole jest wymagane').min(5, 'Nazwa użytkownika musi mieć co najmniej 5 znaków'),
  password: Yup.string().required('To pole jest wymagane').min(5, 'Hasło musi mieć co najmniej 5 znaków'),
  repeatPassword: Yup.string()
    .required('To pole jest wymagane')
    .oneOf([Yup.ref('password')], 'Hasła nie pasują do siebie'),
});

export function RegistrationForm() {
  const [register] = useMutation<Data.RegisterData>(REGISTER_MUTATION);
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: registerValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (registerInput) => {
      const { repeatPassword, ...credentials } = registerInput;
      const { data } = await register({ variables: { credentials: credentials } });
      if (data) {
        const { token, refreshToken } = data.register;
        UserSession.saveToken(token);
        UserSession.saveRefreshToken(refreshToken);
        window.location.href = '/';
      }
    },
  });

  return (
    <CardContainer>
      <FormContainer provider={formik} handleSubmit={formik.handleSubmit}>
        <FormHeader title="Zarejestruj się" />
        <FormFields>
          <FormTextField name="username" label="Nazwa użytkownika" required={true} />
          <FormEmailField name="email" label="Email" required={true} />
          <FormPasswordField name="password" label="Hasło" required={true} />
          <FormPasswordField name="repeatPassword" label="Powtórz hasło" required={true} />
        </FormFields>
        <FormActions>
          <SubmitButton disabled={!formik.isValid} text="Zarejestruj się" />
        </FormActions>
        <FormLink prefix="Masz już konto?" text="Zaloguj się" to="/login" />
      </FormContainer>
    </CardContainer>
  );
}
