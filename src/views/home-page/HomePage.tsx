import React from 'react';
import { View } from '../../templates/View';
import { Component } from '../../templates/Component';
import { Query, QueryResult } from 'react-apollo';
import { RECIPES_QUERY } from '../../graphql/recipes.query';
import { Recipes } from '../../typings/types';
import { Recipe } from '../../components/recipe/Recipe';
import { RecipeList } from '../../components/recipe/RecipeList';

export class HomePage extends React.Component {
    
    render() {
        return(
            <View>
                <Query
                    query={RECIPES_QUERY}
                >
                    {({ data, loading }: QueryResult<Recipes.Recipes>) => {
                        if(data) {
                            return <RecipeList recipes={data.recipes} />;
                        }
                        if(loading) {
                            <div>Loading...</div>
                        }

                        return <div>Wystąpił błąd</div>
                    }}
                </Query>
            </View>
        )
    }
}