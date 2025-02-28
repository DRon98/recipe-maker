// Timeline/ConnectionArrow.jsx
import React from 'react';

const ConnectionArrow = ({ sourceBlock, targetBlock }) => {
  // Get positions of the blocks
  const getBlockPosition = (blockRef) => {
    if (!blockRef.current) return { left: 0, top: 0, width: 0, height: 0 };
    const rect = blockRef.current.getBoundingClientRect();
    const parentRect = blockRef.current.offsetParent.getBoundingClientRect();
    
    return {
      left: rect.left - parentRect.left,
      top: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const sourcePos = getBlockPosition(sourceBlock);
  const targetPos = getBlockPosition(targetBlock);
  
  // Calculate start and end points (favor the right side of source, left side of target)
  const start = {
    x: sourcePos.left + sourcePos.width,
    y: sourcePos.top + (sourcePos.height / 2)
  };
  
  const end = {
    x: targetPos.left,
    y: targetPos.top + (targetPos.height / 2)
  };
  
  // Create SVG path with appropriate curve
  const generatePath = () => {
    // Use a bezier curve for a smooth path
    const controlPointX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} C ${controlPointX} ${start.y}, ${controlPointX} ${end.y}, ${end.x} ${end.y}`;
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <defs>
        <marker
          id={`arrowhead-${sourceBlock.current?.id}-${targetBlock.current?.id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff" />
        </marker>
      </defs>
      <path
        d={generatePath()}
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="5,5"
        markerEnd={`url(#arrowhead-${sourceBlock.current?.id}-${targetBlock.current?.id})`}
      />
    </svg>
  );
};

export default ConnectionArrow;