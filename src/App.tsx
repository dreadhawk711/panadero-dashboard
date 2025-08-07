import PdfViewer from './components/PdfViewer';
import pdfFile from './assets/documents/assets.pdf';
import Assistant from './components/assistants';
import './App.css';

function App() {
  return (
    <div style={{ padding: '20px' }} className='justify-content-center mx-auto'>
      {/* <h1 className="text-center">PDF Viewer</h1> */}
      <PdfViewer file={pdfFile} />
      <Assistant />
    </div>
  );
}

export default App;
