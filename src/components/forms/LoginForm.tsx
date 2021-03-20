import { Formik } from 'formik';
import React from 'react';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { FormEmailField, FormPasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields, FormHeader, FormLink } from '../../components/form/Form';
import { SubmitButton } from '../../components/button/Button';
import { LOGIN_MUTATION } from '../../graphql/login.mutation';
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

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('To pole jest wymagane').email('Niepoprawny format'),
  password: Yup.string().required('To pole jest wymagane'),
});

function LoginForm({ history }: RouteComponentProps<void>) {
  const { card } = useStyles();

  const login = (trigger: MutationFunction<any, OperationVariables>, loginInput: any) => {
    return trigger({
      variables: {
        credentials: loginInput,
      },
    })
      .then((resp) => {
        const token = resp.data.login.token;
        UserSession.saveToken(token);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className={card} elevation={12}>
      <Mutation mutation={LOGIN_MUTATION}>
        {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => (
          <Formik
            validationSchema={loginValidationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(loginInput) => {
              login(trigger, loginInput);
            }}
            initialValues={{
              email: '',
              password: '',
            }}
          >
            {({ isValid }) => (
              <FormContainer>
                <FormHeader title="Zaloguj się" />
                <FormFields>
                  <FormEmailField name="email" label="Email" required={true} />
                  <FormPasswordField name="password" label="Hasło" required={true} />
                </FormFields>
                <FormActions>
                  <SubmitButton disabled={!isValid} text="Zaloguj się" />
                </FormActions>
                <FormLink prefix="Nie masz jeszcze konta?" text="Zarejestuj się" to="/register" />
              </FormContainer>
            )}
          </Formik>
        )}
      </Mutation>
    </Card>
  );
}

export const LoginFormWithRouter = withRouter(LoginForm);
