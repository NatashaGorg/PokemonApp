/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Loader from "./Loader";
import { useState } from "react";
import Pokemons from "./Pokemons";
import { useEffect } from "react";
import { getResource } from "./helpers/fetch";
import { YELLOW_POKEMONS } from "./helpers/endpoints";
import { addToStorage, deleteFromStorage, idGenerator } from "./helpers/util";
import { POKEMONS_STORAGE_KEY } from "./helpers/constants";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  

  const storagePokemons =
    JSON.parse(localStorage.getItem(POKEMONS_STORAGE_KEY)) ?? [];

  useEffect(() => {
    getResource(YELLOW_POKEMONS)
      .then((data) => {
        data.pokemon_species.forEach((element) => {
          element.id = idGenerator();
        });

        const allPokemons = [...storagePokemons, ...data.pokemon_species];
        setPokemons(allPokemons);
      })
      .catch(() => alert("Something went wrong!"))
      .finally(() => setIsLoaded(true));
  }, []);
 

  const deletePokemon = (pokemon) => {
    try {
      deleteFromStorage(POKEMONS_STORAGE_KEY, pokemon);
      setPokemons(pokemons.filter((value) => value.id !== pokemon.id));
    } catch (error) {
      alert("Error");
    }
  };

  const addPokemon = (pokemon) => {
    try {
      addToStorage(POKEMONS_STORAGE_KEY, pokemon);
      setPokemons([pokemon, ...pokemons]);
    } catch (error) {
      alert("Error");
    }
  };
  const editPokemon = (editedPokemon) => {
    const updatedPokemons = pokemons.map((pokemon) =>
      pokemon.id === editedPokemon.id ? editedPokemon : pokemon
    );
    setPokemons(updatedPokemons);
    localStorage.setItem(POKEMONS_STORAGE_KEY, JSON.stringify(updatedPokemons));

    setPokemons(updatedPokemons);
  };

  return (
    <div>
      {!isLoaded && <Loader />}
      {isLoaded && (
        <Pokemons
          pokemons={pokemons}
          deletePokemon={deletePokemon}
          addPokemon={addPokemon}
          editPokemon={editPokemon}
        />
      )}
    </div>
  );
      }


export default App;
