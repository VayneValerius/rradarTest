import React from 'react';
import FilmItem from './FilmItem';
import "./FilmList.css";

const FilmList = ({ films, next, previous, onCompanyClick }) => {
    const renderedList = films.map((film) => {
        if(film !== undefined) {
            return <FilmItem key={film.id}  film={film} onCompanyClick={onCompanyClick} />
        }
    });

    return (
        <div>
            <div className = "button-container"> 
                <input type="button" onClick={previous} value="Previous" className="select-buttons"/>
                <input type="button" onClick={next} value="Next" className="select-buttons"/> 
                
            </div>
            <div className = "film-list"> {renderedList} </div>
        </div>

    ); 
}

export default FilmList;