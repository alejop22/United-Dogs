import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import imgDog from '../assets/Dog4.jpg';
import styles from '../components/dogs.module.css';

export default function Dogs() {

    const dogs = useSelector(state => state.dogs);

    // if (dogs[0].temperamentos) {
    //     for (const i of dogs[0].temperamentos) {
    //         temps += `${i}, `;
    //     }
    // }

    return (
        <section className={styles.container_cards}>
            {
            dogs.map((dog) => {
                return  <div key={dog.id} className={styles.card_dog}>
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
                                    dog.temperament ? (<p>{dog.temperament}</p>) : dog.temperamentos.map((temp) => {
                                        return <p key={temp.id}>{temp.name}</p>
                                    })
                                }
                                <p>{dog.weight.metric} kg</p>
                            </div>
                        </div>
            })}
        </section>
    );
}