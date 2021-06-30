import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { SubmitButton } from '../button/SubmitButton';
import { FormTextField, FormEmailField, FormPasswordField } from '../form/Field';
import { FormActions, FormContainer, FormFields, FormHeader, FormLink } from '../form/Form';

import { REGISTER_MUTATION } from '../../graphql/register.mutation';
import { UserSession } from '../../utils/user-session';

import * as Yup from 'yup';

const useStyles = makeStyles({
  cardStyles: {
    width: 700,
    margin: 20,
    padding: 30,
  },
});

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  username: Yup.string().required('To pole jest wymagane').min(5, 'Nazwa użytkownika musi mieć co najmniej 5 znaków'),
  password: Yup.string().required('To pole jest wymagane').min(5, 'Hasło musi mieć co najmniej 5 znaków'),
  repeatPassword: Yup.string()
    .required('To pole jest wymagane')
    .oneOf([Yup.ref('password')], 'Hasła nie pasują do siebie'),
});

export function RegistrationForm() {
  const { cardStyles } = useStyles();
  const history = useHistory();
  const [register] = useMutation(REGISTER_MUTATION);
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
      const resp = await register({ variables: { credentials: credentials } });
      const token = resp.data.login.token;
      UserSession.saveToken(token);
      history.push('/');
    },
  });

  return (
    <Card className={cardStyles} elevation={12}>
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
    </Card>
  );
}
