import { Formik } from 'formik';
import { Mutation, MutationFunction, MutationResult, OperationVariables } from 'react-apollo';
import * as Yup from 'yup';
import { FormTextField, SetField, TripleSetField } from '../../components/form/Field';
import { FormActions, FormContainer, FormFields, FormHeader } from '../../components/form/Form';
import { SubmitButton } from '../../components/button/Button';
import { RouteComponentProps, withRouter } from 'react-router';
import { Card, Divider, makeStyles } from '@material-ui/core';
import { CREATE_RECIPE_MUTATION } from '../../graphql/create-recipe.mutation';

const useStyles = makeStyles({
  card: {
    width: 700,
    margin: 20,
    padding: 30,
  },
});

const createRecipeValidationSchema = Yup.object().shape({
  name: Yup.string().required('To pole jest wymagane'),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.string().required('Wypełnij to pole'),
        quantity: Yup.number().required('Wypełnij to pole'),
        unit: Yup.string().required('Wypełnij to pole'),
      }),
    )
    .min(1, 'Dodaj co najmniej jeden składnik'),
  directions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required('Wypełnij to pole'),
      }),
    )
    .min(1, 'Dodaj co najmniej jeden krok'),
  hints: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required('Wypełnij to pole'),
    }),
  ),
});

function NewRecipeForm({ history }: RouteComponentProps<void>) {
  const { card } = useStyles();

  const createRecipe = (trigger: MutationFunction<any, OperationVariables>, recipeInput: any) => {
    return trigger({
      variables: {
        credentials: recipeInput,
      },
    })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  return (
    <Card className={card} elevation={12}>
      <Mutation mutation={CREATE_RECIPE_MUTATION}>
        {(trigger: MutationFunction<any, Record<string, any>>, result: MutationResult<any>) => (
          <Formik
            validationSchema={createRecipeValidationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(createRecipeInput) => {
              createRecipe(trigger, createRecipeInput);
            }}
            initialValues={{
              name: '',
              description: '',
              ingredients: [],
              directions: [],
              hints: [],
            }}
          >
            {({ isValid }) => (
              <FormContainer>
                <FormHeader title="Dodaj nowy przepis" />
                <FormFields>
                  <FormTextField name="name" label="Nazwa" required={true} />
                  <FormTextField name="description" label="Opis" />
                  <Divider />
                  <TripleSetField
                    name="ingredients"
                    label={['Produkt', 'Ilość', 'Jednostka']}
                    title="Składniki: "
                    required={true}
                  />
                  <Divider />
                  <SetField name="directions" label="Krok" title="Opis: " required={true} />
                  <Divider />
                  <SetField name="hints" label="Wskazówka" title="Wskazówki: " />
                </FormFields>
                <FormActions>
                  <SubmitButton disabled={!isValid} text="Dodaj przepis" />
                </FormActions>
              </FormContainer>
            )}
          </Formik>
        )}
      </Mutation>
    </Card>
  );
}

export const NewRecipeFormWithRouter = withRouter(NewRecipeForm);
