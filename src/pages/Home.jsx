import React, { useState, useEffect } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Link } from "react-router-dom";


function Home() {
    const [dogs, setDogs] = useState([]);
    const [text, setText] = useState("");
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const fetchDogData = async () => {
            try {
                const res = await fetch("https://api.thedogapi.com/v1/breeds");
                const data = await res.json();
                setDogs(data);
            } catch (error) {
                console.error(error);
            }
        };

        setSearched(false);
        fetchDogData();
    }, []);

    const searchForDog = async () => {
        try {
            const res = await fetch(
                `https://api.thedogapi.com/v1/breeds/search?q=${text}`
            );
            const data = await res.json();
            setDogs(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchForDog();
        setSearched(true);
    };

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            {!dogs ? (
                <h1 className="d-flex justify-content-center align-items-center text-black text-center fs-1 vh-100 fw-bold text-uppercase">
                    Loading...
                </h1>
            ) : (
                <>
                    <section className="container py-5">
                        <div className="text-center">
                            <h1 className="fs-1 fw-bold text-black">
                                The Dog App
                            
                            </h1> <br/>
                            <h1>Welcomee</h1>
                            <p className="my-4 text-grey">
                               {" "}
                                <a
                                    href="https://thedogapi.com"
                                    className="text-primary text-decoration-underline"
                                >
                                    Link to Api
                                </a>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mx-auto w-75"
                                autoComplete="off"
                            >
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Search for a dog / breed"
                                    className="form-control bg-secondary text-white placeholder-light"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <h2 className="text-center ">Type of Dogss</h2>
                            </form>
                        </div>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 my-4">
                            
                            {!searched ? (
                                dogs.map((dog) => (
                                    <div className="col mb-4" key={dog.id}>
                                        <Link
                                            to={`/${dog.name}`}
                                            className="card bg-dark text-white h-100"
                                        >
                                            <img
                                                src={dog.image?.url || 'fallback-image-url.jpg'}
                                                alt={dog.name}
                                                className="card-img-top"
                                                loading="lazy"
                                            />
                                            <div className="card-body">
                                                <h3 className="card-title">
                                                    {dog.name}
                                                </h3>
                                                <p className="card-text">
                                                    Bred For: {dog.bred_for}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                dogs.map((dog) => (
                                    <div className="col mb-4" key={dog.id}>
                                        <Link
                                            to={`/${dog.name}`}
                                            className="card bg-dark text-white h-100"
                                        >
                                            <img
                                                src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                                                alt={dog.name}
                                                className="card-img-top"
                                            />
                                            <div className="card-body">
                                                <h3 className="card-title">
                                                    {dog.name}
                                                </h3>
                                                <p className="card-text">
                                                    Bred For: {dog.bred_for}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default Home;
