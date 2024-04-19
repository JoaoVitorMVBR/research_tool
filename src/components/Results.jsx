import React, { useEffect } from 'react';
import  { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Loading } from './Loading';

import { useResultContext } from '../contexts/ResultContextProvider';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if(searchTerm !== ''){
      getResults(`${location.pathname}?term=${searchTerm}&safeSearch=off&time=a&region=us-en`);
    }
  }, [searchTerm, location.pathname]);

  if(isLoading) 
    return <Loading/>;

  switch(location.pathname){

    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
            {results?.data?.map(({ url, title }, index) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={url} target='_blank' rel='noreferrer'>
                  <p className='text-sm'>
                    {url.length > 30 ? url.substring(0, 30) : url}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            ))}
        </div>
      );
    case '/search/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.data?.map(({image, url, title}, index) => (
            <a href={url} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5sm:p-3 p-5 h-80 w-64 flex flex-col items-center">
              <img className="h-48 w-auto" src={image} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case '/search/news':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56 item-center'>
            {results?.data?.map(({ url, title }, index) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={url} target='_blank' rel='noreferrer'>
                  <p className='text-sm'>
                    {url.length > 30 ? url.substring(0, 30) : url}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
                </a>
              </div>
            ))}
        </div>
      );
    case '/search/videos':
      return (
        <div className="flex flex-wrap ">
          {results?.data?.map(({url, image}, index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={url?.url} controls width="355px" height="200px" />
            </div>
          ))}
        </div>
      );
    default:
      return 'ERROR...';
  }
}

