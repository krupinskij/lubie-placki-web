import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import { SubmitButton } from '../button/SubmitButton';
import { FormTextField, SetField, TripleSetField } from '../form/Field';
import { FormActions, FormContainer, FormFields, FormHeader } from '../form/Form';
import { FormSelect } from '../form/Select';
import { FormDropZone } from '../form/DropZone';

import { CREATE_RECIPE_MUTATION } from '../../graphql/create-recipe.mutation';
import { UPLOAD_PHOTO_MUTATION } from '../../graphql/upload-photo.mutation';
import { ADD_PHOTO_TO_RECIPE_MUTATION } from '../../graphql/add-photo-to-recipe.mutation';

import * as Yup from 'yup';

const useStyles = makeStyles({
  cardStyles: {
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

const typeOptions = [
  {
    value: 'makowiec',
    display: 'Makowiec',
  },
  {
    value: 'piernik',
    display: 'Piernik',
  },
  {
    value: 'sernik',
    display: 'Sernik',
  },
  {
    value: 'swiateczne',
    display: 'Świąteczne',
  },
  {
    value: 'inne',
    display: 'Inne',
  },
];

export function NewRecipeForm() {
  const { cardStyles } = useStyles();
  const history = useHistory();
  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION);
  const [uploadPhoto] = useMutation(UPLOAD_PHOTO_MUTATION);
  const [addPhotoToRecipe] = useMutation(ADD_PHOTO_TO_RECIPE_MUTATION);
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      type: 'inne',
      filename: [],
      ingredients: [],
      directions: [],
      hints: [],
    },
    validationSchema: createRecipeValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (recipeInput) => {
      const { filename, ...recipeData } = recipeInput;
      console.log(filename, recipeData);
      const recipeResponse = await createRecipe({ variables: { credentials: recipeData } });
      const photoResponse = await uploadPhoto({ variables: { file: filename[0] } });

      console.log(recipeResponse, photoResponse);

      const photoInput = {
        photoId: photoResponse?.data?.uploadPhoto?._id,
        recipeId: recipeResponse?.data?.createRecipe?._id,
      };

      await addPhotoToRecipe({ variables: { input: photoInput } });
      console.log('już');
      //history.push('/');
    },
  });

  return (
    <Card className={cardStyles} elevation={12}>
      <FormContainer provider={formik} handleSubmit={formik.handleSubmit}>
        <FormHeader title="Dodaj nowy przepis" />
        <FormFields>
          <FormTextField name="name" label="Nazwa" required={true} />
          <FormTextField name="description" label="Opis" />
          <FormSelect name="type" label="Typ ciasta" options={typeOptions} />
          <Divider />
          <FormDropZone name="filename" label="Dodaj zdjęcie" />
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
          <SubmitButton disabled={!formik.isValid} text="Dodaj przepis" />
        </FormActions>
      </FormContainer>
    </Card>
  );
}
