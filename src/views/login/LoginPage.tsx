import { Formik } from 'formik';
import React from 'react';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { View } from '../../components/page/View';
import { Component } from '../../components/page/Component';
import { EmailField, PasswordField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields } from '../../components/form/Form';
import { FormLink } from '../../components/form/FormLink';
import { SubmitButton } from '../../components/button/Button';
import { REGISTER } from '../../graphql/register.mutation';


const updateSortValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required()
});


export class LoginPage extends React.Component {
    
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
                                    this.login(trigger, loginInput);
                                }}
                                initialValues={{
                                    email:'',
                                    password: ''
                                }}
                            >
                                <FormContainer title="Zaloguj się">
                                    <FormFields>
                                        <EmailField label="Podaj email:"/>
                                        <PasswordField label="Podaj hasło:"/>
                                    </FormFields>
                                    <FormActions>                                    
                                        <SubmitButton text="Zaloguj się"/>
                                    </FormActions>
                                    <FormLink pretext="Nie masz jeszcze konta?" text="Zarejestuj się" to="/register"/> 
                                </FormContainer>
                            </Formik>
                        )} 
                    </Mutation>
                </Component>
            </View>
        )
    }

    private login = (
        trigger: MutationFunction<any, OperationVariables>,
        loginInput: any
    ) => {
        console.log(loginInput);
        return trigger({ variables: { credentials: loginInput } }).then(resp => console.log(resp)).catch(err => console.log(err));
    }
}