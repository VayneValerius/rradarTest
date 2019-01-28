import React from 'react';
import "./FilmItem.css";

const FilmItem = ({ film, onCompanyClick }) => {

    let keyWordsList = JSON.parse(film.keywords).map((keyword) => {
            
            return <p key={keyword.id}>{keyword.name}</p>
    })

    let productionCompanyList = JSON.parse(film.production_companies).map((company) => {
        let onClick = (event) => {
            let value = company.name;
            onCompanyClick(value);
        }
            
        return <div key={company.id} onClick={onClick} className="company-item"> {company.name} </div>
    })
    

    return ( 
        <div className="film-item">
            <h2>{film.title}</h2>
            <p>Release Date: {film.release_date}</p>
            <h4>{film.tagline}</h4>
            <p>Average Score: {film.vote_average}</p>
            <h4>Keywords</h4>
            <div className="value-list">{keyWordsList}</div>
            <h4>Production Companies</h4>
            <div className = "value-list">{productionCompanyList}</div>        
        </div>
    )
}


export default FilmItem;