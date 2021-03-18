import { Query, QueryResult } from 'react-apollo';
import { Redirect, Route } from 'react-router';
import { RANDOM_RECIPE_QUERY } from '../../graphql/random-recipe.query';

export function RandomRoute({ ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Query query={RANDOM_RECIPE_QUERY} fetchPolicy="network-only">
          {({ data }: any) => {
            if (data) {
              return <Redirect to={`/recipe/${data.randomRecipe[0]._id}`} />;
            } else {
              return <div>Loading...</div>;
            }
          }}
        </Query>
      )}
    />
  );
}
