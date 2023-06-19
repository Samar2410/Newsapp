
import './App.css';

import React , {useState} from 'react'
import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";
import Navbar from "./components/Navbar"
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

 const App =()=> {
  
  const pagesize=10;
  const apiKey=process.env.REACT_APP_APIKEY;
  const [progress,setProgress]=useState(0);
  
  
    return (
       
      <div>
      <Router>
         
        <Navbar ></Navbar>
        <LoadingBar height={3}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
        <Route exact path="/" element={ <News setProgress={setProgress}  apiKey={apiKey} key="general" pagesize={pagesize} country="in" category="general"></News>}></Route>
        <Route exact path="/health" element={ <News setProgress={setProgress}  apiKey={apiKey} key="health" pagesize={pagesize} country="in" category="health"></News>}></Route>
        <Route exact path="/entertainment" element={ <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pagesize={pagesize} country="in" category="entertainment"></News>}></Route>
        <Route exact path="/technology" element={ <News setProgress={setProgress}  apiKey={apiKey} key="technology" pagesize={pagesize} country="in" category="technology"></News>}></Route>
        <Route exact path="/science" element={ <News setProgress={setProgress}  apiKey={apiKey} key="science" pagesize= {pagesize} country="in" category="science"></News>}></Route>
        <Route exact path="/business" element={ <News setProgress={setProgress} apiKey={apiKey} key="business" pagesize={pagesize} country="in" category="business"></News>}></Route>
        <Route exact path="/sports" element={ <News setProgress={setProgress} apiKey={apiKey} key="sports" pagesize={pagesize} country="in" category="sports"></News>}></Route>
        
       </Routes> 
        
     </Router>
      </div> 
     
    )
  
}


export default App