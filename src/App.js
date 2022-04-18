import React, { createContext, useState } from 'react';
import HomePage from './HomePage';
import Search from './Search';
import WrongPage from "./WrongPage";
import { Route, Routes } from "react-router-dom";

const userContext = createContext();

function App() {

    const [userData, setUserData] = useState();

    return (
        <userContext.Provider value={{userData , setUserData}}>
            <div className='w-screen h-screen bg-black flex justify-center items-center border text-slate-200'>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/search" element={<Search />} />
                    <Route path="*" element={<WrongPage />} />
                </Routes>
            </div>
        </userContext.Provider>
    )
}

export default App
export {userContext}