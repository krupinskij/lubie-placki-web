import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router';

import { SubmitButton } from '../button/SubmitButton';
import { CardContainer } from '../card/Card';
import { FormTextField } from '../form/Field';
import { FormActions, FormContainer, FormFields, FormHeader } from '../form/Form';

import { EDIT_USER_MUTATION } from '../../graphql/edit-user.mutation';

import * as Yup from 'yup';
import { Data } from '../../typings/types';

const editProfileValidationSchema = Yup.object().shape({
  username: Yup.string().required('To pole jest wymagane').min(5, 'Nazwa użytkownika musi mieć co najmniej 5 znaków'),
});

interface EditProfileFormProps {
  user: {
    username: string;
    bio?: string;
  };
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const history = useHistory();

  const [editUser] = useMutation<Data.EditUserData>(EDIT_USER_MUTATION);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      bio: user.bio,
    },
    validationSchema: editProfileValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (editUserInput) => {
      await editUser({ variables: { editUserInput } });
      history.push('/');
    },
  });

  return (
    <CardContainer>
      <FormContainer provider={formik} handleSubmit={formik.handleSubmit}>
        <FormHeader title="Edytuj swoje dane" />
        <FormFields>
          <FormTextField name="username" label="Nazwa użytkownika" required={true} />
          <FormTextField name="bio" label="Opis" />
        </FormFields>
        <FormActions>
          <SubmitButton disabled={!formik.isValid} text="Edytuj" />
        </FormActions>
      </FormContainer>
    </CardContainer>
  );
}
