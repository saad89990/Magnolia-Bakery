import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div>
                <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success text-white" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://png.pngtree.com/background/20230403/original/pngtree-chocolate-brown-cake-delicious-picture-image_2269944.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://png.pngtree.com/background/20230403/original/pngtree-chocolate-brown-cake-delicious-picture-image_2269944.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images6.alphacoders.com/653/thumb-1920-653595.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
