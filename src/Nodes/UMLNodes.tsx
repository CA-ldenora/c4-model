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

const UMLNode = ({ data, className }: UMLNodeProps & { className?: string }) => {
  return (
    <div className={`uml-node ${className || ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="uml-node-header">
        {data.title}
      </div>
      <div className="uml-node-content">
        {data.attributes && data.attributes.length > 0 && (
          <div className="uml-node-section">
            <ul className="uml-node-attributes">
              {data.attributes.map((attr, index) => (
                <li key={index}>{attr}</li>
              ))}
            </ul>
          </div>
        )}
        {data.methods && data.methods.length > 0 && (
          <div className="uml-node-section">
            <ul className="uml-node-methods">
              {data.methods.map((method, index) => (
                <li key={index}>{method}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export const ClassNode = (props: UMLNodeProps) => (
  <UMLNode {...props} className="class" />
);

export const InterfaceNode = (props: UMLNodeProps) => (
  <UMLNode {...props} className="interface" />
);

export const EnumNode = (props: UMLNodeProps) => (
  <UMLNode {...props} className="enum" />
);

export const AbstractNode = (props: UMLNodeProps) => (
  <UMLNode {...props} className="abstract" />
);

export const PackageNode = (props: UMLNodeProps) => (
  <UMLNode {...props} className="package" />
);

export const ComponentNode = (props: UMLNodeProps) => (
  <UMLNode {...props} className="component" />
);

export default UMLNode; 