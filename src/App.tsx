import MainLayout from './components/layouts/mainLayout';
import GraphEditor from './components/pages/GraphEditor';

function App() {
  return (
    <MainLayout minWidth="1200px" minHeight="calc(100vh - 100px)">
      <GraphEditor />
    </MainLayout>
  );
}

export default App
