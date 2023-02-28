import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import { Blog } from 'Components/Blog';
import { AdminLayout } from 'Components/Admin';
import { ForgotPW, Login, Signup } from 'Components/Auth';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot" element={<ForgotPW />} />
      </Route>
    </Routes>
  );
}

export default App;