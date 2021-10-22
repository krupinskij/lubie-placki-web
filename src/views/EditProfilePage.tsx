import { useQuery } from 'react-apollo';

import { EditAvatarForm } from '../components/forms/EditAvatarForm';
import { EditProfileForm } from '../components/forms/EditProfileForm';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';

import { USER_QUERY } from '../graphql/user.query';
import { Data } from '../typings/types';

import { UserSession } from '../utils/user-session';

export function EditProfilePage() {
  const { data, error, loading } = useQuery<Data.UserData>(USER_QUERY, {
    variables: { id: UserSession.userId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data) {
    return (
      <>
        <EditProfileForm user={data.user} />
        <EditAvatarForm />
      </>
    );
  }

  return null;
}
