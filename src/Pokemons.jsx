import React, { useState } from "react";
import NewPokemon from "./NewPokemon";

const Pokemons = ({ pokemons, deletePokemon, addPokemon, editPokemon }) => {
  const [isNewPokemonShowed, setIsNewPokemonShowed] = useState(false);
  const [editMode, setEditMode] = useState({});

  const handleDeletePokemon = (e, pokemon) => {
    e.preventDefault();
    deletePokemon(pokemon);
  };
  const handleEditPokemon = (e, pokemon) => {
    const pokemonUpperCase = { ...pokemon, name: pokemon.name.toUpperCase() };
    setEditMode(pokemonUpperCase);
  };

  const handleCancelEdit = (e, pokemon) => {
    setEditMode(null);
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    const upperCaseValue = value.toUpperCase(); 
    setEditMode({
      ...editMode,
      name: upperCaseValue,
    });
  };
  const handleSaveEdit = () => {
    if (editMode) { // Check if editMode is not null
      editPokemon(editMode);
      setEditMode(null);
    }
  }
  return (
    <div className="container my-5">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsNewPokemonShowed(true)}
      >
        Add new pokemon
      </button>
      {isNewPokemonShowed && <NewPokemon addPokemon={addPokemon} />}
      <hr />
      <ul className="list-group">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editMode && editMode.id === pokemon.id ? (
              <>
                <input
                  type="text"
                  value={editMode.name}
                  onChange={handleInputChange}                  
                />
                <button
                  className="btn btn-success btn-sm mx-2"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => handleCancelEdit(e, pokemon)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{pokemon.name ? pokemon.name.toUpperCase() : ''}</span>
                <div>
                  <button
                    className="btn btn-sm btn-primary mx-2"
                    onClick={(e) => handleEditPokemon(e, pokemon)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => handleDeletePokemon(e, pokemon)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemons;
