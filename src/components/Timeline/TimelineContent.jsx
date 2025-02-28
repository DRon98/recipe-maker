import React from 'react';
import TrackContainer from './TrackContainer';
import ProcessBlock from './ProcessBlock';

const TimelineContent = ({ recipe, updatePreparation, removePreparation, setSelectedPreparation }) => {
  // Only show existing tracks/processes if recipe has preparations
  if (recipe.preparations && recipe.preparations.length > 0) {
    // Group preparations by track type
    const prepsByTrack = recipe.preparations.reduce((groups, prep) => {
      const track = prep.track || 'misc';
      if (!groups[track]) groups[track] = [];
      groups[track].push(prep);
      return groups;
    }, {});
    
    return (
      <div className="relative">
        {Object.entries(prepsByTrack).map(([trackName, preps], trackIndex) => (
          <TrackContainer key={trackName} trackName={trackName} trackIndex={trackIndex}>
            {preps.map(prep => (
              <ProcessBlock 
                key={prep.id} 
                preparation={prep} 
                trackIndex={trackIndex}
                updatePreparation={updatePreparation}
                removePreparation={removePreparation}
                setSelectedPreparation={setSelectedPreparation}
                trackPreparations={preps} // Pass all preparations in this track for collision detection
              />
            ))}
          </TrackContainer>
        ))}
      </div>
    );
  }
  
  // Empty state for timeline
  return (
    <div className="flex items-center justify-center h-96">
      <p className="text-gray-400 text-xl">Click "+ Add Prep" to select a preparation technique</p>
    </div>
  );
};

export default TimelineContent;
