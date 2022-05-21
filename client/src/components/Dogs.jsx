import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import imgDog from '../assets/Dog4.jpg';
import styles from '../components/dogs.module.css';
import { deleteDog } from '../redux/actions';

export default function Dogs() {

    const dogs = useSelector(state => state.dogs);
    const dispatch = useDispatch();


    const handlerClick = (id) => {
        dispatch(deleteDog(id))
    }
    return (
        <section className={styles.container_cards}>
            {
            dogs.length > 0 ? dogs.map((dog) => {
                return  <div key={dog.id} className={styles.card_dog}>
                            <div className={styles.dog_button}>
                                <button onClick={() => handlerClick(dog.id)}>X</button>
                            </div>
                            <div className={styles.dog_title}>
                                <h1>{dog.name}</h1>
                            </div>
                            <div className={styles.details}>
                                <div>
                                    <Link to={`/Dog/Details/${dog.id}`}>    
                                        {
                                            
                                            dog.reference_image_id  ? (<img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={`perro ${dog.name}`}/>) 
                                            : (<img src={imgDog} alt="perro sospechozo"/>) 
                                        }
                                    </Link>
                                </div>
                                <div className={styles.details_names}>
                                    <h2>Peso:</h2>
                                    <p>{dog.weight.metric} kg</p>
                                </div>
                            </div>
                            <div className={styles.container_temps}>
                                <h2>Temperamentos:</h2>
                                {
                                    dog.temperament ? (<p>{dog.temperament}</p>) : dog.temperamentos.map((temp) => {
                                        return <p key={temp.id}>{temp.name}</p>
                                    })
                                }
                            </div>
                        </div>
            }): <div>
                    <h1>Sin perritos</h1>
                </div>}
        </section>
    );
}