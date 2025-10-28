import MainLayout from './components/layouts/mainLayout';
import { NotificationDisplay } from './components/molecules/NotificationDisplay';
import GraphEditor from './components/pages/GraphEditor';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <MainLayout fullScreen={true}>
        <GraphEditor />
      </MainLayout>
      <NotificationDisplay />
    </AppProvider>
  );
}

export default App
