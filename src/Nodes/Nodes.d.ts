import { FC } from 'react';

interface NodeData {
  title: string;
  type: string;
  description: string;
}

interface NodeProps {
  data: NodeData;
}

export const ActorNode: FC<NodeProps>;
export const SistemaNode: FC<NodeProps>;
export const ExSistemaNode: FC<NodeProps>;
export const DatabaseNode: FC<NodeProps>;
export const MobileNode: FC<NodeProps>;
export const WebNode: FC<NodeProps>; 