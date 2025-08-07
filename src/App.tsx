import PdfViewer from './components/pdfViewer';
import Assistant from './components/assistants';
import ContextProvider from './components/contextProvider';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <div
        style={{ padding: '20px' }}
        className="justify-content-center mx-auto"
      >
        {/* <h1 className="text-center">PDF Viewer</h1> */}
        <PdfViewer />
        <Assistant />
      </div>
    </ContextProvider>
  );
}

export default App;
