import MainLayout from './components/layouts/mainLayout';
import { NetworkSimulator } from './components/molecules/NetworkSimulator';
import { NotificationDisplay } from './components/molecules/NotificationDisplay';
import { GraphEditor } from './components/pages/GraphEditor';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <MainLayout fullScreen={true}>
        <GraphEditor />
        <NetworkSimulator />
      </MainLayout>
      <NotificationDisplay />
    </AppProvider>
  );
}

export default App
