import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchCep from './components/SearchCep'

// import Home from '../components/home/Home'
// import UserCrud from "../components/user/UserCrud";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path='*' element={<SearchCep />}></Route>
                {/* <Route exact path='/about' element={< About />}></Route> */}
                {/* <Route exact path='/contact' element={< Contact />}></Route> */}
            </Routes>
        </Router>
    )
}