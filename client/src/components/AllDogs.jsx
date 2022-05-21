import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { findAllDogs, filterTemp , cleanFilter, filterBreedAPI, filterBreedBD } from '../redux/actions';
import { Link } from "react-router-dom";
import imgDog from '../assets/Dog4.jpg';
import styles from '../components/alldogs.module.css';

export default function AllDogs() {

    const itemsPerPage = 8;
    const dispatch = useDispatch();
    const {allDogs, filterDogs} = useSelector(state => state);
    
    const [auxDogs, setDogs] = useState(1);
    const [auxSwitchAlfa, setSwitchAlfa] = useState(true);
    const [auxSwitchPeso, setSwitchPeso] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [firstIndex, setFirstIndex] = useState(0);
    const [temperament, setTemperament] = useState('');

    useEffect(() => {
        dispatch(findAllDogs());
        dispatch(cleanFilter());
    },[]);

    // Crea el indice siguiente para pasar al siguiente grupo de 8 perros
    const nextHandler = () => {
        const nextPage = currentPage + 1;
        
        const firstIndex = nextPage * itemsPerPage;
        
        if(firstIndex >= allDogs.length) return;
        
        setFirstIndex(firstIndex);
        setCurrentPage(nextPage);
    }

    // Crea el indice anterior para devolver al anterior grupo de 8 perros
    const prevHandler = () => {
        const prevPage = currentPage - 1;

        if (prevPage < 0) return;

        const firstIndex = prevPage * itemsPerPage;

        setFirstIndex(firstIndex);
        setCurrentPage(prevPage);
    }

    // Ordena alfabeticamente todo el array de perros 
    const ordenarAlfa = () => {
        setDogs(allDogs.sort((a,b) => {
            if (auxSwitchAlfa) {
                setSwitchAlfa(false);     
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) return -1;
                return 0
            }
            setSwitchAlfa(true);
            if (a.name < b.name) {
                return 1
            } else if (a.name > b.name) return -1;
            return 0
        }));
        setDogs([]);
    }

    // Ordena por peso todo el array de perros
    const ordenarPeso = () => {
        setDogs(allDogs.sort((a,b) => {
            if (auxSwitchPeso) {
                setSwitchPeso(false);     
                if (((a.weight.metric[0]+a.weight.metric[1])*1) > ((b.weight.metric[0]+b.weight.metric[1])*1)) {
                    return 1
                } else if (((a.weight.metric[0]+a.weight.metric[1])*1) < ((b.weight.metric[0]+b.weight.metric[1])*1)) {
                    return -1;
                } 
                return 0;
            }

            setSwitchPeso(true);
            if (((a.weight.metric[0]+a.weight.metric[1])*1) < ((b.weight.metric[0]+b.weight.metric[1])*1)) {
                return 1
            } else if (((a.weight.metric[0]+a.weight.metric[1])*1) > ((b.weight.metric[0]+b.weight.metric[1])*1)) {
                return -1;
            }
            return 0;
        }));

        setDogs([]);
    }

    const handlerChange = (e) => {
        setTemperament(e.target.value);
    }

    // Despacha la accion que llena el array principal de perros y vacia el array auxiliar con los filtros
    const handlerAll = () => {
        dispatch(findAllDogs());
        dispatch(cleanFilter());
    }

    // Filtra por temperamentos el array principal
    const handlerFilter = (temperament) => {
        for (const i of allDogs) {
            if (i.id.length > 3) {
                if (i.temperamentos.length > 0) {
                    for (const temp of i.temperamentos) {
                        if (temp.name === temperament) {
                            dispatch(filterTemp(i.id));
                        }
                    }
                }
            } else {
                if (i.temperament) {
                    if (i.temperament.includes(temperament)) {
                        dispatch(filterTemp(i.id));
                    }
                }
            }
        }
        
    }

    // Despacha las acciones de filtrar por nombre de perro tanto desde la API como BD
    const handlerFilterBreed = (name) => {
        dispatch(filterBreedAPI(name));
        dispatch(filterBreedBD(name));
        setFirstIndex(0);
    }
    
    return (
        <div>
            <div className={styles.container_filter}>
                <div>
                    <button onClick={ordenarAlfa}>Ordenar Alfabeticamente</button>
                    <button onClick={ordenarPeso}>Ordenar Peso</button>
                </div>
                <button onClick={handlerAll}>Lista completa</button>
                <div>
                    <input type="text" onChange={e => handlerChange(e)} value={temperament} placeholder='Escribe filtro...'/>
                    <button onClick={() => {
                        if (temperament === '') {
                            alert('Debe escribir un temperamento para filtrar');
                        } else {
                            if (filterDogs.length === 0) {
                                handlerFilter(temperament);
                                setTemperament('');
                            }
                            else alert('Ya se encuentra filtrado'); 
                        }
                        
                    }}>Filtrar Temperamento</button>
                    <button onClick={() => {
                        if (temperament === '') {
                            alert('Debe escribir una raza para filtrar');
                        } else {
                            if(filterDogs.length === 0) {
                                handlerFilterBreed(temperament);
                                setTemperament('');
                            }
                            else alert('Ya se encuentra filtrado');
                        }
                    }}>Filtrar Raza</button>
                </div>
            </div>
            <br />
            <div className={styles.container_pages}>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>
            <div className={styles.container_dogs}>
                {
                [...allDogs].splice(
                    firstIndex,itemsPerPage
                ).map((dog) => {
                    return <div key={dog.id} className={styles.dogs}>
                                <div>
                                    <Link to={`/Dog/Details/${dog.id}`}>    
                                        {
                                            
                                            dog.reference_image_id  ? (<img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={`perro ${dog.name}`}/>) 
                                            : (<img src={imgDog} alt="perro sospechozo"/>) 
                                        }
                                    </Link>
                                </div>
                                <div>
                                    <h1>{dog.name}</h1>
                                    <h3>Peso:</h3>
                                    <p>{dog.weight.metric} kg</p>
                                    <h3>Temperamentos:</h3>
                                    {
                                        dog.temperament ? (<p>{dog.temperament}</p>) : dog.temperamentos?.map((temp) => {
                                            return <p key={temp.id}>{temp.name}</p>
                                        })
                                    }
                                </div>
                            </div>
                })}
            </div>
            <div className={styles.container_pages}>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>
        </div>
    );
}