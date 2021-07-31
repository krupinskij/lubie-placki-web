import { useQuery } from 'react-apollo';
import { Redirect, Route } from 'react-router';

import { Error } from './Error';
import { Loading } from './Loading';

import { RANDOM_RECIPE_QUERY } from '../../graphql/random-recipe.query';

export function RandomRoute(props: any) {
  const { data, error, loading } = useQuery(RANDOM_RECIPE_QUERY, {
    fetchPolicy: 'network-only',
  });

  return (
    <Route
      {...props}
      render={() => {
        if (loading) return <Loading />;
        if (error) return <Error />;

        return <Redirect to={`/recipe/${data.randomRecipe}`} />;
      }}
    />
  );
}
