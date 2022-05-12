import React, { useState } from "react"
import { Link } from "react-router-dom"
import { findDogAPI, findDogBD } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function NavBar() {

    const dispatch = useDispatch();

    const [input, setInput] = useState('');

    const handlerChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/create/breed'>
                    <li>Create Breed</li>
                </Link>
            </ul>
            {/* <div>
                <input type="text" placeholder="Filtrar temperamento/raza"/>
                <button>Filtrar</button>
            </div>
            <div>
                <button>Orden alfabetico</button>
                <button>Peso</button>
            </div> */}
            <div>
                <input onChange={e => {handlerChange(e)}} type="text" placeholder="Buscar raza..." value={input}/>
                <button onClick={() => {
                    if (input === '') {
                        alert('Debe escribir una raza en el input');
                    } else {
                        dispatch(findDogAPI(input));
                        dispatch(findDogBD(input));
                        setInput('');
                    }
                }}>Buscar</button>
            </div>
        </div>
    )
}