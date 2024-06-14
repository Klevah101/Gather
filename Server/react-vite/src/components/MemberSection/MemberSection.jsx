
import MemberItem from "../MemberItem/MemberItem";
import {  useSelector } from "react-redux"

const MemberSection = () => {

    const memberSlice = useSelector(state => state.members)
    return (
        <div className="member-container">
            <h2>Member Section</h2>
            <div className="nav-bar member-section">
                {memberSlice &&
                    Object.keys(memberSlice).map(element => {
                        return <div key={element.id}> <MemberItem member={memberSlice[element]} /></div>
                    })
                }
            </div>
        </div>
    )
}
export default MemberSection;
