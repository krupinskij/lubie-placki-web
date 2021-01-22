import { Formik } from 'formik';
import React from 'react';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { View } from '../../components/page/View';
import { Component } from '../../components/page/Component';
import { TextField, EmailField, PasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields } from '../../components/form/Form';
import { FormLink } from '../../components/form/FormLink';
import { SubmitButton } from '../../components/button/Button';
import { REGISTER } from '../../graphql/register.mutation';

const updateSortValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    repeatPassword: Yup.string().required("required")
});

export class RegisterPage extends React.Component {
    
    render() {
        return(
            <View>
                <Component>
                    <Mutation mutation={REGISTER}>
                        {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => ( 
                            <Formik
                                validationSchema={updateSortValidationSchema}
                                validateOnBlur={false}
                                validateOnChange={false}
                                onSubmit={loginInput => {
                                    this.register(trigger, loginInput);
                                }}
                                initialValues={{
                                    username: '',
                                    email:'',
                                    password: '',
                                    repeatPassword: '',
                                    avatar: ''
                                }}
                            >
                                <FormContainer title="Zarejestruj się">
                                    <FormFields>
                                        <TextField label="Podaj nazwę użytkownika:" name="username" placeholder="Nazwa użytkownika"/>
                                        <EmailField label="Podaj email:"/>
                                        <PasswordField label="Podaj hasło:"/>
                                        <PasswordField label="Powtórz hasło:" name="repeatPassword" placeholder="Powtórz hasło"/>
                                    </FormFields>
                                    <FormActions>
                                        <SubmitButton text="Zarejestruj się"/>
                                    </FormActions>
                                    <FormLink pretext="Masz już konto?" text="Zaloguj się" to="/login"/> 
                                </FormContainer>
                            </Formik>
                        )} 
                    </Mutation>
                </Component>
            </View>
        )
    }

    private register = (
        trigger: MutationFunction<any, OperationVariables>,
        loginInput: any
    ) => {
        console.log(loginInput);
        return trigger({ variables: { credentials: loginInput } }).then(resp => console.log(resp)).catch(err => console.log(err));
    }
}