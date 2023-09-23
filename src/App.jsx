import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/Auth';
import router from './routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
