import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findDogAPI, findDogBD, insertTemperament, switchTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from '../components/navbar.module.css';
import iconDog from '../assets/iconDog.png'

export default function NavBar() {

    const dispatch = useDispatch();
    const {switche} = useSelector(state => state);
    const [input, setInput] = useState('');

    const handlerChange = (e) => {
        setInput(e.target.value);
    }

    useEffect(() => {
        dispatch(switchTemperaments());
        if (!switche) {
            dispatch(insertTemperament());
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