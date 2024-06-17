import { useModal } from '../../context/Modal';
import { FaUserCircle } from 'react-icons/fa';

function OpenModalUserInfo({
  modalComponent, // component to render inside the modal
  // buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonStyle
}) {
  const { setModalContent, setOnModalClose, } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className={`modalUserButton ${buttonStyle}`} onClick={onClick}>{<FaUserCircle />}</button>;
}

export default OpenModalUserInfo;
