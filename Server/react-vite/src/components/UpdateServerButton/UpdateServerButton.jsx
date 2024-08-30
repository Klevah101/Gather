import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import UpdateServerModal from "../UpdateServerModal/UpdateServerModal";


const UpdateServerButton = ({reload})=>{
    const closeModal = useModal();
    const closeMenu = ()=>{
        closeModal()
    }
    return (  
        <OpenModalButton
        buttonStyle="update-server-btn"
        buttonText="Update Server"
        onItemClick={closeMenu}
        modalComponent={  <UpdateServerModal reload={reload}/>}
      />)
}

export default UpdateServerButton;
