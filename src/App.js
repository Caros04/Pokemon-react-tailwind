import { useEffect, useMemo, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './About';
import './App.css';
import Home from './Home';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [text, setText] = useState('');
  const [filterPokemon, setFilterPokemon] = useState([]);
  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
      .then((res)=>res.json())
      .then((data)=>{
        const results = data.results.map((pokemon, idx)=>{
          return { ...pokemon, idx: idx+1};
        });
        setPokemon({ ...data, results});
      });
  })

  useMemo(()=>{
    if(text.length ===0){
      setFilterPokemon([]); 
      return;
    }

    setFilterPokemon(()=>
      pokemon.results?.filter((pokemon)=>pokemon.name.includes(text))
    )
  },[pokemon.results, text])

  return (
    <Router>
      <div className='p-14'>
        <div className='flex flex-col items-center'></div>
          <Link to='/'>
            <header className='text-4xl text-yellow-700'>Pokemon picker</header>

          </Link>
          <div className='w-full flex justify-center'>
            <input 
            type='text' 
            onChange={($event) =>setText($event.target.value)}
            placeholder='enter'
            className='mt-10 p-2 border-blue-500 border-2'/>
          </div>
      </div>

      <Routes>
        <Route path='/about/:slug' element={<About/>} />
        <Route path='/' element={pokemon && <Home pokemon = {filterPokemon}/>} />   
      </Routes>
    </Router>
    
  );
}

export default App;
