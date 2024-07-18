import React from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

const RecipeCard = ({ recipe }) => {
  return (
    <article>
      <h2 className="text-xl tablet:text-2xl laptop:text-2xl laptopl:text-4xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5">
        {recipe.name}
      </h2>
      <br />
      <img className="recipe-img" src={recipe.thumb}></img>
      <br />
      <p className="recipeCategory">{recipe.category}</p>
      <br />
      <h2 className="text-l tablet:text-xl laptop:text-xl laptopl:text-xl ">
        Ingredients
      </h2>
      <br />
      {recipe.ingredients.map(({ ingredient, measurement }) => (
        <p key={ingredient} className="text-m mt-2">
          {measurement} {ingredient}
        </p>
      ))}
      <br />
      <h2 className="text-l tablet:text-xl laptop:text-xl laptopl:text-xl">
        Instructions
      </h2>
      <br />
      <p>{recipe.instructions}</p>
      <br />
    </article>
  );
};

export default RecipeCard;
