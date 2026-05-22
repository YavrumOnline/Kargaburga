import { PillToggle } from '@/app/components/PillToggle';
import { useNavigation } from '@/app/navigation/NavigationController';
import { Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';

interface IndicatorButtonProps {
  height?: number;
  onContactModeToggle?: () => void;
  onHeldChange?: (isHeld: boolean) => void;
  onAddButtonPress?: (isPressed: boolean) => void;
  isAddButtonExpanded?: boolean;
  onSlideSelect?: (index: number) => void;
  darkMode?: boolean;
  showTooltipBox?: boolean;
  showAddButtonTooltipBox?: boolean;
  addButtonRef?: React.RefObject<HTMLDivElement>;
}

export function IndicatorButton({ height = 48, onContactModeToggle, onHeldChange, onAddButtonPress, isAddButtonExpanded, onSlideSelect, darkMode, showTooltipBox, showAddButtonTooltipBox, addButtonRef }: IndicatorButtonProps) {
  const { activeTopicId, activeSlideIndexByTopic, contactView, getTopicMetadata, hasUserSwiped } = useNavigation();
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [isAddButtonBoxVisible, setIsAddButtonBoxVisible] = useState(false);

  const metadata = getTopicMetadata(activeTopicId);
  const currentSlideIndex = activeSlideIndexByTopic[activeTopicId];

  // Reset add button state when leaving courses topic
  useEffect(() => {
    if (activeTopicId !== 'courses' && isAddPressed) {
      setIsAddPressed(false);
      onAddButtonPress?.(false);
    }
  }, [activeTopicId, isAddPressed, onAddButtonPress]);

  // Animate add button appearance/disappearance
  useEffect(() => {
    if (activeTopicId === 'courses') {
      const timer = setTimeout(() => setShowAddButton(true), 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowAddButton(false), 100);
      return () => clearTimeout(timer);
    }
  }, [activeTopicId]);

  // Animate add button tooltip box appearance/disappearance
  useEffect(() => {
    if (showAddButtonTooltipBox) {
      setIsAddButtonBoxVisible(true);
    } else {
      setIsAddButtonBoxVisible(false);
    }
  }, [showAddButtonTooltipBox]);

  // When in Login topic, show nothing (Login button is in the form itself)
  if (activeTopicId === 'login') {
    return null;
  }

  // When in Contact topic, show mode toggle instead of dots
  if (activeTopicId === 'contact') {
    const label = contactView === 'info' ? 'Haritada Gör' : 'Bilgileri Gör';
    const isPressed = contactView === 'map';
    
    return (
      <div data-gesture-exclude style={{ display: 'flex', alignItems: 'center', gap: `${height * 0.25}px`, position: 'relative' }}>
        <PillToggle
          mode="action"
          label={label}
          pressed={isPressed}
          onClick={onContactModeToggle}
          height={height}
          darkMode={darkMode}
        />
      </div>
    );
  }

  // When in Courses topic, show indicator with add button on the right
  if (activeTopicId === 'courses') {
    const handleAddClick = () => {
      const newPressed = !isAddPressed;
      setIsAddPressed(newPressed);
      onAddButtonPress?.(newPressed);
    };

    return (
      <div 
        data-gesture-exclude
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${height * 0.25}px`,
          position: 'relative',
        }}
      >
        <PillToggle
          mode="indicator"
          dotsCount={metadata.slideCount}
          activeDotIndex={currentSlideIndex}
          height={height}
          onHeldChange={onHeldChange}
          onSlideSelect={onSlideSelect}
          darkMode={darkMode}
        />
        <div
          ref={addButtonRef}
          style={{
            opacity: showAddButton ? 1 : 0,
            transform: `scale(${showAddButton ? 1 : 0.5})`,
            pointerEvents: showAddButton ? 'auto' : 'none',
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <PillToggle
            mode="action"
            icon={
              <div style={{ 
                transform: isAddPressed ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Plus size={height * 0.4} strokeWidth={2.5} />
              </div>
            }
            onClick={handleAddClick}
            pressed={isAddPressed}
            height={height}
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  return (
    <div data-gesture-exclude style={{ display: 'flex', alignItems: 'center', gap: `${height * 0.25}px`, position: 'relative' }}>
      <PillToggle
        mode="indicator"
        dotsCount={metadata.slideCount}
        activeDotIndex={currentSlideIndex}
        height={height}
        onHeldChange={onHeldChange}
        onSlideSelect={onSlideSelect}
        darkMode={darkMode}
      />
    </div>
  );
}