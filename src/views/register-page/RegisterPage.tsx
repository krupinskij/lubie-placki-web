import { Formik } from 'formik';
import React from 'react';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { View } from '../../templates/View';
import { Component } from '../../templates/Component';
import { TextField, EmailField, PasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields } from '../../components/form/Form';
import { FormLink } from '../../components/form/FormLink';
import { SubmitButton } from '../../components/button/Button';
import { REGISTER_MUTATION } from '../../graphql/register.mutation';

const updateSortValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    username: Yup.string().required().min(5),
    password: Yup.string().required().min(5),
    repeatPassword: Yup.string().required().oneOf([Yup.ref('password')])
});

export function RegisterPage() {

    const register = (
        trigger: MutationFunction<any, OperationVariables>,
        registerInput: any
    ) => {
        console.log(registerInput);
        // return trigger({ 
        //     variables: { 
        //         credentials: loginInput 
        //     } 
        // })
        // .then(resp => console.log(resp))
        // .catch(err => console.log(err));
    }
    
    return(
        <View>
            <Component>
                <Mutation mutation={REGISTER_MUTATION}>
                    {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => ( 
                        <Formik
                            validationSchema={updateSortValidationSchema}
                            validateOnBlur={true}
                            validateOnChange={true}
                            onSubmit={registerInput => {
                                register(trigger, registerInput);
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
                                    <SubmitButton disabled={ !isValid} text="Zarejestruj się"/>
                                </FormActions>
                                <FormLink pretext="Masz już konto?" text="Zaloguj się" to="/login"/> 
                            </FormContainer> } 
                        </Formik>
                    )} 
                </Mutation>
            </Component>
        </View>
    )
}