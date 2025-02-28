import React, { useState, useRef, useEffect } from 'react';
import IngredientMarker from './IngredientMarker';
import HeatIndicator from './HeatIndicator';
import ProcessBlockModal from './ProcessBlockModal';

const ProcessBlock = ({ 
  preparation, 
  trackIndex, 
  updatePreparation, 
  removePreparation, 
  setSelectedPreparation,
  trackPreparations
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const blockRef = useRef(null);

  // Color mapping for different process types
  const typeColors = {
    'sauté': 'bg-orange-500',
    'boil': 'bg-blue-500',
    'marinate': 'bg-yellow-600',
    'dice': 'bg-yellow-400',
    'chop': 'bg-yellow-400',
    'plate': 'bg-red-500',
    'cook': 'bg-red-600',
    'steam': 'bg-blue-300',
    'default': 'bg-gray-500'
  };

  // Timeline constants
  const pixelsPerMinute = 1040 / 50; // 1040px timeline width / 50 minutes
  const timelineStart = 130; // Left offset of the timeline in pixels

  // Calculate pixel position based on startTime
  const calculatePosition = (startTime) => {
    return timelineStart + (startTime * pixelsPerMinute); // Maps startTime=0 to timelineStart
  };

  // Calculate pixel width based on duration
  const calculateWidth = (duration) => {
    return Math.max(duration * pixelsPerMinute, 50); // Minimum width of 50px
  };

  // Convert pixel position back to time (minutes)
  const calculateTime = (position) => {
    return Math.max(0, (position - timelineStart) / pixelsPerMinute); // Ensures time >= 0
  };

  // Convert pixel width back to duration (minutes)
  const calculateDuration = (width) => {
    return Math.max(width / pixelsPerMinute, 1); // Minimum duration of 1 minute
  };

  // Check for collisions with other blocks on the same track
  const wouldCollide = (newStartTime, newDuration) => {
    if (!trackPreparations) return false;
    const newEndTime = newStartTime + newDuration;

    return trackPreparations.some(prep => {
      if (prep.id === preparation.id) return false; // Ignore self
      const prepEndTime = prep.startTime + prep.duration;
      return (
        (newStartTime >= prep.startTime && newStartTime < prepEndTime) ||
        (newEndTime > prep.startTime && newEndTime <= prepEndTime) ||
        (newStartTime <= prep.startTime && newEndTime >= prepEndTime)
      );
    });
  };

  // Handle mouse down for dragging or resizing
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection or other default behaviors
    e.stopPropagation(); // Stop event from bubbling up

    setSelectedPreparation(preparation);
    const rect = blockRef.current.getBoundingClientRect();
    const isRightEdge = Math.abs(e.clientX - rect.right) < 10; // Detect resize handle

    if (isRightEdge) {
      setIsResizing(true);
      setStartX(e.clientX);
      setOriginalWidth(rect.width);
    } else {
      const isOnButton = e.target.tagName === 'BUTTON' || e.target.closest('button');
      if (!isOnButton) { // Only drag if not clicking a button
        setIsDragging(true);
        setStartX(e.clientX);
        const computedStyle = window.getComputedStyle(blockRef.current);
        setStartLeft(parseFloat(computedStyle.left));
      }
    }

    // Attach listeners immediately to ensure first-click responsiveness
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse movement for dragging or resizing
  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, originalWidth + deltaX);
      const newDuration = calculateDuration(newWidth);

      if (!wouldCollide(preparation.startTime, newDuration)) {
        blockRef.current.style.width = `${newWidth}px`;
      }
    } else if (isDragging) {
      const deltaX = e.clientX - startX;
      const newLeft = Math.max(timelineStart, startLeft + deltaX); // Allow dragging to 0
      const newStartTime = calculateTime(newLeft);

      if (!wouldCollide(newStartTime, preparation.duration)) {
        blockRef.current.style.left = `${newLeft}px`;
      }
    }
  };

  // Handle mouse up to finalize drag or resize
  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      const finalWidth = parseFloat(window.getComputedStyle(blockRef.current).width);
      const newDuration = calculateDuration(finalWidth);

      if (!wouldCollide(preparation.startTime, newDuration)) {
        updatePreparation(preparation.id, { duration: newDuration });
      } else {
        blockRef.current.style.width = `${calculateWidth(preparation.duration)}px`; // Revert on collision
      }
    } else if (isDragging) {
      setIsDragging(false);
      const finalLeft = parseFloat(window.getComputedStyle(blockRef.current).left);
      const newStartTime = calculateTime(finalLeft);

      if (!wouldCollide(newStartTime, preparation.duration)) {
        updatePreparation(preparation.id, { startTime: newStartTime });
      } else {
        blockRef.current.style.left = `${calculatePosition(preparation.startTime)}px`; // Revert on collision
      }
    }

    // Clean up event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Cleanup listeners on unmount or state change
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const blockColor = typeColors[preparation.type] || typeColors.default;

  return (
    <>
      <div 
        ref={blockRef}
        className="absolute"
        style={{ 
          left: calculatePosition(preparation.startTime),
          width: calculateWidth(preparation.duration),
          zIndex: isDragging || isResizing ? 10 : 1,
          opacity: isDragging || isResizing ? 0.8 : 1
        }}
        onMouseDown={handleMouseDown}
      >
        <div className={`rounded p-2 h-16 ${blockColor} relative cursor-move group`}>
          <div className="flex justify-between">
            <span className="text-gray-900 font-medium truncate">{preparation.name}</span>
            <button 
              className="text-gray-900 rounded-full bg-gray-900 bg-opacity-20 h-6 w-6 flex items-center justify-center z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              ▼
            </button>
          </div>
          <div className="text-gray-900 text-xs">
            {Math.floor(preparation.duration)} min
          </div>
          {preparation.ingredients && preparation.ingredients.length > 0 && (
            <div className="absolute left-0 right-0 bottom-1 flex items-center justify-evenly">
              {preparation.ingredients.map((ingredient, idx) => (
                <IngredientMarker key={idx} ingredient={ingredient} />
              ))}
            </div>
          )}
          {preparation.heatLevel && (
            <HeatIndicator heatLevel={preparation.heatLevel} />
          )}
          <div className="absolute right-0 top-0 bottom-0 w-3 cursor-ew-resize 
                          flex items-center justify-center group-hover:bg-white group-hover:bg-opacity-20">
            <div className="h-8 w-1 bg-white bg-opacity-70 rounded"></div>
          </div>
        </div>
      </div>
      {showModal && (
        <ProcessBlockModal 
          preparation={preparation}
          updatePreparation={updatePreparation}
          removePreparation={removePreparation}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProcessBlock;

