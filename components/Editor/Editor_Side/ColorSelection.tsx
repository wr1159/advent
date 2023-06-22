interface ColorSelectionProps {
  bgcolor: string;
  textcolor: string;
  handleBgColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ColorSelection: React.FC<ColorSelectionProps> = ({
  bgcolor,
  textcolor,
  handleBgColorChange,
  handleTextColorChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-md border bg-background p-4">
        <h2 className="font-bold text-gray-700">Background Color</h2>
        <input
          type="color"
          name="bgColor"
          value={bgcolor}
          onChange={handleBgColorChange}
          className="my-2 w-full appearance-none rounded-md border-none"
        />
      </div>
      <div className="rounded-md border bg-background p-4">
        <h2 className="font-bold text-gray-700">Text Color</h2>
        <input
          type="color"
          name="textColour"
          value={textcolor}
          onChange={handleTextColorChange}
          className="my-2 w-full appearance-none rounded-md border-none"
        />
      </div>
    </div>
  );
};
export default ColorSelection;

/*
export default function SyncedInputs() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
    alert(text);
  }

  return (
    <>
      <Input
        label="First input"
        value={text}
        onChange={handleChange}
      />
      <Input
        label="Second input"
        value={text}
        onChange={handleChange}
      />
    </>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label>
      {label}
      {' '}
      <input
        type = 'color'
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
*/
