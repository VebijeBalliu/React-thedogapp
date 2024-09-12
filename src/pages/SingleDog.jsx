import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleDog() {
    const [dog, setDog] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        const fetchSingleDogData = async () => {
            try {
                const res = await fetch(
                    `https://api.thedogapi.com/v1/breeds/search?q=${name}`
                );
                const data = await res.json();
                setDog(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleDogData();
    }, [name]);

    return (
        <>
            <section className="container d-flex align-items-center justify-content-center vh-100">
                {dog.map((item) => (
                    <div
                        key={item.id}
                        className="row g-4 p-4 d-flex align-items-center"
                    >
                        <div className="col-md-6">
                            <img
                                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                                alt={item.name}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-4 text-white mb-4">
                                {item.name}
                            </h1>
                            {item.description && (
                                <p className="text-muted mb-4">
                                    {item.description}
                                </p>
                            )}

                            <ul className="list-unstyled text-muted">
                                <li>
                                    <strong>Bred For:</strong> {item.bred_for}
                                </li>
                                <li>
                                    <strong>Height:</strong> {item.height.metric} cm
                                </li>
                                <li>
                                    <strong>Weight:</strong> {item.weight.metric} kgs
                                </li>
                                <li>
                                    <strong>Breed Group:</strong> {item.breed_group}
                                </li>
                                <li>
                                    <strong>Lifespan:</strong> {item.life_span}
                                </li>
                                <li>
                                    <strong>Temperament:</strong> {item.temperament}
                                </li>
                            </ul>

                            <Link
                                to="/"
                                className="btn btn-secondary mt-4"
                            >
                                &larr; Back
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default SingleDog;
