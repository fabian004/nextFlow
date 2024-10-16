import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

interface MessageNodeProps {
  data: {
    label: string; // Puedes agregar más propiedades aquí si es necesario
  };
}

export const MessageNode = ({ data }: MessageNodeProps) => (
  <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
    <Handle type="target" position={Position.Top} />
    <strong>{data.label}</strong>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const TextAreaNode = ({ data }: MessageNodeProps) => (
  <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
    <Handle type="target" position={Position.Top} />
    <strong>{data.label}</strong>
    <div style={{ marginTop: '10px' }}>
      <textarea placeholder="your name, please!" style={{ width: '100%', height: '80px', resize: 'none' }} />
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);


export const MultiSelectNode = ({ data }: MessageNodeProps) => {
  const [options, setOptions] = useState(['PIN', 'Password']);
  const [newOption, setNewOption] = useState('');

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const removeOption = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '10px', position: 'relative' }}>
      <Handle type="target" position={Position.Top} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{data.label}</strong>
        <button 
          onClick={addOption} 
          style={{ marginLeft: '10px', color: 'white', backgroundColor: 'black', border: 'none', padding: '5px', borderRadius: '50%', cursor:"pointer" }}>
          +
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        {options.map((option, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', position: 'relative' }}>
            <span style={{ marginRight: '10px' }}>{option}</span>
            <Handle type="source" position={Position.Right} id={`${index}`} style={{ top: '50%', transform: 'translateY(-50%)', right: '-10px' }} />
            <button 
              onClick={() => removeOption(index)} 
              style={{ marginLeft: '10px', backgroundColor: 'transparent', color: 'white', border: 'none', padding: '3px', borderRadius: '50%', cursor:"pointer" }}>
              x
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};