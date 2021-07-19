import { useQuery } from 'react-apollo';

import { EditAvatarForm } from '../components/forms/EditAvatarForm';
import { EditProfileForm } from '../components/forms/EditProfileForm';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';

import { USER_QUERY } from '../graphql/user.query';

import { UserSession } from '../utils/user-session';

export function EditProfilePage() {
  const { data, error } = useQuery(USER_QUERY, { variables: { id: UserSession.userId } });
  if (data)
    return (
      <>
        <EditProfileForm user={data.user} />
        <EditAvatarForm />
      </>
    );
  if (error) return <Error />;
  return <Loading />;
}
