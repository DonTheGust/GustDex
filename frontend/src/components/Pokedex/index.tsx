import axios from "axios";
import { PokemonClient } from "pokenode-ts";
import { useState } from "react";
import pokedex_bg from "../../assets/img/Pokedex.svg";
import { Pokemon } from "../../models/pokemon";
import "./styles.css";

function Pokedex() {
    const baseStats = "-";
    const search = "Bulbasaur";
    //const url = "https://pokeapi.co/api/v2";

    const [searchTerm, setSearchTerm] = useState(search);
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    function SearchPokemon() {
        console.log(searchTerm);

        const hp = document.querySelector(".hp_stats");
        const atk = document.querySelector(".atk_stats");
        const def = document.querySelector(".def_stats");
        const satk = document.querySelector(".sa_stats");
        const sdef = document.querySelector(".sd_stats");
        const spd = document.querySelector(".spd_stats");

        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(searchTerm.toLowerCase())
                .then((data) => {
                    setPokemon(data);
                    console.log(data);

                    hp.innerHTML = data.stats[0].base_stat;
                    atk.innerHTML = data.stats[1].base_stat;
                    def.innerHTML = data.stats[2].base_stat;
                    satk.innerHTML = data.stats[3].base_stat;
                    sdef.innerHTML = data.stats[4].base_stat;
                    spd.innerHTML = data.stats[5].base_stat;

                    document.querySelector(".errorTxt").innerHTML = "";
                })
                .catch((error) =>
                    document.querySelector(".errorTxt").innerHTML = 'Pokemon not found :D'
                );
        })();
    }

    return (
        <>
            <img src={pokedex_bg} className="poke-bg" alt="background_pokedex" />
            <div className="principal">
                <div className="display">
                    <img src={pokemon.sprites.front_default} className="poke-img" alt={pokemon.name} />
                </div>
                <div className="errorSearch">
                    <p className="errorTxt"></p>
                </div>
                <div className="search">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchTerm}
                        placeholder={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input type="submit" value="Search" onClick={() => SearchPokemon()} />
                </div>

                <div className="data-info">
                    <p></p>
                </div>
                <div className="data-stats">
                    <table>
                        <tr>
                            <td>HP</td>
                            <td className="hp_stats">{baseStats}</td>
                        </tr>
                        <tr>
                            <td>ATTACK</td>
                            <td className="atk_stats">{baseStats}</td>
                        </tr>
                        <tr>
                            <td>DEFENSE</td>
                            <td className="def_stats">{baseStats}</td>
                        </tr>
                        <tr>
                            <td>SP. ATK</td>
                            <td className="sa_stats">{baseStats}</td>
                        </tr>
                        <tr>
                            <td>SP. DEF</td>
                            <td className="sd_stats">{baseStats}</td>
                        </tr>
                        <tr>
                            <td>SPEED</td>
                            <td className="spd_stats">{baseStats}</td>
                        </tr>
                    </table>
                </div>
                {/*<h1>Pokedex area</h1>*/}
            </div>
        </>
    );
}

export default Pokedex;
