import { Link } from "react-router-dom"

export default ({
    title, image, slug
}) => {
    return (
        <Link to={`anime/${slug}`}>
            <div className="anime__card">
                <img style={{maxWidth: '500px', maxHeight: '300px'}} src={image} alt="anime" />
                <div className="anime__card__title">
                    <span>{title}</span>
                </div>
            </div>
        </Link>
    )
}