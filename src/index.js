import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './MainProvider';
import { SearchProvider } from './SearchProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SearchProvider>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </SearchProvider>
);



