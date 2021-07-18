import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';
import { UserProfile } from '../components/profile/UserProfile';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { USER_QUERY } from '../graphql/user.query';

export function ProfilePage() {
  const params: any = useParams();
  const { data, error } = useQuery(USER_QUERY, { variables: { id: params.id } });

  if (data) return <UserProfile {...(data as any).user} />;
  if (error) return <Error />;
  return <Loading />;
}
