// Timeline/ConnectionManager.jsx
import React, { useState, useRef } from 'react';
import ConnectionArrow from './ConnectionArrow';

const ConnectionManager = ({ recipe, updateRecipe }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [sourceId, setSourceId] = useState(null);
  const [connections, setConnections] = useState(recipe.connections || []);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  
  const blockRefs = useRef({});
  
  // Register a block reference
  const registerBlockRef = (id, ref) => {
    blockRefs.current[id] = ref;
  };
  
  // Start connection from a block
  const startConnection = (blockId) => {
    setIsConnecting(true);
    setSourceId(blockId);
  };
  
  // Complete connection to target block
  const completeConnection = (targetId) => {
    if (isConnecting && sourceId && sourceId !== targetId) {
      const newConnection = { sourceId, targetId };
      
      // Check if connection already exists
      const exists = connections.some(
        conn => conn.sourceId === sourceId && conn.targetId === targetId
      );
      
      if (!exists) {
        const newConnections = [...connections, newConnection];
        setConnections(newConnections);
        updateRecipe({ ...recipe, connections: newConnections });
      }
      
      // Reset connection state
      setIsConnecting(false);
      setSourceId(null);
    }
  };
  
  // Remove an existing connection
  const removeConnection = (sourceId, targetId) => {
    const newConnections = connections.filter(
      conn => !(conn.sourceId === sourceId && conn.targetId === targetId)
    );
    setConnections(newConnections);
    updateRecipe({ ...recipe, connections: newConnections });
  };
  
  // Connection button component
  const ConnectionButton = ({ blockId, position }) => {
    return (
      <button
        className={`absolute ${position} w-5 h-5 bg-gray-700 border-2 border-white rounded-full z-20
                   hover:bg-blue-500 transform -translate-x-1/2 -translate-y-1/2`}
        onClick={() => {
          if (isConnecting) {
            completeConnection(blockId);
          } else {
            startConnection(blockId);
          }
        }}
        onMouseEnter={() => setHoveredBlock(blockId)}
        onMouseLeave={() => setHoveredBlock(null)}
      />
    );
  };
  
  return {
    registerBlockRef,
    ConnectionButtons: ({ blockId }) => (
      <div className="connection-points">
        <ConnectionButton blockId={blockId} position="right-0 top-1/2" />
        <ConnectionButton blockId={blockId} position="left-0 top-1/2" />
        <ConnectionButton blockId={blockId} position="top-0 left-1/2" />
        <ConnectionButton blockId={blockId} position="bottom-0 left-1/2" />
      </div>
    ),
    ConnectionArrows: () => (
      <>
        {connections.map((conn, index) => (
          <ConnectionArrow
            key={`${conn.sourceId}-${conn.targetId}-${index}`}
            sourceBlock={blockRefs.current[conn.sourceId]}
            targetBlock={blockRefs.current[conn.targetId]}
          />
        ))}
      </>
    ),
    isConnecting,
    sourceId,
    hoveredBlock
  };
};

export default ConnectionManager;