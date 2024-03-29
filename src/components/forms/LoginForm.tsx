import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';

import { SubmitButton } from '../button/SubmitButton';
import { CardContainer } from '../card/Card';
import { FormActions, FormContainer, FormFields, FormHeader, FormLink } from '../form/Form';
import { FormEmailField, FormPasswordField } from '../form/Field';

import { LOGIN_MUTATION } from '../../graphql/login.mutation';
import { Data } from '../../typings/types';
import { UserSession } from '../../utils/user-session';

import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  password: Yup.string().required('To pole jest wymagane'),
});

export function LoginForm() {
  const [login] = useMutation<Data.LoginData>(LOGIN_MUTATION);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (loginInput) => {
      const { data } = await login({ variables: { credentials: loginInput } });
      if (data) {
        const { token, refreshToken } = data.login;
        UserSession.saveToken(token);
        UserSession.saveRefreshToken(refreshToken);
        window.location.href = '/';
      }
    },
  });

  return (
    <CardContainer>
      <FormContainer provider={formik} handleSubmit={formik.handleSubmit}>
        <FormHeader title="Zaloguj się" />
        <FormFields>
          <FormEmailField name="email" label="Email" required={true} />
          <FormPasswordField name="password" label="Hasło" required={true} />
        </FormFields>
        <FormActions>
          <SubmitButton disabled={!formik.isValid} text="Zaloguj się" />
        </FormActions>
        <FormLink prefix="Nie masz jeszcze konta?" text="Zarejestuj się" to="/register" />
      </FormContainer>
    </CardContainer>
  );
}
