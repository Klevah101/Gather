import OpenModalButtonEditPost from "../OpenModalButton/OpenModalButtonEditPost";
import { useModal } from "../../context/Modal";
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal";


const UpdatePostButton = ({ contentId }) => {
    const closeModal = useModal();
    const closeMenu = () => {
        closeModal()
    }
    return (
        <OpenModalButtonEditPost
            buttonText="Edit"
            onItemClick={closeMenu}
            modalComponent={<UpdatePostModal id={contentId} />}
        />)
}

export default UpdatePostButton;
