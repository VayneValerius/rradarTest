import React from 'react';
import filmData from '../resources/tmdb_5000_movies.json';
import SearchBar from './SearchBar';
import FilmList from './FilmList';

import './App.css'

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            data: null,
            searchResults: [],
            filmList: [],
            counter: 0,
            lastElement: 0, 
            set: 0,
            finalSet: null,
            term: null,
            searchExhausted: false
        }
    }

    componentDidMount () {
        let request = filmData 
        this.setState({data : request})
    }

    searchForProductionCompanies(term, ammount, lastElement){
        console.log(term)
        if(this.state.data != null && this.state.searchExhausted === false){
            let newArray = [];
            if(term === this.state.term) {
                newArray = this.state.searchResults;
            }
            let counter = 0;
            for(lastElement; lastElement < this.state.data.length; lastElement++ ) {
                let element = this.state.data[lastElement]
                for(let a = 0; a < JSON.parse(element.production_companies).length; a++) {
                    if(JSON.parse(element.production_companies)[a].name.toLowerCase().includes(term.toLowerCase()) && counter < ammount ){
                        counter++;
                        newArray.push(element);
                        break;
                    }
                }
                if(counter >= ammount){
                    break;
                }
                if(lastElement === this.state.data.length){
                    this.setState({searchExhausted:true})
                    break;
                }
            }
            this.setState({searchResults: newArray, lastElement:lastElement})
        } 
    }

    onTermSubmit = async (term) => {
        console.log(term)
        this.setState({lastElement:0, searchResults:[], filmList:[], term: term, searchExhausted: false});
        console.log("search seatch")
        console.log(this.state.searchResults)
        let lastElement = this.state.lastElement;
        await this.searchForProductionCompanies(term, 10, lastElement);
        this.setState({set:0});
        this.setFilmList(this.state.searchResults, this.state.set)
    }

    setFilmList = (searchResults, set) => {
        console.log("searchResults")
        console.log(searchResults)
        
        let results = searchResults;
        let counter = set * 10;
        let limit = (set * 10) + 10;
        let filmList = [];
        for(counter; counter < limit; counter++) {
            filmList.push(results[counter]);
        }
        console.log(filmList);
        this.setState({filmList:filmList})
        
    }

    setNextList = async () => {
        let lastElement = this.state.lastElement;
        let set = this.state.set;
        if(this.state.searchExhausted === false){
            await this.searchForProductionCompanies(this.state.term, 10, lastElement);
            set++;
            this.setState({set: set });
            this.setState({finalSet: set})
        }
        else if(this.state.searchExhausted === true && this.state.set !== this.state.finalSet){
            set++;
            this.setState({set: set });
        }
        
        this.setState({set: this.state.set++ })
        this.setFilmList(this.state.searchResults, this.state.set)
    }

    setPreviousList = async () => {
        let set = this.state.set;
        if(set !== 0){
            set--;
            this.setState({set: set }); 
            this.setFilmList(this.state.searchResults, this.state.set)
        }
    }

    onCompanyClick = (term) => {
        this.onTermSubmit(term);
    }

    render(){

        return(
            <div className ="ui-container">
                <div >
                    <SearchBar onTermSubmit={this.onTermSubmit} />
                </div>
                <div>
                    <FilmList films={this.state.filmList} next={this.setNextList} previous={this.setPreviousList} onCompanyClick={this.onCompanyClick} />
                </div>
            </div>
        )
    }
}

export default App;