import { useNavigate } from 'react-router-dom';

export const goTo = () => () => {
    const navigate = useNavigate();
    navigate('/signup');
}


export const handleLoginClick = () => () => {
    const navigate = useNavigate();
    navigate('/signup');
}