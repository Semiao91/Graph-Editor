import MainLayout from './components/layouts/mainLayout';
import GraphEditor from './components/pages/GraphEditor';

function App() {
  return (
    <MainLayout fullScreen={true}>
      <GraphEditor />
    </MainLayout>
  );
}

export default App
