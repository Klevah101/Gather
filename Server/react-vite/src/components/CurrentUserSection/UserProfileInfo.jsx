// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
// import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearContents } from "../../redux/channelcontent";

function UserProfileInfo() {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();





    const handleLogout = async () => {
        await dispatch(thunkLogout());
        sessionStorage.removeItem("currentServer")
        sessionStorage.removeItem("currentChannel")
        dispatch(clearContents())

        // closeMenu();
        navigate("/")
    }

    return (
        <div className="modalUserButton">
            {/* <button onClick={toggleMenu}>
                <FaUserCircle /> <p>hi</p>
            </button> */}
            <p>{user && user.username}</p>
            <p>{user && user.email}</p>
            {/* <button onClick={logout}>Log Out</button> */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserProfileInfo;
