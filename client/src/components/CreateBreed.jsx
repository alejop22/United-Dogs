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

    const [errors, setErrors] = useState({
        name: '*',
        minHeight: '*',
        maxHeight: '*',
        minWeight: '*',
        maxWeight: '*'
    });

    const {temperaments} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findTemperaments());
    },[]);

    const handlerChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}));
        setErrors(handlerErrors({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handlerSumit = (e) => {
        e.preventDefault();
        dispatch(createBreed(input));
        setInput({
            name: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            life_span: '',
            temperaments: []
        });
        setErrors({
            name: '*',
            minHeight: '*',
            maxHeight: '*',
            minWeight: '*',
            maxWeight: '*'
        });
    }

    // Agrega o elimina temeperamentos del array
    const handlerClick = (e) => {
        if (e.target.checked) {
            setInput(prev => ({...prev, temperaments: [...prev.temperaments, e.target.value]}));
        } else {
            setInput(prev => ({...prev, temperaments: [...prev.temperaments.filter(temp => temp !== e.target.value)]}));
        }
    }

    // Valida y crea errores en el objeto errores
    const handlerErrors = (input) => {

        const auxErrors = {}

        if (input.name === '') auxErrors.name = '*';
        else if (!/^[A-Z]+$/i.test(input.name)) auxErrors.name = 'El campo nombre solo debe tener letras';

        if (input.minHeight === '') auxErrors.minHeight = '*';
        else if (!/^[0-9]*(\.?)[ 0-9]+$/.test(input.minHeight) || (input.minHeight * 1) > 50) auxErrors.minHeight = 'Solo se permiten numeros positivos';

        if (input.maxHeight === '') auxErrors.maxHeight = '*';
        else if (!/^[0-9]*(\.?)[ 0-9\s]+$/.test(input.maxHeight) || (input.maxHeight * 1) > 100) auxErrors.maxHeight = 'Solo se permiten numeros positivos';

        if (input.minWeight === '') auxErrors.minWeight = '*';
        else if (!/^[0-9]*(\.?)[ 0-9\s]+$/.test(input.minWeight) || (input.minWeight * 1) > 50) auxErrors.minWeight = 'Solo se permiten numeros positivos';

        if (input.maxWeight === '') auxErrors.maxWeight = '*';
        else if (!/^[0-9]*(\.?)[ 0-9\s]+$/.test(input.maxWeight) || (input.maxWeight * 1) > 100) auxErrors.maxWeight = 'Solo se permiten numeros positivos';

        if (input.life_span !== '') {
            if(!/^[0-9]*(\.?)[ 0-9\s]+$/.test(input.life_span) || (input.life_span * 1) > 100) auxErrors.life_span = 'Solo se permiten numeros positivos';
        }

        return auxErrors;
    }

    return (
        <div className={styles.container_form}>
            <h1>¡Crea tu propia raza! 🐶</h1>
            <form onSubmit={e => handlerSumit(e)} className={styles.form}>
                <div className={styles.form_details}>
                    <div className={styles.container_details}>
                        <div>
                            <label>Nombre</label>
                            { errors.name ? <span style={{color:'red'}}>{errors.name}</span> : null }
                        </div>
                        <input type="text" name='name' onChange={e => handlerChange(e)} value={input.name}/>

                        <div>
                            <label>Altura minima</label>
                            { errors.minHeight ? <span style={{color:'red'}}>{errors.minHeight}</span> : null }
                        </div>
                        <input type="number" name='minHeight' onChange={e => handlerChange(e)} value={input.minHeight} min='0' max='50'/>

                        <div>
                            <label>Altura maxima</label>
                            { errors.maxHeight ? <span style={{color:'red'}}>{errors.maxHeight}</span> : null }
                        </div>
                        <input type="number" name='maxHeight' onChange={e => handlerChange(e)} value={input.maxHeight} min='0' max='50'/>

                        <div>
                            <label>Peso minimo</label>
                            { errors.minWeight ? <span style={{color:'red'}}>{errors.minWeight}</span> : null }
                        </div>
                        <input type="number" name='minWeight' onChange={e => handlerChange(e)} value={input.minWeight} min='0' max='50'/>

                        <div>
                            <label>Peso maximo</label>
                            { errors.maxWeight ? <span style={{color:'red'}}>{errors.maxWeight}</span> : null }
                        </div>
                        <input type="number" name='maxWeight' onChange={e => handlerChange(e)} value={input.maxWeight} min='0' max='50'/>

                        <div>
                            <label>Años de vida</label>
                            { errors.life_span ? <span style={{color:'red'}}>{errors.life_span}</span> : null }
                        </div>
                        <input type="number" name='life_span' onChange={e => handlerChange(e)} value={input.life_span} min='0' max='50'/>
                    </div>
                    <div className={styles.temperaments_details}>
                        <h2>Puedes elegir los temperamentos... 🦴</h2>
                        <div className={styles.container_temperaments}>
                            {
                                temperaments.length > 0 ? temperaments.map(temp => {
                                    return (<div key={temp.id} className={styles.temperament}>
                                        {temp.name} <input  type='checkbox' value={temp.id} name={temp.name} onClick={e => handlerClick(e)}/>
                                    </div>)
                                }) : <h3>Espere...</h3>
                            }
                        </div>
                    </div>
                </div>
                <br />
                <input className={styles.btn_create} type="submit" value='Create 🐕' disabled={ Object.keys(errors).length === 0 ? false : true }/>
            </form>
        </div>
    )
}