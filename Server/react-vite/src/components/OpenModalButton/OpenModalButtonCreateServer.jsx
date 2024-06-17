import { useModal } from '../../context/Modal';
// import { FaCirclePlus } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";


function OpenModalButtonCreateServer({
  modalComponent, // component to render inside the modal
  // buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className="server-icon" onClick={onClick}>{<CiCirclePlus />}</button>;
}

export default OpenModalButtonCreateServer;
