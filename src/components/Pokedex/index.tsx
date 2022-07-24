import axios from "axios";
import { PokemonClient } from "pokenode-ts";
import { useState } from "react";
import pokedex_bg from "../../assets/img/Pokedex.svg";
import pokeball_sprite from "../../assets/img/pokeball_sprite.png";
import { Pokemon } from "../../models/pokemon";
import "./styles.css";

function Pokedex() {
    const baseInfo = "-";
    const search = "Search for a Pokémon, e.g. Wartortle/8";
    const url = "https://pokeapi.co/api/v2";

    const [SearchTerm, setSearchTerm] = useState(search);
    const [PokeInfo, setPokeInfo] = useState(baseInfo);
    const [Pokemon, setPokemon] = useState<Pokemon>([]);

    function SearchPokemon() {
        const sprite = document.querySelector(".poke-img");
        const hp = document.querySelector(".hp_stats");
        const atk = document.querySelector(".atk_stats");
        const def = document.querySelector(".def_stats");
        const satk = document.querySelector(".sa_stats");
        const sdef = document.querySelector(".sd_stats");
        const spd = document.querySelector(".spd_stats");
        const errorTxt = document.querySelector(".error-txt");
        const tableType = document.querySelector(".type-table");

        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(SearchTerm.toLowerCase())
                .then((data) => {
                    setPokemon(data);
                    hp.innerText = data.stats[0].base_stat;
                    atk.innerText = data.stats[1].base_stat;
                    def.innerText = data.stats[2].base_stat;
                    satk.innerText = data.stats[3].base_stat;
                    sdef.innerText = data.stats[4].base_stat;
                    spd.innerText = data.stats[5].base_stat;
                    sprite.src = data.sprites.front_default;

                    tableType.innerHTML = '';
                    data.types.forEach(element => {
                        tableType.innerHTML += '<tr>' + element.type.name.toUpperCase() + '</tr>'
                    });

                    axios.get(`${url}/pokemon-species/${data.id}`)
                        .then(response => {
                            setPokeInfo(response.data.flavor_text_entries[9].flavor_text);
                        })

                    document.querySelector(".error-txt").innerText = "";
                })
                .catch((error) => {
                    errorTxt.innerText = 'Pokemon not found :D';
                    console.log(error.message);
                }
                );
        })();
    }

    return (
        <>
            <img src={pokedex_bg} className="poke-bg" alt="background_pokedex" />
            <div className="principal">
                <div className="display">
                    <img src={pokeball_sprite} className="poke-img" alt={Pokemon.name} />
                </div>
                <div className="error-search">
                    <p className="error-txt"></p>
                </div>
                <div className="search">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder={SearchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input type="submit" value="Search" onClick={() => SearchPokemon()} />
                </div>

                <div className="data-info">
                    <h3 className="info-title">Info</h3>
                    <p className="info-txt">{PokeInfo}</p>
                </div>
                <div className="data-stats">
                    <h3 className="st-title">Stats/Type</h3>
                    <table className="stats-table">
                        <tr>
                            <td>HP</td>
                            <td className="hp_stats">{baseInfo}</td>
                        </tr>
                        <tr>
                            <td>ATTACK</td>
                            <td className="atk_stats">{baseInfo}</td>
                        </tr>
                        <tr>
                            <td>DEFENSE</td>
                            <td className="def_stats">{baseInfo}</td>
                        </tr>
                        <tr>
                            <td>SP. ATK</td>
                            <td className="sa_stats">{baseInfo}</td>
                        </tr>
                        <tr>
                            <td>SP. DEF</td>
                            <td className="sd_stats">{baseInfo}</td>
                        </tr>
                        <tr>
                            <td>SPEED</td>
                            <td className="spd_stats">{baseInfo}</td>
                        </tr>
                    </table>
                    <table className="type-table">
                        <tr>{baseInfo}</tr>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Pokedex;
