import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
        super();
        this.handleNext = this.handleNext.bind(this);
        this.state = {
        index: 0,
        }
    }

    handleNext() {
        this.setState(state => ({
            index: state.index + 1,
        }));
        if (this.state.index === 8) this.setState({index: 0});
    }

    render() {
        return (
            <div>
                <div className="pokedex">
                    <Pokemon key={this.state.index} pokemon={this.props.pokemons[this.state.index]} />
                </div>
                <button onClick={this.handleNext}>Próximo</button>
            </div>
        )
    }
}

export default Pokedex;