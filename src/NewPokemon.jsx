import React, { useState } from "react";
import { idGenerator } from "./helpers/util";

const NewPokemon = ({ addPokemon }) => {
    const [pokemonName, setPokemonName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const pokemon = {
            id: idGenerator(),
            name: pokemonName.toUpperCase()
        };

        addPokemon(pokemon);
        setPokemonName("");
    };
    const handleInputChange = (e) => {
        const upperCaseValue = e.target.value.toUpperCase();
        console.log("Input Value:", upperCaseValue); 
        setPokemonName(upperCaseValue);
    };
    
    return (
        <div className="py-3">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter pokemon name"
                    value={pokemonName}
                    onChange={handleInputChange}
                    required
                />
                <button className="btn btn-success btn-sm">Save</button>
            </form>
        </div>
    );
};

export default NewPokemon;
