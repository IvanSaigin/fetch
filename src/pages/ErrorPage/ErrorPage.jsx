import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ErrorPage = () => {

    const location = useLocation();
    const navigate = useNavigate();


    const { error } = location.state || {};

    useEffect(() => {
        if (!error) {
            navigate('/');
        }
    }, [error]);

    const fetchTodo = () => {
        navigate('/');
    }

    return (
        <div className="app">
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button
                    onClick={fetchTodo}
                    className="retry-button">
                    Попробовать снова
                </button>
            </div>
        </div>
    );
}

export default ErrorPage