import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';
import { UserProfile } from '../components/profile/UserProfile';
import { RecipeList } from '../components/recipe/RecipeList';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { USER_RECIPES_QUERY } from '../graphql/user-recipes.query';
import { USER_QUERY } from '../graphql/user.query';

export function ProfilePage() {
  const params: any = useParams();
  const { data, error, loading } = useQuery(USER_QUERY, { variables: { id: params.id } });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <UserProfile {...(data as any).user} />
      <RecipeList query={USER_RECIPES_QUERY} variables={{ owner: params.id }} dataName="userRecipes" />;
    </>
  );
}
