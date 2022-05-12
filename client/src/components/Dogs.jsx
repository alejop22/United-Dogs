import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDog from '../assets/Dog4.jpg';
export default function Dogs() {

    const dogs = useSelector(state => state.dogs);
    const dispatch = useDispatch();

    console.log(dogs);
    
    return (
        <section>
            {
            dogs.map((dog) => {
                return  <div key={dog.id}>
                            <h1>{dog.name}</h1>
                            <Link to={`/Dog/Details/${dog.id}`}>    
                                {
                                    
                                    dog.reference_image_id  ? (<img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={`perro ${dog.name}`}/>) 
                                                            : (<img src={imgDog} alt="perro sospechozo"/>) 
                                }
                            </Link>
                            {
                                dog.temperament ? (<p>{dog.temperament}</p>) : null //Join con la tabla temperamento
                            }
                            <p>{dog.weight.metric} Kg</p>
                        </div>
            })}
        </section>
    );
}