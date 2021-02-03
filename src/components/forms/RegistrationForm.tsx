import React from 'react';
import { Formik } from 'formik';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';

import { SubmitButton } from '../../components/button/Button';
import { TextField, EmailField, PasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields } from '../../components/form/Form';
import { FormLink } from '../../components/form/FormLink';

import { REGISTER_MUTATION } from '../../graphql/register.mutation';
import { UserSession } from '../../utils/user-session';

import * as Yup from 'yup';

const registerValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    username: Yup.string().required().min(5),
    password: Yup.string().required().min(5),
    repeatPassword: Yup.string().required().oneOf([Yup.ref('password')])
});

function RegistrationForm({ history }: RouteComponentProps<void>) {

    const register = (
        trigger: MutationFunction<any, OperationVariables>,
        registerInput: any
    ) => {
        return trigger({ 
            variables: { 
                credentials: registerInput 
            } 
        })
        .then(resp => {
            const token = resp.data.register.token;
            UserSession.saveToken(token);
            history.push("/");
        })
        .catch(err => console.log(err));
    }
    
    return(
        <Mutation mutation={REGISTER_MUTATION}>
            {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => ( 
                <Formik
                    validationSchema={registerValidationSchema}
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={registerInput => {
                        const { repeatPassword, ...rest } = registerInput;
                        register(trigger, rest);
                    }}
                    initialValues={{
                        username: '',
                        email:'',
                        password: '',
                        repeatPassword: ''
                    }}
                >
                    { ({ isValid }) => <FormContainer title="Zarejestruj się">
                        <FormFields>
                            <TextField 
                                label="Podaj nazwę użytkownika:" 
                                name="username" 
                                placeholder="Nazwa użytkownika"
                                required={ true }
                            />
                            <EmailField 
                                label="Podaj email:"
                                required={ true }
                            />
                            <PasswordField 
                                label="Podaj hasło:" 
                                required={ true }
                            />
                            <PasswordField 
                                label="Powtórz hasło:" 
                                name="repeatPassword" 
                                placeholder="Powtórz hasło"
                                required={ true }
                            />
                        </FormFields>
                        <FormActions>
                            <SubmitButton disabled={ !isValid } text="Zarejestruj się"/>
                        </FormActions>
                        <FormLink pretext="Masz już konto?" text="Zaloguj się" to="/login"/> 
                    </FormContainer> } 
                </Formik>
            )} 
        </Mutation>
    )
}

export const RegistrationFormWithRouter = withRouter(RegistrationForm);