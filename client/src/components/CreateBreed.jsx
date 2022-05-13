import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import styles from '../components/createbreed.module.css';
import { createBreed } from '../redux/actions';
import { findTemperaments } from '../redux/actions';

export default function CreateBreed() {

    const [input, setInput] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperaments: []
    });

    const {temperaments} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findTemperaments());
    },[]);

    const handlerChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handlerSumit = (e) => {
        e.preventDefault();
        dispatch(createBreed(input))
    }

    const handlerClick = (e) => {
        if (e.target.checked) {
            setInput(prev => ({...prev, temperaments: [...prev.temperaments, e.target.value]}));
        } else {
            setInput(prev => ({...prev, temperaments: [...prev.temperaments.filter(temp => temp !== e.target.value)]}));
        }
    }
    return (
        <div className={styles.container_form}>
            <h1>¡Crea tu propia raza! 🐶</h1>
            <form onSubmit={e => handlerSumit(e)} className={styles.form}>
                <label>Nombre</label>
                <input type="text" name='name' onChange={e => handlerChange(e)}/>
                <label>Altura minima</label>
                <input type="text" name='minHeight' onChange={e => handlerChange(e)}/>
                <label>Altura maxima</label>
                <input type="text" name='maxHeight' onChange={e => handlerChange(e)}/>
                <label>Peso minimo</label>
                <input type="text" name='minWeight' onChange={e => handlerChange(e)}/>
                <label>Peso maximo</label>
                <input type="text" name='maxWeight' onChange={e => handlerChange(e)}/>
                <label>Años de vida</label>
                <input type="text" name='life_span' onChange={e => handlerChange(e)}/>
                <div>
                    {
                        temperaments.length > 0 ? temperaments.map(temp => {
                            return (<div key={temp.id}>
                                {temp.name} <input  type='checkbox' value={temp.id} name={temp.name} onClick={e => handlerClick(e)}/>
                            </div>)
                        }) : <h3>Espere...</h3>
                    }
                </div>
                <input type="submit" value='Crear'/>
            </form>
        </div>
    )
}