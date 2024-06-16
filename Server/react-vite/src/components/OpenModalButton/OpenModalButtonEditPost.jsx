import { useModal } from '../../context/Modal';
import { MdEdit } from "react-icons/md";

function OpenModalButtonEditPost({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className="button-icon" onClick={onClick}>{<MdEdit />}</button>;
}

export default OpenModalButtonEditPost;
