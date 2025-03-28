import { type FC, type CSSProperties } from 'react';
import { EdgeProps, getStraightPath, BaseEdge } from '@xyflow/react';

type UMLEdgeData = {
  sourceLabel?: string;
  targetLabel?: string;
};

type UMLEdgeProps = EdgeProps & {
  data?: UMLEdgeData;
};

const UMLEdge: FC<UMLEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  markerEnd,
  style = {},
}) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style as CSSProperties} markerEnd={markerEnd} />
      {data?.sourceLabel && (
        <div
          style={{
            position: 'absolute',
            background: 'transparent',
            padding: 10,
            color: '#333',
            fontSize: 12,
            fontWeight: 700,
            transform: `translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`,
          }}
          className="nodrag nopan"
        >
          {data.sourceLabel}
        </div>
      )}
      {data?.targetLabel && (
        <div
          style={{
            position: 'absolute',
            background: 'transparent',
            padding: 10,
            color: '#333',
            fontSize: 12,
            fontWeight: 700,
            transform: `translate(-50%, -100%) translate(${targetX}px,${targetY}px)`,
          }}
          className="nodrag nopan"
        >
          {data.targetLabel}
        </div>
      )}
    </>
  );
};

export default UMLEdge; 