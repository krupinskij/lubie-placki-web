import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { SubmitButton } from '../button/SubmitButton';
import { FormDropZone } from '../form/DropZone';
import { FormActions, FormContainer, FormFields, FormHeader } from '../form/Form';

import { ADD_AVATAR_TO_USER_MUTATION } from '../../graphql/add-avatar-to-user.mutation';
import { UPLOAD_PHOTO_MUTATION } from '../../graphql/upload-photo.mutation';

import * as Yup from 'yup';

const useStyles = makeStyles({
  card: {
    width: 700,
    margin: 20,
    padding: 30,
  },
});

const editAvatarValidationSchema = Yup.object().shape({});

export function EditAvatarForm() {
  const styles = useStyles();

  const [uploadPhoto] = useMutation(UPLOAD_PHOTO_MUTATION);
  const [addAvatarToUser] = useMutation(ADD_AVATAR_TO_USER_MUTATION);

  const formik = useFormik({
    initialValues: {
      filename: [],
    },
    validationSchema: editAvatarValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async ({ filename }) => {
      const avatarResponse = await uploadPhoto({ variables: { file: filename[0] } });

      const avatarId = avatarResponse?.data?.uploadPhoto?._id;
      await addAvatarToUser({ variables: { avatarInput: { avatarId } } });
    },
  });

  return (
    <Card className={styles.card} elevation={12}>
      <FormContainer provider={formik} handleSubmit={formik.handleSubmit}>
        <FormHeader title="Edytuj swoje zdjęcie" />
        <FormFields>
          <FormDropZone name="filename" label="Wgraj nowe zdjęcie" />
        </FormFields>
        <FormActions>
          <SubmitButton disabled={!formik.isValid} text="Wgraj" />
        </FormActions>
      </FormContainer>
    </Card>
  );
}
