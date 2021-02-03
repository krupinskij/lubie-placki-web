import { Link } from "react-router-dom";

import { Component } from "../../templates/Component";
import { Recipes } from "../../typings/types";

import { getFullDate } from "../../utils/date-time";

import "./Recipe.scss";

export function Recipe({ _id, name, description, ingredients, directions, hints, createdAt, owner }: Recipes.Recipe) {

    const ings = ingredients.map(ingredient => {
        return (
            <li key={ingredient.product}>{ingredient.product} - {ingredient.quantity}{ingredient.unit}</li>
        )
    })

    const dirs = directions.map(direction => {
        return (
            <li key={direction.text}>{direction.text}</li>
        )
    })

    const hins = hints.map(hint => {
        return (
            <li key={hint.text}>{hint.text}</li>
        )
    })

    return(
        <Component>
            <div className="recipe">
                <h2 className="recipe-header">
                    <Link className="recipe-name" to={`/recipe/${_id}`}>{name}</Link>
                </h2>

                <div className="recipe-meta">
                    <div>Dodano dnia: { getFullDate(createdAt) }</div> 
                    <div>Autor: <Link className="recipe-owner" to={`/profile/${ owner._id }`}>{ owner.username }</Link></div>
                </div>

                <div className="recipe-image">
                    <img src="https://via.placeholder.com/650x300" alt="recipe"/>
                </div>

                <div className="recipe-section">
                    <h3>Opis: </h3>
                    {description}
                </div>

                <div className="recipe-section">
                    <h3>Składniki:</h3>
                    <ul className="recipe-li">
                        {ings}
                    </ul>
                </div>

                <div className="recipe-section">
                    <h3>Sposób wykonania:</h3>
                    <ol className="recipe-li">
                        {dirs}
                    </ol>
                </div>

                <div className="recipe-section">
                    <h3>Wskazówki:</h3>
                    <ul className="recipe-li">
                        {hins}
                    </ul>
                </div>
            </div>
        </Component>
    )
}