import imgDog from '../assets/Dog5.jpg';

export default function NotFound() {
    return (
        <div>
            <h1>404 NOT FOUND</h1>
            <img src={imgDog} alt="" />
        </div>
    );
}