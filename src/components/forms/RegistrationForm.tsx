import { Formik } from 'formik';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { FormTextField, FormEmailField, FormPasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields, FormHeader, FormLink } from '../../components/form/Form';
import { SubmitButton } from '../../components/button/Button';
import { REGISTER_MUTATION } from '../../graphql/register.mutation';
import { UserSession } from '../../utils/user-session';
import { RouteComponentProps, withRouter } from 'react-router';
import { Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
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

function RegistrationForm({ history }: RouteComponentProps<void>) {
  const { card } = useStyles();

  const register = (trigger: MutationFunction<any, OperationVariables>, registerInput: any) => {
    return trigger({
      variables: {
        credentials: registerInput,
      },
    })
      .then((resp) => {
        const token = resp.data.register.token;
        UserSession.saveToken(token);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className={card} elevation={12}>
      <Mutation mutation={REGISTER_MUTATION}>
        {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => (
          <Formik
            validationSchema={registerValidationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(registerInput) => {
              const { repeatPassword, ...rest } = registerInput;
              register(trigger, rest);
            }}
            initialValues={{
              username: '',
              email: '',
              password: '',
              repeatPassword: '',
            }}
          >
            {(formik) => (
              <FormContainer>
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
            )}
          </Formik>
        )}
      </Mutation>
    </Card>
  );
}

export const RegistrationFormWithRouter = withRouter(RegistrationForm);
