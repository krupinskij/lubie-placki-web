import React from 'react';
import { View } from '../../templates/View';
import { Query, QueryResult } from 'react-apollo';
import { RECIPES_QUERY } from '../../graphql/recipes.query';
import { Recipes } from '../../typings/types';
import { RecipeList } from '../../components/recipe/RecipeList';

export function HomePage() {
  return (
    <View>
      <Query query={RECIPES_QUERY}>
        {({ data, loading }: QueryResult<Recipes.Recipes>) => {
          if (data) {
            return <RecipeList recipes={data.recipes} />;
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
