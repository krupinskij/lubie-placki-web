import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';

import { SubmitButton } from '../button/SubmitButton';
import { CardContainer } from '../card/Card';
import { FormDropZone } from '../form/DropZone';
import { FormActions, FormContainer, FormFields, FormHeader } from '../form/Form';

import { ADD_AVATAR_TO_USER_MUTATION } from '../../graphql/add-avatar-to-user.mutation';
import { UPLOAD_PHOTO_MUTATION } from '../../graphql/upload-photo.mutation';

import * as Yup from 'yup';
import { Data } from '../../typings/types';

const editAvatarValidationSchema = Yup.object().shape({});

export function EditAvatarForm() {
  const [uploadPhoto] = useMutation<Data.UploadPhotoData>(UPLOAD_PHOTO_MUTATION);
  const [addAvatarToUser] = useMutation<Data.AddAvatarToUserData>(ADD_AVATAR_TO_USER_MUTATION);

  const formik = useFormik({
    initialValues: {
      filename: [],
    },
    validationSchema: editAvatarValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async ({ filename }) => {
      const { data: avatarResponseData } = await uploadPhoto({ variables: { file: filename[0] } });

      const avatarId = avatarResponseData?.uploadPhoto?._id;
      await addAvatarToUser({ variables: { avatarInput: { avatarId } } });
    },
  });

  return (
    <CardContainer>
      <FormContainer provider={formik} handleSubmit={formik.handleSubmit}>
        <FormHeader title="Edytuj swoje zdjęcie" />
        <FormFields>
          <FormDropZone name="filename" label="Wgraj nowe zdjęcie" />
        </FormFields>
        <FormActions>
          <SubmitButton disabled={!formik.isValid} text="Wgraj" />
        </FormActions>
      </FormContainer>
    </CardContainer>
  );
}
