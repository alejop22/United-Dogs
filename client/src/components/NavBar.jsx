import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findDogAPI, findDogBD, switchTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from '../components/navbar.module.css';
import iconDog from '../assets/iconDog.png'

export default function NavBar() {

    const dispatch = useDispatch();
    const {switche, dogs} = useSelector(state => state);
    const [input, setInput] = useState('');

    const handlerChange = (e) => {
        setInput(e.target.value);
    }

    // Le pasamos un array de todos los temperamentos de la API y los inserta en la BD
    const postTemperament = async (temps) => {
        for (const iterator of temps) {
            try {
                const objTemperamento = {name: iterator}
                
                const rsDB = await fetch('http://localhost:3001/temperament', {
                    method: 'POST',
                    body: JSON.stringify(objTemperamento),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!rsDB.ok) {
                    throw 'Error al guardar temperamento en la base de datos';
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Hace la peticion a la API y crea un array de temperamentos
    const findFilterTemperament = () => {
        return function() {
            return fetch('https://api.thedogapi.com/v1/breeds')
                .then(rs => rs.json())
                .then((data) => {
                    if(data.length === 0) {
                        throw 'Error consumo API'
                    }
                    const arrAux = [];
                    for (const iterator of data) {
                        
                        if (iterator.temperament) {
    
                            const temperamentos = iterator.temperament.replace(/,/g, '');
                            const arrTemperamentos = temperamentos.split(' ');
                            for (const i of arrTemperamentos) {
                                arrAux.push(i);
                            }
                        }
                    }
                    const soloTemperamentos = [...new Set(arrAux)]; // Guardo todos los temperamentos sin repetirlos
                    postTemperament(soloTemperamentos);
                })
                .catch(e => console.log(e));
        }
    }

    const upperCase = (breed) => {
        return breed.charAt(0).toUpperCase() + breed.slice(1)
    }

    useEffect(() => {
        dispatch(switchTemperaments());
        if (!switche) {
            dispatch(findFilterTemperament());
        }
    },[switche]);

    return (
        <div className={style.navbar}>
            <div className={style.container_list}>
                <ul>
                    <Link to='/'>
                        <li><img src={iconDog}/></li>
                    </Link>
                    <Link to='/home'>
                        <li>Home</li>
                    </Link>
                    <Link to='/create/breed'>
                        <li>Create Breed</li>
                    </Link>
                    <Link to='/dogs'>
                        <li>View Dogs</li>
                    </Link>
                </ul>
            </div>
            <div className={style.container_input}>
                <input onChange={e => {handlerChange(e)}} type="text" placeholder="Search breed..." value={input}/>
                <button onClick={() => {
                    if (input === '') {
                        alert('You must write a race in the input');
                    } else {
                        
                        const repeatNames = dogs.filter(d => d.name === upperCase(input));
                        
                        if (repeatNames.length < 1) {
                            dispatch(findDogAPI(upperCase(input)));
                            dispatch(findDogBD(upperCase(input)));
                        } else {
                            alert('The breed is already on the screen');
                        }
                        setInput('');
                    }
                }}>Search</button>
            </div>
        </div>
    )
}