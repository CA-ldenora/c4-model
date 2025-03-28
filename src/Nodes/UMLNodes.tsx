import { Handle, Position } from '@xyflow/react';
import './umlStyle.css';

interface UMLNodeProps {
  data: {
    title: string;
    type: string;
    description?: string;
    attributes?: string[];
    methods?: string[];
  };
}

export const ClassNode = ({ data }: UMLNodeProps) => {
  return (
    <div className="uml-node class-node">
      <Handle type="target" position={Position.Top} />
      <div className="uml-header">
        <h3>{data.title}</h3>
      </div>
      {data.attributes && data.attributes.length > 0 && (
        <div className="uml-attributes">
          {data.attributes.map((attr, index) => (
            <div key={index}>{attr}</div>
          ))}
        </div>
      )}
      {data.methods && data.methods.length > 0 && (
        <div className="uml-methods">
          {data.methods.map((method, index) => (
            <div key={index}>{method}</div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const InterfaceNode = ({ data }: UMLNodeProps) => {
  return (
    <div className="uml-node interface-node">
      <Handle type="target" position={Position.Top} />
      <div className="uml-header">
        <h3>{data.title}</h3>
      </div>
      {data.methods && data.methods.length > 0 && (
        <div className="uml-methods">
          {data.methods.map((method, index) => (
            <div key={index}>{method}</div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const EnumNode = ({ data }: UMLNodeProps) => {
  return (
    <div className="uml-node enum-node">
      <Handle type="target" position={Position.Top} />
      <div className="uml-header">
        <h3>{data.title}</h3>
      </div>
      {data.attributes && data.attributes.length > 0 && (
        <div className="uml-attributes">
          {data.attributes.map((attr, index) => (
            <div key={index}>{attr}</div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const AbstractNode = ({ data }: UMLNodeProps) => {
  return (
    <div className="uml-node abstract-node">
      <Handle type="target" position={Position.Top} />
      <div className="uml-header">
        <h3>{data.title}</h3>
      </div>
      {data.attributes && data.attributes.length > 0 && (
        <div className="uml-attributes">
          {data.attributes.map((attr, index) => (
            <div key={index}>{attr}</div>
          ))}
        </div>
      )}
      {data.methods && data.methods.length > 0 && (
        <div className="uml-methods">
          {data.methods.map((method, index) => (
            <div key={index}>{method}</div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const PackageNode = ({ data }: UMLNodeProps) => {
  return (
    <div className="uml-node package-node">
      <Handle type="target" position={Position.Top} />
      <div className="uml-header">
        <h3>{data.title}</h3>
      </div>
      <div className="uml-content">
        {data.description}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const ComponentNode = ({ data }: UMLNodeProps) => {
  return (
    <div className="uml-node component-node">
      <Handle type="target" position={Position.Top} />
      <div className="uml-header">
        <h3>{data.title}</h3>
      </div>
      <div className="uml-content">
        {data.description}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}; 