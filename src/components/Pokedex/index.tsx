import axios from "axios";
import { PokemonClient } from "pokenode-ts";
import { useState } from "react";
import pokedex_bg from "../../assets/img/Pokedex.svg";
import pokeball_sprite from "../../assets/img/pokeball_sprite.png";
import "./styles.css";

function Pokedex() {
    const baseInfo = "-";
    const search = "Search for a Pokémon, e.g. Wartortle/8";
    const url = "https://pokeapi.co/api/v2";

    const [SearchTerm, setSearchTerm] = useState(search);
    const [PokeInfo, setPokeInfo] = useState(baseInfo);

    function SearchPokemon() {
        const sprite = document.querySelector(".poke-img") as HTMLImageElement;
        const hp = document.querySelector(".hp_stats") as HTMLElement;
        const atk = document.querySelector(".atk_stats") as HTMLElement;
        const def = document.querySelector(".def_stats") as HTMLElement;
        const satk = document.querySelector(".sa_stats") as HTMLElement;
        const sdef = document.querySelector(".sd_stats") as HTMLElement;
        const spd = document.querySelector(".spd_stats") as HTMLElement;
        const errorTxt = document.querySelector(".error-txt") as HTMLElement;
        const tableType = document.querySelector(".type-table") as HTMLElement;

        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(SearchTerm.toLowerCase())
                .then((data) => {
                    console.log(hp);
                    hp != null ? hp.innerText = String(data.stats[0].base_stat) : null;
                    atk != null ? atk.innerText = String(data.stats[1].base_stat) : null;
                    def != null ? def.innerText = String(data.stats[2].base_stat) : null;
                    satk != null ? satk.innerText = String(data.stats[3].base_stat) : null;
                    sdef != null ? sdef.innerText = String(data.stats[4].base_stat) : null;
                    spd != null ? spd.innerText = String(data.stats[5].base_stat) : null;
                    sprite != null ? sprite.src = String(data.sprites.front_default) : null;
                    sprite != null ? sprite.alt = String(data.name) : null;

                    tableType != null ? tableType.innerHTML = '' : null;
                    data.types.forEach(element => {
                        tableType != null ? tableType.innerHTML += '<tr>' + element.type.name.toUpperCase() + '</tr>' : null;
                    });

                    axios.get(`${url}/pokemon-species/${data.id}`)
                        .then(response => {
                            setPokeInfo(response.data.flavor_text_entries[9].flavor_text);
                        })

                    errorTxt != null ? errorTxt.innerText = "" : null;
                })
                .catch((error) => {
                    errorTxt != null ? errorTxt.innerText = 'Pokemon not found :D' : null;
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
                    <img src={pokeball_sprite} className="poke-img" alt={baseInfo} />
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
