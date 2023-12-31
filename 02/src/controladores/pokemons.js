const { listarPokemons, detalharPokemon } = require("utils-playground");

const todosPokemons = async (req, res)=>{
    const pokemons =  await listarPokemons();
    return res.status(200).json(pokemons);
}

const detalhesPokemons = async (req, res)=>{
    const {id} = req.params
    const pokemon = await detalharPokemon (id);
    
    return res.status(200).json({id: pokemon.id,
        name:pokemon.name,
        height:pokemon.height,
        weight:pokemon.weight,
        base_experience:pokemon.base_experience,
        forms:pokemon.forms,
        abilities:pokemon.abilities,
        species:pokemon.species
    }
    );
}

module.exports = {todosPokemons, detalhesPokemons};