import React, { useState } from 'react';
import './bootstrap.css';

function App() {
  const [continentName, setContinentName] = useState("");
  const [countryList, setCountry] = useState([]);

  const [countryName, setCountryName] = useState("");
  const [countryInfo, setCountryInfo] = useState([]);

  const Country = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/continentName/${continentName}`);
      setCountry(await res.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const CountryMoreInfo = async e => {
    e.preventDefault();
    try {
      const res1 = await fetch(`http://localhost:5000/api/countryName/${countryName}`);
      setCountryInfo(await res1.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  return (

    <div class="container pt-5 text-center">
      <h1 class="my-5">Поиск стран по континенту</h1>

      <form class="d-flex" >
        <label>Введите название континента</label>
        <input type="text" name="name" placeholder="Название континента " class="form-control shadow" value={continentName} onChange={e => setContinentName(e.target.value)} />
        <button class="btn btn-primary shadow" onClick={Country}>Поиск</button>
      </form>

      <h2 class="my-5">Страны континента </h2>




      <div class="card-deck row ">
        {countryList.map(value => (
          <div class="card border-success col-md-3 p-1 my-1 d-flex align-items-stretch">
            <div class="card-header"><h4 class="card-title">{value.countryname}</h4></div>
            <div class="card-body d-flex flex-column">
              <p class="card-text"><strong>Код страны:</strong>{value.code} </p>
              <p class="card-text"><strong>Численность населения:</strong>{value.population} </p>
              <form onSubmit={CountryMoreInfo}>
                <button className="btn btn-primary shadow" data-bs-toggle="modal" data-bs-target="#modal" value={value.countryname} onClick={e => setCountryName(e.target.value)}>Больше информации</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div class="modal" id="modal">
        <div class="modal-dialog modal-m">
          <div class="modal-content bg-light">
            <div class="modal-header">
              <h2 class="modal-title">Информация по стране</h2>
            </div>
            {countryInfo.map(value => (
            <div class="modal-body">
                <div class="card text-white bg-success mb-3">
                  <div class="card-header"><h4 >{value.countryname}</h4></div>
                  <div class="card-body">
                    <p class="card-text">Континент: {value.continent}</p> 
                    <p class="card-text">Код страны: {value.code}</p>
                    <p class="card-text">Столица: {value.cityname}</p>
                    <p class="card-text">Глава правительства: {value.headofstate}</p>
                    <p class="card-text">Форма правления: {value.governmentform}</p>
                    <p class="card-text">Численность: {value.population}</p>
                    <p class="card-text">Площадь: {value.surfacearea}</p>
                  </div>
                </div>
            </div>
            ))}
            <div class="modal-footer">
              <button type="button" class="btn btn-danger shadow" data-bs-dismiss="modal">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
