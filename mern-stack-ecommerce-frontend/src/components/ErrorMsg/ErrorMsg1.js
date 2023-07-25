import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { resetErrAction } from "../../redux/slices/globalActions/globalActions";

const ErrorMsg1 = ({ message }) => {
  const dispatch = useDispatch();
  
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  }).then(() => {
    dispatch(resetErrAction());
  });
};

export default ErrorMsg1;
