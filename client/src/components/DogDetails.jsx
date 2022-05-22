import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findIdDog } from "../redux/actions";
import imgDog from '../assets/Dog4.jpg';
import styles from '../components/dogdetails.module.css';

export default function DogDetails() {

    const dog = useSelector(state => state.dog);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(findIdDog(id));
    }, []);

    if (dog.id) {
        return (
            <div className={styles.container_dog}>
                <div className={styles.dog_details}>
                    <h1>{dog.name}</h1>
                    {
                                        
                        dog.reference_image_id  ? (<img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={`perro ${dog.name}`}/>) 
                                                : (<img src={imgDog} alt="perro sospechozo"/>) 
                    }
                    <h3>Height:</h3>
                    <p>{dog.height.imperial} cm</p>
                    <h3>Weight:</h3>
                    <p>{dog.weight.metric} kg</p>
                    <h3>Life span:</h3>
                    <p>{dog.life_span.includes('years') ? dog.life_span  : `${dog.life_span} years`}</p>
                    <h3>Temperaments:</h3>
                    {
                        dog.temperament ? (<p>{dog.temperament}</p>) : dog.temperamentos.map((temp) => {
                            return <p key={temp.id}>{temp.name}</p>
                        })
                    }
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}