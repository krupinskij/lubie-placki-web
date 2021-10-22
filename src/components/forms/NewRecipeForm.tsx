import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router';

import Divider from '@material-ui/core/Divider';

import { SubmitButton } from '../button/SubmitButton';
import { CardContainer } from '../card/Card';
import { FormTextField, SetField, TripleSetField } from '../form/Field';
import { FormActions, FormContainer, FormFields, FormHeader } from '../form/Form';
import { FormSelect } from '../form/Select';
import { FormDropZone } from '../form/DropZone';

import { CREATE_RECIPE_MUTATION } from '../../graphql/create-recipe.mutation';
import { UPLOAD_PHOTO_MUTATION } from '../../graphql/upload-photo.mutation';
import { ADD_PHOTO_TO_RECIPE_MUTATION } from '../../graphql/add-photo-to-recipe.mutation';

import { Data } from '../../typings/types';
import * as Yup from 'yup';

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
  const history = useHistory();
  const [createRecipe] = useMutation<Data.CreateRecipeData>(CREATE_RECIPE_MUTATION);
  const [uploadPhoto] = useMutation<Data.UploadPhotoData>(UPLOAD_PHOTO_MUTATION);
  const [addPhotoToRecipe] = useMutation<Data.AddPhotoToRecipeData>(ADD_PHOTO_TO_RECIPE_MUTATION);
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
      const { data: createRecipeData } = await createRecipe({ variables: { credentials: recipeData } });
      if (!!filename.length) {
        const { data: uploadPhotoData } = await uploadPhoto({ variables: { file: filename[0] } });

        const photoInput = {
          photoId: uploadPhotoData?.uploadPhoto?._id,
          recipeId: createRecipeData?.createRecipe?._id,
        };

        await addPhotoToRecipe({ variables: { input: photoInput } });
      }
      history.push('/');
    },
  });

  return (
    <CardContainer>
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
    </CardContainer>
  );
}
