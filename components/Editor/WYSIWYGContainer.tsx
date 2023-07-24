import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface WYSIWYGContainerProps {
  content: string;
  handleChange: (content: string, delta: any) => void;
}

const WYSIWYGContainer: React.FC<WYSIWYGContainerProps> = ({
  content,
  handleChange
}) => {
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { align: [] },
        { color: [] },
        { background: [] },
        'blockquote',
        'code-block',
        { list: 'ordered' },
        { list: 'bullet' },
        { script: 'sub' },
        { script: 'super' }
      ],
      ['link', 'image'],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean']
    ]
  };

  return (
    <div className="h-screen w-full">
      <h2 className="mb-4 text-2xl font-bold text-accent">
        Event Landing Page
      </h2>
      <ReactQuill
        id="quill"
        className="h-full break-all"
        value={content}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default WYSIWYGContainer;
