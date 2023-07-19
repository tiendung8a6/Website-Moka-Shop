import './ButtonLogin0ut.css'

const ButtonLogin0ut = ({children}) => {
    return (
        <button class="fancy" href="#">
            <span class="top-key"></span>
            <span class="text">{children}</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
        </button>

    );
}

export default ButtonLogin0ut;