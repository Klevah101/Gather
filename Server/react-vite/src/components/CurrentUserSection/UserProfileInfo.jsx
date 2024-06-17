// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
// import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function UserProfileInfo() {
    const user = useSelector(state => state.session.user)

    return (
        <div className="modalUserButton">
            {/* <button onClick={toggleMenu}>
                <FaUserCircle /> <p>hi</p>
            </button> */}
            <p>{user.username}</p>
            <p>{user.email}</p>
            {/* <button onClick={logout}>Log Out</button> */}
            <button>Logout</button>
        </div>
    )
}

export default UserProfileInfo;
