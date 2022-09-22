import React,{ useState} from 'react'
import axios from 'axios';
import './Typeahead.css';


function Typeahead({placeholder, button}) {
    const [heros, setHeros] = useState([]);
    const [text, setText] = useState('');
    const [results, setResults] = useState([])

    const loadResults = async() =>{
        const currentTime = Date.now();
        var md5 = require("md5");
        const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + text + '&limit=99&ts=' + currentTime + '&apikey=5030a02be28f753c62c0e25ad97557c2&hash=' + md5(currentTime + "530f40e65fabae17bac76b6707f17c88a260e6b45030a02be28f753c62c0e25ad97557c2"));
        setHeros(response.data.data.results)
    } 

    const onChangeHandler = (text) => {
        let matches = []
        if(text.length > 1) {
            loadResults();
            setTimeout(100);
            matches = heros.filter(hero => {
                const regex = new RegExp(`${text}`, "gi");
                return hero.name.match(regex)
            })
        }
        setResults(matches)
        setText(text)}
        console.log(results)
       
  return (
    <div className='search'>
        <div className='searchInput'>
            <input type="text" placeholder={placeholder} onChange={e => onChangeHandler(e.target.value)} value={text}/>
            <button>{button}</button>
            <div className='results'>
            {results && results.map((result, i) => 
                <div className="result" key={i}>{result.name}</div>
            )}
            </div>
        </div>
    </div>
  )
}

export default Typeahead