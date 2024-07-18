import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Head from "next/head";
import Cursor from "../components/Cursor";
import { useTheme } from "next-themes";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";

// Local Data
import data from "../data/portfolio.json";

export default function Examples() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [catPhotoSrc, setCatPhotoSrc] = useState();
  const [recipe, setRecipe] = useState();

  const handleSubmitName = function (e) {
    e.preventDefault();
    axios
      .get("https://portfolio.rittereverafter.com/api/agify?name=" + name)
      .then((response) => {
        setAge(response.data.message.age);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitCat = function (e) {
    e.preventDefault();
    axios
      .get("https://portfolio.rittereverafter.com/api/cats")
      .then((response) => {
        setCatPhotoSrc(response.data.message[0].url);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitRecipe = function (e) {
    e.preventDefault();
    axios
      .get("https://portfolio.rittereverafter.com/api/recipe")
      .then((response) => {
        setRecipe(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header isBlog />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5">
              Examples
            </h1>
            <div className="col">
              <div>
                <h2 className="text-xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5">
                  Guess Your Age by Your Name
                </h2>
                <br />
                <p>
                  Please enter your name and we will attempt to guess your age!
                  <br />
                  This example uses a Django API call to interact with
                  https://api.agify.io to get your age.
                </p>
              </div>
              <br />
              <div>
                <div className="card">
                  <form className="card-container" onSubmit={handleSubmitName}>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {age != null && (
                      <p>We guess that you are {age} years old!</p>
                    )}
                    <button className="button">Submit</button>
                  </form>
                </div>
              </div>
            </div>
            <br />
            <div className="col col-r">
              <div>
                <div className="card">
                  <div className="card-container">
                    {catPhotoSrc != null && (
                      <img className="catPhoto" src={catPhotoSrc}></img>
                    )}
                    <button className="button" onClick={handleSubmitCat}>
                      Go!
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5">
                  Get a Cat Pic!
                </h2>
                <br />
                <p>{"Click Go! You won't regret it!"}</p>
                <br />
                <p>
                  This example uses a Django API call to interact with
                  https://thecatapi.com to get you a delightful photo.
                </p>
              </div>
            </div>
            <br />
            <div className="col">
              <div>
                <h2 className="text-xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5">
                  Get a Random Recipe
                </h2>
                <br />
                <p>Click Go! and try something new...</p>
                <br />
                This example uses a Django API call to interact with
                https://www.themealdb.com to get you a delicios meal. The Django
                API also has to re-construct the meal data as the data provided
                by theMealDB is in an unusual format.
              </div>
              <div>
                <center>
                  <div className="card">
                    <div className="card-container">
                      {recipe != null && (
                        <RecipeCard recipe={recipe}></RecipeCard>
                      )}
                      <div className="button">
                        <button onClick={handleSubmitRecipe}>Go!</button>
                      </div>
                    </div>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
        <Footer isExamples />
      </div>
    </div>
  );
}
