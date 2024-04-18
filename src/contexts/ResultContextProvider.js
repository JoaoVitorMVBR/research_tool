import React, {createContext, useContext, useState} from "react";

const ResultContext = createContext();
const baseUrl = 'https://duckduckgo10.p.rapidapi.com';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Elon musk');

    const getResults = async(type) => {

        console.log(`${baseUrl}${type}`);
        
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ab7d19935emsh588df822676797bp1458b7jsn677ab6dcd1bd',
                'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
            }
        });

        const data = await response.json();

        setResults(data);
        setIsLoading(false);
    }

    return(
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);


