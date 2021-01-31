import { Formik } from 'formik';
import React from 'react';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { View } from '../../templates/View';
import { Component } from '../../templates/Component';
import { EmailField, PasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields } from '../../components/form/Form';
import { FormLink } from '../../components/form/FormLink';
import { SubmitButton } from '../../components/button/Button';
import { LOGIN_MUTATION } from '../../graphql/login.mutation';
import { UserSession } from '../../utils/user-session';
import { RouteComponentProps, withRouter } from 'react-router';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(5)
});

function LoginPage({ history }: RouteComponentProps<void>) {

    const login = (
        trigger: MutationFunction<any, OperationVariables>,
        loginInput: any
    ) => {
        return trigger({ 
            variables: { 
                credentials: loginInput 
            } 
        })
        .then(resp => {
            const token = resp.data.login.token;
            UserSession.saveToken(token);
            history.push("/");
        })
        .catch(err => console.log(err));
    }
    
    return(
        <View>
            <Component>
                <Mutation mutation={LOGIN_MUTATION}>
                    {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => ( 
                        <Formik
                            validationSchema={loginValidationSchema}
                            validateOnBlur={true}
                            validateOnChange={true}
                            onSubmit={loginInput => {
                                login(trigger, loginInput);
                            }}
                            initialValues={{
                                email:'',
                                password: ''
                            }}
                        >
                            { ({ isValid }) => <FormContainer title="Zaloguj się">
                                <FormFields>
                                    <EmailField 
                                        label="Podaj email:"
                                        required={ true }
                                    />
                                    <PasswordField 
                                        label="Podaj hasło:"
                                        required={ true }
                                    />
                                </FormFields>
                                <FormActions>                                    
                                    <SubmitButton disabled={ !isValid } text="Zaloguj się"/>
                                </FormActions>
                                <FormLink pretext="Nie masz jeszcze konta?" text="Zarejestuj się" to="/register"/> 
                            </FormContainer> }
                        </Formik>
                    )} 
                </Mutation>
            </Component>
        </View>
    )
}

export const LoginPageWithRouter = withRouter(LoginPage);