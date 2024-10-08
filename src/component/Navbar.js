import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 

export default function Navbar() {
    const [search, setSearch] = useState("trending");  
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(10);
    
    const API_KEY = "4cccf381198042eba376f46f1fc1a41e";
    const pageSize = 20;

    const getdata = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}&page=${currentPage}&pageSize=${pageSize}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setArticles(data.articles);  
            setTotalResults(data.totalResults);
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    };

    useEffect(() => {
        if (search) {
            getdata();
        }
    }, [currentPage, search]);

    const nextPage = () => {
        if (currentPage < Math.ceil(totalResults / pageSize)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
          <nav className="bg-orange-600 text-white shadow-md ">
              <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-wrap justify-between items-center py-4 ">
                      <h1 className="text-2xl font-bold">World-News</h1>
                      <div className="flex flex-wrap gap-2 py-4 ">
                          <button className="text-lg font-bold bg-orange-600 text-white w-20 rounded-lg hover:border-light-100 hover:border-2">Home</button>
                          <button className="text-lg font-bold bg-orange-600 text-white w-20 rounded-lg hover:border-light-100 hover:border-2">About</button>
                          <button className="text-lg font-bold bg-orange-600 text-white w-20 rounded-lg hover:border-light-100 hover:border-2">Contact</button>
                      </div>

                      <div className="relative  sm:w-80% md:w-80% lg:w-64 xl:w-86">
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                              <FontAwesomeIcon icon={faSearch} />
                          </span>
                          <input
                              type="text"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search anything..."
                              className="border p-2 pr-10 rounded-lg   text-black  lg:full  xl:w-full "
                          />
                      </div>
                  </div>
              </div>
          </nav>

          <div className="py-4 mx-6 flex flex-wrap justify-center gap-2 sm:mx-2">
              <button
                  className="text-base sm:text-lg md:text-2xl mx-auto w-[48%] sm:w-[30%] md:w-40 my-1 font-bold bg-orange-600 text-white rounded-lg hover:border-light-100 hover:border-2"
                  onClick={() => setSearch("sports")}
              >
                  Sports
              </button>
              <button
                  className="text-base sm:text-lg md:text-2xl mx-auto w-[48%] sm:w-[30%] md:w-40 my-1 font-bold bg-orange-600 text-white rounded-lg hover:border-light-100 hover:border-2"
                  onClick={() => setSearch("education")}
              >
                  Education
              </button>
              <button
                  className="text-base sm:text-lg md:text-2xl mx-auto w-[48%] sm:w-[30%] md:w-40 my-1 font-bold bg-orange-600 text-white rounded-lg hover:border-light-100 hover:border-2"
                  onClick={() => setSearch("political")}
              >
                  Political
              </button>
              <button
                  className="text-base sm:text-lg md:text-2xl mx-auto w-[48%] sm:w-[30%] md:w-40 my-1 font-bold bg-orange-600 text-white rounded-lg hover:border-light-100 hover:border-2"
                  onClick={() => setSearch("local")}
              >
                  Local News
              </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {articles.length > 0 ? (
                  articles.map((article, index) => (
                    
                      <div 
                          key={index} 
                          className="card bg-white shadow-lg rounded-lg flex flex-col"
                          style={{ width: '300px', height: '400px' }}
                      >
                          <img 
                              className="card-img-top h-1/2 w-full object-cover rounded-t-lg"
                              src={article.urlToImage} 
                              alt={article.title} 
                          />
                          <div className="flex-grow p-4"> 
                              <h2 className="card-title text-lg font-bold mb-2">{article.title}</h2>
                              <p className="card-text mb-4 truncate">{article.description}</p>
                          </div>
                          <a 
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-center mb-2"
                          >
                              Read More
                          </a>
                      </div>
                  ))
              ) : (
                  <p>No articles found.</p>
              )}
          </div>

          <div className="flex justify-center gap-4 my-4 mx-auto">
              <button 
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg" 
                  onClick={prevPage} 
                  disabled={currentPage === 1}>
                  Back
              </button>

              <button 
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg" 
                  onClick={nextPage}
                  disabled={articles.length < pageSize}>
                  Next
              </button>
          </div>
        </>
    );
}
