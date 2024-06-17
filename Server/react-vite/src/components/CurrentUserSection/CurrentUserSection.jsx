import { FaGear } from "react-icons/fa6";
import { useSelector } from "react-redux";

const CurrentUserSection = () => {

    const user = useSelector(state => state.session.user)
    return (
        <>
            <img src="" alt=""></img>
            <p>{user.username}</p>
            <button className="setting-button">
                <FaGear />
            </button>
        </>
    )
}

export default CurrentUserSection;
