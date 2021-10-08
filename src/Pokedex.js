import React from "react";
import Pokemon from "./Pokemon";

class Pokedex extends React.Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handleType = this.handleType.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.state = {
      index: 0,
      type: "All",
    };
  }

  filterPokemon(type) {
    return this.props.pokemons.filter((pokemon) => {
      if (type === "All") return pokemon;
      return pokemon.type === type;
    });
  }

  fetchTypes(pokemons) {
    return this.props.pokemons.reduce((acc, curr) => {
      if (!acc.includes(curr.type)) acc.push(curr.type);
      return acc;
    }, []);
  }

  handleNext() {
    const length = this.filterPokemon(this.state.type).length;
    this.setState((state) => ({
      index: (state.index + 1) % length,
    }));
  }

  handleType(type) {
    this.setState({ type, index: 0 });
  }

  buttonClass(filteredPokemon) {
    if (filteredPokemon.length === 1) return 'disabled-btn';
    return 'next-btn';
  }

  render() {
    const types = this.fetchTypes(this.props.pokemons);
    const filteredPokemons = this.filterPokemon(this.state.type);
    const pokemon = filteredPokemons[this.state.index];

    return (
      <div>
        <div className="pokedex">
          <Pokemon key={this.state.index} pokemon={pokemon} />
        </div>
        <div className="buttons">
          <button className="btn" key="all" onClick={() => this.handleType("All")}>
            All
          </button>
          {types.map((type) => {
            return (
              <button
                className="btn"
                id={type}
                key={type}
                onClick={() => this.handleType(type)}>
                {type}
              </button>
            );
          })}
        </div>
        <button className={this.buttonClass(filteredPokemons)} key="next" onClick={this.handleNext}>
          Próximo
        </button>
      </div>
    );
  }
}

export default Pokedex;
