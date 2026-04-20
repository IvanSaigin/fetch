import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TodoPage from './pages/TodoPage/TodoPage';
import NotFound from './pages/Page404/NotFound';
import ErrorPage from './pages/ErrorPage/ErrorPage';


const App = () => (
  <Routes>
    <Route path='/' element={<MainPage />}>
      <Route path='/task/:id' element={<TodoPage />} />
    </Route>
    <Route path='*' element={<NotFound />} />
    <Route path='/error' element={<ErrorPage />} />
  </Routes>
)

export default App;