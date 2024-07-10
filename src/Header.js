import React, { useRef, useState } from 'react';
import './Header.css';
import logo from './resources/dentaplazaicon.jpg';
import cities from './resources/cities.json'
import { Link } from 'react-router-dom';

function Header() {
    //Search Autocomplete 
    const [cityData, setCityData] = useState([]);
    const searchInputRef = useRef(null);
    var filteredData;
    
    function searchResult(data) {
        if (data && data.length >= 3) {
            filteredData = [...Object.values(cities)].filter((city) => {
                return city.toLocaleUpperCase('TR').includes(data.toLocaleUpperCase('TR'))
            });
            setCityData(filteredData);
        }
        else {
            setCityData([]);
        }
    }

    return (
        <header className='header'>
            <div className="logo">
                <a href="/"><img src={logo} alt="logo" /></a>
            </div>

            <div className="navbarContainer">
                <ul className="navbarItems">
                    <li>
                        <a href="">Menu 1</a>
                        <div className="menuBranch">
                            <p>HEBELE</p>
                        </div>
                    </li>
                    <li>
                        <a href="">Menu 2</a>
                        <div className="menuBranch">
                            <p>HÜBELE</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="searchContainer">
                <div className="searchBox">
                    <input className="searchInput" ref={searchInputRef} onInput={e => searchResult(e.target.value)} type=" text" id="search-input"
                        autoComplete="off" placeholder="Bir şey yazınız" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="resultBox">
                    <ul>
                        {cityData.map((data, index) => {
                            return <li key={index} onClick={() => {
                                searchInputRef.current.value = data
                                setCityData([]);
                            }
                            }>{data}</li>
                        })}
                    </ul>
                </div>
            </div>

            <div className="menu">
                <ul>
                    <li><a href="/contact">Contact</a></li>
                    <li><Link to="/aboutUs">About Us</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Header = React.memo(Header);
