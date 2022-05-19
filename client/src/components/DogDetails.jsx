import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findIdDog } from "../redux/actions";
import imgDog from '../assets/Dog4.jpg';

export default function DogDetails() {

    const dog = useSelector(state => state.dog);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(findIdDog(id));
    }, []);

    if (dog.id) {
        return (
            <div>
                {
                                    
                    dog.reference_image_id  ? (<img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={`perro ${dog.name}`}/>) 
                                            : (<img src={imgDog} alt="perro sospechozo"/>) 
                }
                <p>{dog.name}</p>
                {
                    dog.temperament ? (<p>{dog.temperament}</p>) : dog.temperamentos.map((temp) => {
                        return <p key={temp.id}>{temp.name}</p>
                    })
                }
                <p>{dog.height.imperial} cm</p>
                <p>{dog.weight.metric} kg</p>
                <p>{dog.life_span.includes('years') ? dog.life_span  : `${dog.life_span} years`}</p>
            </div>
        );
    }
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}