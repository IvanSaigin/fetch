// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">
                    <span className="digit">4</span>
                    <span className="zero">
                        <svg viewBox="0 0 100 100" className="zero-svg">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="100" strokeDashoffset="100">
                                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" fill="freeze" />
                            </circle>
                        </svg>
                    </span>
                    <span className="digit">4</span>
                </div>

                <h1 className="error-title">Страница не найдена</h1>
                <p className="error-message">
                    К сожалению, страница, которую вы ищете, не существует или была перемещена.
                </p>

                <div className="error-actions">
                    <Link to="/" className="home-link">
                        🏠 Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;