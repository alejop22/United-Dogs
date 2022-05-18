import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { findAllDogs } from '../redux/actions';
import { Link } from "react-router-dom";
import imgDog from '../assets/Dog4.jpg';
import styles from '../components/alldogs.module.css';

export default function AllDogs() {

    const itemsPerPage = 8;
    const dispatch = useDispatch();
    const {allDogs} = useSelector(state => state);
    
    const [auxDogs, setDogs] = useState(1);
    const [auxSwitchAlfa, setSwitchAlfa] = useState(true);
    const [auxSwitchPeso, setSwitchPeso] = useState(true);
    const [items, setItems] = useState([...allDogs].splice(0,itemsPerPage));
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(findAllDogs());
    },[]);

    const nextHandler = () => {
        const nextPage = currentPage + 1;
        
        const firstIndex = nextPage * itemsPerPage;
        
        if(items.length < itemsPerPage ) return;
        

        setItems([...allDogs].splice(firstIndex,itemsPerPage));
        setCurrentPage(nextPage);
    }

    const prevHandler = () => {
        const prevPage = currentPage - 1;

        if (prevPage < 0) return;

        const firstIndex = prevPage * itemsPerPage;

        setItems([...allDogs].splice(firstIndex,itemsPerPage));
        setCurrentPage(prevPage);
    }

    
    const ordenarAlfa = () => {
        setDogs(items.sort((a,b) => {
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

    const ordenarPeso = () => {

        setDogs(items.sort((a,b) => {
            if (auxSwitchPeso) {
                setSwitchPeso(false);     
                if ((a.weight.metric[0]+a.weight.metric[1])*1 > (b.weight.metric[0]+b.weight.metric[1])*1) {
                    return 1
                } else if ((a.weight.metric[0]+a.weight.metric[1])*1 < (b.weight.metric[0]+b.weight.metric[1])*1) {
                    return -1;
                } 
                return 0;
            }
            setSwitchPeso(true);
            if ((a.weight.metric[0]+a.weight.metric[1])*1 < (b.weight.metric[0]+b.weight.metric[1])*1) {
                return 1
            } else if ((a.weight.metric[0]+a.weight.metric[1])*1 > (b.weight.metric[0]+b.weight.metric[1])*1) {
                return -1;
            }
            return 0;
        }));
        setDogs([]);
    }
    
    return (
        <div>
            <button onClick={ordenarAlfa}>Ordenar Alfabeticamente</button>
            <button onClick={ordenarPeso}>Ordenar Peso</button>
            <br />
            <button onClick={prevHandler}>Prev</button>
            <button onClick={nextHandler}>Next</button>
            <div className={styles.container_dogs}>
                {
                items.map((dog) => {
                    return  <div key={dog.id} className={styles.dogs}>
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
                                    {
                                        dog.temperament ? (<p>{dog.temperament}</p>) : dog.temperamentos?.map((temp) => {
                                            return <p key={temp.id}>{temp.name}</p>
                                        })
                                    }
                                    <p>{dog.weight.metric} kg</p>
                                </div>
                            </div>
                })}
            </div>
        </div>
    );
}