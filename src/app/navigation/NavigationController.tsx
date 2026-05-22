import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type TopicId = 'values' | 'courses' | 'team' | 'contact' | 'login';

interface TopicMetadata {
  name: string;
  slideCount: number;
}

interface NavigationContextType {
  activeTopicId: TopicId;
  activeSlideIndexByTopic: Record<TopicId, number>;
  setActiveSlideForTopic: (topicId: TopicId, slideIndex: number) => void;
  isHeightAnimating: boolean;
  setIsHeightAnimating: (animating: boolean) => void;
  getTopicMetadata: (topicId: TopicId) => TopicMetadata;
  contactView: 'info' | 'map';
  setContactView: (view: 'info' | 'map') => void;
  navigateToNextTopic: () => void;
  navigateToPrevTopic: () => void;
  setActiveTopicId: (topicId: TopicId) => void;
  navigateToTopic: (topicId: TopicId) => void;
  hasUserSwiped: boolean;
  markUserHasSwiped: () => void;
  hasUserPressedAddButton: boolean;
  markUserPressedAddButton: () => void;
  hasUserHeldIndicator: boolean;
  markUserHeldIndicator: () => void;
  hasUserUsedSearch: boolean;
  markUserUsedSearch: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const TOPIC_ORDER: TopicId[] = ['values', 'courses', 'team', 'contact', 'login'];

const TOPIC_METADATA: Record<TopicId, TopicMetadata> = {
  values: { name: 'İşin Uzmanından, İşin Kendisi', slideCount: 6 },
  courses: { name: 'Kurslar', slideCount: 7 },
  team: { name: 'Ekibimiz', slideCount: 5 },
  contact: { name: 'İletişim', slideCount: 1 },
  login: { name: 'Giriş', slideCount: 1 },
};

export function NavigationController({ children }: { children: ReactNode }) {
  const [activeTopicId, setActiveTopicId] = useState<TopicId>('values');
  const [activeSlideIndexByTopic, setActiveSlideIndexByTopic] = useState<Record<TopicId, number>>({
    values: 0,
    courses: 0,
    team: 0,
    contact: 0,
    login: 0,
  });
  const [isHeightAnimating, setIsHeightAnimating] = useState(false);
  const [contactView, setContactView] = useState<'info' | 'map'>('info');
  const [hasUserSwiped, setHasUserSwiped] = useState(false);
  const [hasUserPressedAddButton, setHasUserPressedAddButton] = useState(false);
  const [hasUserHeldIndicator, setHasUserHeldIndicator] = useState(false);
  const [hasUserUsedSearch, setHasUserUsedSearch] = useState(false);

  const setActiveSlideForTopic = useCallback((topicId: TopicId, slideIndex: number) => {
    setActiveSlideIndexByTopic((prev) => ({
      ...prev,
      [topicId]: slideIndex,
    }));
  }, []);

  const getTopicMetadata = useCallback((topicId: TopicId): TopicMetadata => {
    return TOPIC_METADATA[topicId];
  }, []);

  const navigateToNextTopic = useCallback(() => {
    const currentIndex = TOPIC_ORDER.indexOf(activeTopicId);
    const nextIndex = (currentIndex + 1) % TOPIC_ORDER.length; // Loop back to first
    const nextTopic = TOPIC_ORDER[nextIndex];
    setActiveTopicId(nextTopic);
  }, [activeTopicId]);

  const navigateToPrevTopic = useCallback(() => {
    const currentIndex = TOPIC_ORDER.indexOf(activeTopicId);
    const prevIndex = (currentIndex - 1 + TOPIC_ORDER.length) % TOPIC_ORDER.length; // Loop back to last
    const prevTopic = TOPIC_ORDER[prevIndex];
    setActiveTopicId(prevTopic);
  }, [activeTopicId]);

  const navigateToTopic = useCallback((topicId: TopicId) => {
    setActiveTopicId(topicId);
  }, []);

  const markUserHasSwiped = useCallback(() => {
    setHasUserSwiped(true);
  }, []);

  const markUserPressedAddButton = useCallback(() => {
    setHasUserPressedAddButton(true);
  }, []);

  const markUserHeldIndicator = useCallback(() => {
    setHasUserHeldIndicator(true);
  }, []);

  const markUserUsedSearch = useCallback(() => {
    setHasUserUsedSearch(true);
  }, []);

  const value: NavigationContextType = {
    activeTopicId,
    activeSlideIndexByTopic,
    setActiveSlideForTopic,
    isHeightAnimating,
    setIsHeightAnimating,
    getTopicMetadata,
    contactView,
    setContactView,
    navigateToNextTopic,
    navigateToPrevTopic,
    setActiveTopicId,
    navigateToTopic,
    hasUserSwiped,
    markUserHasSwiped,
    hasUserPressedAddButton,
    markUserPressedAddButton,
    hasUserHeldIndicator,
    markUserHeldIndicator,
    hasUserUsedSearch,
    markUserUsedSearch,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationController');
  }
  return context;
}