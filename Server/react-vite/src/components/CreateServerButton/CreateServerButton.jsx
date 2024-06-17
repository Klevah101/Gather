import OpenModalButtonCreateServer from "../OpenModalButton/OpenModalButtonCreateServer";
import { useModal } from "../../context/Modal";
// import UpdatePostModal from "../UpdatePostModal/UpdatePostModal";
import CreateServerPage from "../CreateServerPage/CreateServerPage";


const CreateServerButton = () => {
    const closeModal = useModal();
    const closeMenu = () => {
        closeModal()
    }
    return (<div className="hoverable">

        <OpenModalButtonCreateServer
            buttonText="Create Server"
            onItemClick={closeMenu}
            modalComponent={<CreateServerPage />}
        /></div>)

}

export default CreateServerButton;
