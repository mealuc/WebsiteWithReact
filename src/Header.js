import React, { useRef, useState, useEffect } from 'react';
import './Header.css';
import logo from './resources/dentaplazaicon.jpg';
import cities from './resources/cities.json'
import { Link } from 'react-router-dom';

function Header() {
    //Search Autocomplete 
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/getCities")
          .then(response => response.json())
          .then(data => {setCityData(data)})
          .catch(e => {
            console.log("Error occured when fetching city data =>", e);
          });
      }, []);

    const searchInputRef = useRef(null);
    var filteredData;
    function searchResult(data) {
        if (data && data.length >= 3) {
            filteredData = Object.values(cityData[0]).filter((city) => {
                return city.toLocaleUpperCase('TR').includes(data.toLocaleUpperCase('TR'))
            });
            setFilteredCityData(filteredData);
        }
        else {
            setFilteredCityData([]);
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
                        {filteredCityData.map((data, index) => {
                            return <li key={index} onClick={() => {
                                searchInputRef.current.value = data
                                setFilteredCityData([]);
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
