// import { FaGear } from "react-icons/fa6";
import { useSelector } from "react-redux";
import OpenModalUserInfo from "../OpenModalButton/OpenModalUserInfo";
import UserProfileInfo from "./UserProfileInfo";
// import ProfileButton from "../Navigation/ProfileButton";

const CurrentUserSection = () => {

    const user = useSelector(state => state.session.user)
    return (
        <div className="user-section-item">
            <img src="" alt=""></img>
           { user && <p>{user.username}</p>}
            {/* <button className="setting-button"> */}
                {/* <FaGear /> */}
                <OpenModalUserInfo buttonText="" modalComponent={<UserProfileInfo />} />
            {/* </button> */}
        </div>
    )
}

export default CurrentUserSection;
