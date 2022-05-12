import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DogDetails() {

    const dog = useSelector(state => state.dog);
    const dispatch = useDispatch();
    const { id } = useParams();

    return (
        <div>

        </div>
    );
}