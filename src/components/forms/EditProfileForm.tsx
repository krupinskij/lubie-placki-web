import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { SubmitButton } from '../button/SubmitButton';
import { FormTextField } from '../form/Field';
import { FormActions, FormContainer, FormFields, FormHeader } from '../form/Form';

import { EDIT_USER_MUTATION } from '../../graphql/edit-user.mutation';

import * as Yup from 'yup';

const useStyles = makeStyles({
  card: {
    width: 700,
    margin: 20,
    padding: 30,
  },
});

const editProfileValidationSchema = Yup.object().shape({
  username: Yup.string().required('To pole jest wymagane').min(5, 'Nazwa użytkownika musi mieć co najmniej 5 znaków'),
});

interface EditProfileFormProps {
  user: {
    username: string;
    bio: string;
  };
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const styles = useStyles();

  const [editUser] = useMutation(EDIT_USER_MUTATION);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      bio: user.bio,
    },
    validationSchema: editProfileValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (editUserInput) => {
      const resp = await editUser({ variables: { editUserInput } });
      console.log(resp);
    },
  });

  return (
    <Card className={styles.card} elevation={12}>
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
    </Card>
  );
}
