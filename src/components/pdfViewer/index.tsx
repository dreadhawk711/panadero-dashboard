import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useContext, useEffect } from 'react';
// import { useState, useContext } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PanaderoContext } from '../contextProvider';
import englishMenu from '@/assets/documents/EN.pdf';
import russianMenu from '@/assets/documents/RU.pdf';
import romanianMenu from '@/assets/documents/RO.pdf';

// Set the workerSrc to the PDF.js worker file
// This is necessary for the PDF rendering to work correctly

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [scale, setScale] = useState(0.8);
  const { language } = useContext(PanaderoContext);

  useEffect(() => {
    console.log('Current language:', language);
  }, [language]);

  if (!englishMenu || !russianMenu || !romanianMenu) {
    return (
      <div className="text-center text-gray-500">No PDF file provided</div>
    );
  }

  return (
    <div className="relative w-full mx-auto">
      <div className="fixed bottom-8 left-1/2 -ml-[75px] z-10">
        <div className="flex bg-white border border-gray-300 rounded-lg shadow-lg">
          <button
            onClick={() => setScale((s) => Math.max(s - 0.1, 0.3))}
            className="px-3 py-2 hover:bg-gray-100 text-gray-700 w-[50px] focus:!outline-none"
          >
            −
          </button>
          <div className="px-2 py-2 bg-gray-50 w-[50px] !rounded-none flex items-center justify-center border-gray-300">
            <p className="text-center text-sm font-medium text-gray-700">
              {Math.round(scale * 100)}%
            </p>
          </div>
          <button
            onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
            className="px-3 py-2 hover:bg-gray-100  text-gray-700 w-[50px] focus:!outline-none"
          >
            +
          </button>
        </div>
      </div>
      <Document
        file={
          language === import.meta.env.VITE_ENGLISH_LANGUAGE
            ? englishMenu
            : language === import.meta.env.VITE_ROMANIAN_LANGUAGE
              ? romanianMenu
              : russianMenu
        }
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={scale}
            renderTextLayer={false}
            className="flex justify-center w-full"
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
