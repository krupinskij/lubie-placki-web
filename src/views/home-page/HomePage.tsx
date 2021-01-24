import React from 'react';
import { View } from '../../templates/View';
import { Component } from '../../templates/Component';
import { Query, QueryResult } from 'react-apollo';
import { RECIPES_QUERY } from '../../graphql/recipes.query';
import { Recipes } from '../../typings/types';

export class HomePage extends React.Component {
    
    render() {
        return(
            <View>
                <Component>
                    <Query
                        query={RECIPES_QUERY}
                    >
                        {({ data }: any) => {
                            return <div>{data?.recipes.length}aaaaaaaa</div>
                        }}
                    </Query>

                </Component>
            </View>
        )
    }
}