import './index.scss';
import { RouterProvider } from 'react-router';
import { router } from "./routes/app.routes"
import { AuthProvider } from './features/Authentication/auth.context';
import { ReportProvider } from './features/AI/report.context';

function App() {

  return (
    <>
      <AuthProvider>
        <ReportProvider>
          <RouterProvider router={router} />
        </ReportProvider>
      </AuthProvider>
    </>
  )
}

export default App
