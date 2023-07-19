import Swal from "sweetalert2";

const SuccessMsg = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
  }).then(() => {
    window.location.reload(); // Reload the page
  });
};

export default SuccessMsg;
