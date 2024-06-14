import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal";


const UpdatePostButton = ({ contentId }) => {
    const closeModal = useModal();
    const closeMenu = () => {
        closeModal()
    }
    return (
        <OpenModalButton
            buttonText="Edit Post"
            onItemClick={closeMenu}
            modalComponent={<UpdatePostModal id={contentId} />}
        />)
}

export default UpdatePostButton;
