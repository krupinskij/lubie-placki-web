import { Formik } from 'formik';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/button/Button';
import { TripleSetField, SetField, FormTextField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields, FormHeader } from '../../components/form/Form';
import { NewRecipeFormWithRouter } from '../../components/forms/NewRecipeForm';
import { CREATE_RECIPE_MUTATION } from '../../graphql/create-recipe.mutation';
import { Component } from '../../templates/Component';
import { View } from '../../templates/View';

const createRecipeValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.string().required(),
        quantity: Yup.number().required(),
        unit: Yup.string().required(),
      }),
    )
    .min(1),
  directions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required(),
      }),
    )
    .min(1),
  hints: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required(),
    }),
  ),
});

export function CreateRecipePage() {
  return (
    <View>
      <NewRecipeFormWithRouter />
    </View>
  );
}
