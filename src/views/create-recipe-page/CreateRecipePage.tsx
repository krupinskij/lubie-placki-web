import { Formik } from "formik";
import { Mutation, MutationFunction, MutationResult, OperationVariables } from "react-apollo";
import * as Yup from 'yup';
import { SubmitButton } from "../../components/button/Button";
import { TripleSetField, SetField, TextField } from "../../components/form/Field";
import { FormActions, FormContainer, FormFields } from "../../components/form/Form";
import { CREATE_RECIPE_MUTATION } from "../../graphql/create-recipe.mutation";
import { Component } from "../../templates/Component";
import { View } from "../../templates/View";

const createRecipeValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    ingredients: Yup.array().of(
        Yup.object().shape({
            product: Yup.string().required(),
            quantity: Yup.number().required(),
            unit: Yup.string().required()
        })
    ).min(1),
    directions: Yup.array().of(
        Yup.object().shape({
            text: Yup.string().required()
        })
    ).min(1),
    hints: Yup.array().of(
        Yup.object().shape({
            text: Yup.string().required()
        })
    )
});

export function CreateRecipePage() {

    const createRecipe = (
        trigger: MutationFunction<any, OperationVariables>,
        recipeInput: any
    ) => {
        console.log(recipeInput);
        // return trigger({ 
        //     variables: { 
        //         credentials: recipeInput 
        //     } 
        // }).then(resp => console.log(resp)).catch(err => console.log(err));
    }

    return(
        <View>
            <Component>
                <Mutation mutation={CREATE_RECIPE_MUTATION}>
                        {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => ( 
                            <Formik
                                validationSchema={createRecipeValidationSchema}
                                validateOnBlur={true}
                                validateOnChange={true}
                                onSubmit={createRecipeInput => {
                                    createRecipe(trigger, createRecipeInput);
                                }}
                                initialValues={{
                                    name: '',
                                    description: '',
                                    ingredients: [],
                                    directions: [],
                                    hints: []
                                }}
                            >
                                { ({ isValid }) => <FormContainer title="Dodaj nowy przepis">
                                    <FormFields>
                                        <TextField 
                                            name="name" 
                                            placeholder="Podaj nazwę" 
                                            label="Podaj nazwę:"
                                            required={ true }
                                        />
                                        <TextField
                                            name="description"
                                            placeholder="Podaj opis"
                                            label="Podaj opis:"
                                            required={ true }
                                        />
                                        <TripleSetField 
                                            name="ingredients"
                                            label="Podaj składniki:"
                                            placeholder={ ["Produkt", "Ilość", "Jednostka"] }
                                            required={ true }
                                        />
                                        <SetField 
                                            name="directions"
                                            label="Podaj kroki:"
                                            placeholder="Podaj krok"
                                            required={ true }
                                        />
                                        <SetField
                                            name="hints"
                                            label="Podaj wskazówki:"
                                            placeholder="Podaj wskazówkę"
                                        />
                                    </FormFields>
                                    <FormActions>                           
                                        <SubmitButton disabled={ !isValid } text="Dodaj przepis"/>
                                    </FormActions>
                                </FormContainer> } 
                            </Formik>
                        )} 
                    </Mutation>
            </Component>
        </View>
    )

    
}