import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <AuthProvider>
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthProvider>
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
