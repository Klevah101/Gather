import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetServers } from "../../redux/server";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { thunkGetMembers } from "../../redux/member";

function Navigation() {
  const dispatch = useDispatch();
  // const serverSlice = useSelector(state => state.servers)
  useEffect(() => {
    dispatch(thunkGetServers())
      .then(data => {
        const id = data[Object.keys(data)[0]].id

        dispatch(thunkGetChannels(id))
          .then(data => {
            const id = data[Object.keys(data)[0]].id
            dispatch(thunkGetChannelContents(id))
            return id
          })
        dispatch(thunkGetMembers(id))
      })
  }, [])
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/serverbar">serverbar</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
