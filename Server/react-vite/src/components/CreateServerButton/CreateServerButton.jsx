import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal";
import CreateServerPage from "../CreateServerPage/CreateServerPage";


const CreateServerButton = () => {
    const closeModal = useModal();
    const closeMenu = () => {
        closeModal()
    }
    return (
        <OpenModalButton
            buttonText="Create Server"
            onItemClick={closeMenu}
            modalComponent={<CreateServerPage />}
        />)
}

export default CreateServerButton;
