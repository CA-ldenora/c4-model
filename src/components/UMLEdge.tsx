import React, { type FC, type CSSProperties } from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  type Edge,
  type EdgeProps,
} from '@xyflow/react';

interface EdgeLabelProps {
  transform: string;
  label: string;
}

interface EdgeData {
  sourceLabel?: string;
  targetLabel?: string;
}

function EdgeLabel({ transform, label }: EdgeLabelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'transparent',
        padding: 10,
        color: '#333',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

type CustomEdgeProps = EdgeProps & {
  data?: EdgeData;
};

const UMLEdge: FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style as CSSProperties} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        {data?.sourceLabel && (
          <EdgeLabel
            transform={`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}
            label={data.sourceLabel}
          />
        )}
        {data?.targetLabel && (
          <EdgeLabel
            transform={`translate(-50%, -100%) translate(${targetX}px,${targetY}px)`}
            label={data.targetLabel}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default UMLEdge; 