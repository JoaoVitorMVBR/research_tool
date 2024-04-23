import React, {createContext, useContext, useState} from "react";

const ResultContext = createContext();
const baseUrl = 'https://duckduckgo10.p.rapidapi.com';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getResults = async(type) => {

        console.log(`${baseUrl}${type}`);
        
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd22ae27255msh6a6c855dde5dbe1p1a8836jsn7c6bb43d7857',
                'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
            }
        });

        const data = await response.json();

        setResults(data);
        setIsLoading(false);
        console.log(data);
    }

    return(
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);


