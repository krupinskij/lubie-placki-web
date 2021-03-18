import React from 'react';
import { View } from '../../templates/View';
import { Query, QueryResult } from 'react-apollo';
import { RECIPE_QUERY } from '../../graphql/recipe.query';
import { Recipes } from '../../typings/types';
import { Recipe } from '../../components/recipe/Recipe';
import { RouteComponentProps } from 'react-router';

interface RecipeMatchParams {
  id: string;
}

type RecipeProps = RouteComponentProps<RecipeMatchParams>;

export function RecipePage(props: RecipeProps) {
  return (
    <View>
      <Query
        query={RECIPE_QUERY}
        variables={{
          id: props.match.params.id,
        }}
      >
        {({ data, loading }: QueryResult<Recipes.Recipe>) => {
          if (data) {
            return <Recipe {...(data as any).recipe} />;
          }
          if (loading) {
            <div>Loading...</div>;
          }

          return <div>Wystąpił błąd</div>;
        }}
      </Query>
    </View>
  );
}
