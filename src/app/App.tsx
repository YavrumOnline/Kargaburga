import { useState, useEffect, useRef, useCallback } from 'react';
import { TopicWrapper, TopicWrapperRef } from '@/app/components/TopicWrapper';
import { GlobalGestureLayer } from '@/app/components/GlobalGestureLayer';
import { DotGrid } from '@/app/components/DotGrid';
import { Values } from '@/app/topics/Values';
import { Courses } from '@/app/topics/Courses';
import { Team } from '@/app/topics/Team';
import { Contact } from '@/app/topics/Contact';
import { Login } from '@/app/topics/Login';
import { Navbar } from '@/app/components/Navbar';
import { CaroContain, CaroContainRef } from '@/app/components/CaroContain';
import { NavigationController, useNavigation } from '@/app/navigation/NavigationController';
import { Lamine } from '@/app/components/Lamine';
import { Grain } from '@/app/components/Grain';
import { SearchToggle } from '@/app/components/SearchToggle';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';
import { findBestMatchingCourse } from '@/app/utils/courseSearch';
import logoImage from 'figma:asset/d6700bdde9369bcbe482a5c7165c7c654a42697e.png';
import {
  autocadCourse,
  revitCourse,
  maxVrayCourse,
  rhinoVrayCourse,
  grasshopperCourse,
  photoshopCourse,
  illustratorCourse,
} from '@/data/courses';

// Import team portraits for preloading
import tayfunPortrait from 'figma:asset/353f7bbc9a58d9d817acba041851e8d892982597.png';
import aybukePortrait from 'figma:asset/b17fcf59424bc06fed28c8ca6fc072e4232a7819.png';
import erkutPortrait from 'figma:asset/2a27b2f2da065602d4d833171f3af27ef8817dff.png';
import erdalPortrait from 'figma:asset/f095dff089d692b42a164aa5bdceea0da78aaed1.png';
import aliPortrait from 'figma:asset/31b0a01767073a2f31532def23b68175258757c6.png';

function AppContent() {
  const backgroundColor = LIGHT_MODE.BACKGROUND;
  const darkBackgroundColor = DARK_MODE.BACKGROUND;
  
  const {
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
    markUserHasSwiped,
    hasUserSwiped,
    hasUserPressedAddButton,
    markUserPressedAddButton,
    hasUserHeldIndicator,
    markUserHeldIndicator,
    hasUserUsedSearch,
    markUserUsedSearch,
  } = useNavigation();
  
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isLoadingScreenFading, setIsLoadingScreenFading] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showDotGrid, setShowDotGrid] = useState(false);
  const [startEntranceAnimation, setStartEntranceAnimation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [kargaSize, setKargaSize] = useState(80);
  const [isIndicatorHeld, setIsIndicatorHeld] = useState(false);
  const [isAddButtonPressed, setIsAddButtonPressed] = useState(false);
  const [lockMaxHeight, setLockMaxHeight] = useState(false);
  const [showSearchToggle, setShowSearchToggle] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const caroContainRef = useRef<CaroContainRef>(null);
  const topicWrapperRefs = useRef<Record<string, TopicWrapperRef | null>>({});
  const ariaLiveRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const searchToggleRef = useRef<HTMLDivElement>(null);
  const lastHorizontalSwipeTimeRef = useRef<number>(0);
  const HORIZONTAL_SWIPE_COOLDOWN = 400; // Reduced to match gesture cooldown
  const loadingGestureStartRef = useRef<{ x: number; y: number } | null>(null);

  // Update document title based on active topic and slide for SEO
  useEffect(() => {
    const topicTitles: Record<string, string> = {
      values: 'Kargaburga | İşin Uzmanından, İşin Kendisi',
      courses: 'Kargaburga | Kurslarımız',
      team: 'Kargaburga | Ekibimiz',
      contact: 'Kargaburga | İletişim',
      login: 'Kargaburga | Giriş',
    };

    const courseTitles: Record<string, string> = {
      0: 'AutoCAD Kursu',
      1: 'Revit Kursu',
      2: '3ds Max + V-Ray Kursu',
      3: 'Rhino + V-Ray Kursu',
      4: 'Grasshopper Kursu',
      5: 'Photoshop Kursu',
      6: 'Illustrator Kursu',
    };

    let title = topicTitles[activeTopicId] || 'Kargaburga | İşin Uzmanından, İşin Kendisi';

    if (activeTopicId === 'courses') {
      const slideIndex = activeSlideIndexByTopic[activeTopicId] || 0;
      const courseName = courseTitles[slideIndex];
      if (courseName) {
        title = `Kargaburga | ${courseName}`;
      }
    }

    document.title = title;
  }, [activeTopicId, activeSlideIndexByTopic]);

  // Function to dismiss loading screen
  const dismissLoadingScreen = useCallback(() => {
    setShowMainContent(true);
    setIsLoadingScreenFading(true);
    setTimeout(() => setShowLoadingScreen(false), 500);
    // Start entrance animations after 400ms
    setTimeout(() => setStartEntranceAnimation(true), 400);
    // Start DotGrid fade in after 600ms (after loading screen is gone)
    setTimeout(() => setShowDotGrid(true), 600);
  }, []);

  // Clear sessionStorage on mount to reset tooltip state
  useEffect(() => {
    sessionStorage.removeItem('initialTopic');
  }, []);

  // Preload team portraits and map iframe while on loading screen
  useEffect(() => {
    if (showLoadingScreen) {
      // Preload team portrait images
      const portraits = [tayfunPortrait, aybukePortrait, erkutPortrait, erdalPortrait, aliPortrait];
      portraits.forEach(src => {
        const img = new Image();
        img.src = src;
      });

      // Preload map iframes by creating hidden iframe elements
      const mapLocations = [
        { lat: 40.9903, lng: 29.0256 }, // Kadıköy
        { lat: 41.0422, lng: 29.0086 }, // Beşiktaş
        { lat: 41.0369, lng: 28.9850 }, // Taksim
        { lat: 41.0086, lng: 28.9802 }, // Sultanahmet
        { lat: 41.0244, lng: 28.9744 }, // Karaköy
      ];

      mapLocations.forEach((coords, index) => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.loading = 'eager';
        document.body.appendChild(iframe);

        // Clean up after a delay
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 5000);
      });
    }
  }, [showLoadingScreen]);

  // Course slides array for search functionality
  const courseSlides = [
    autocadCourse,
    revitCourse,
    maxVrayCourse,
    rhinoVrayCourse,
    grasshopperCourse,
    photoshopCourse,
    illustratorCourse
  ];

  // Handle search query changes
  const handleSearchChange = useCallback((query: string) => {
    if (!query || query.trim().length === 0) {
      return;
    }

    const bestMatchIndex = findBestMatchingCourse(courseSlides, query);
    
    if (bestMatchIndex !== -1 && activeTopicId === 'courses') {
      setActiveSlideForTopic('courses', bestMatchIndex);
    }
    
    // Mark user as having used search whenever they type
    markUserUsedSearch();
  }, [activeTopicId, courseSlides, setActiveSlideForTopic, markUserUsedSearch]);

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Prevent browser auto-translation
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.setAttribute('lang', 'tr');
  }, [darkMode]);

  // Reset add button state when switching topics
  useEffect(() => {
    if (isAddButtonPressed) {
      setIsAddButtonPressed(false);
    }
  }, [activeTopicId]);

  // Permanently dismiss indicator tooltip when user navigates between topics
  useEffect(() => {
    const initialTopic = sessionStorage.getItem('initialTopic');
    
    if (initialTopic === null) {
      sessionStorage.setItem('initialTopic', activeTopicId);
    } else if (initialTopic !== activeTopicId) {
      markUserHasSwiped();
    }
  }, [activeTopicId, markUserHasSwiped]);

  // Animate SearchToggle appearance
  useEffect(() => {
    if (activeTopicId === 'courses' && !isAddButtonPressed) {
      // Delay to allow for smooth entry
      const timer = setTimeout(() => setShowSearchToggle(true), 200);
      return () => clearTimeout(timer);
    } else {
      // Immediate hide for smooth exit animation
      setShowSearchToggle(false);
    }
  }, [activeTopicId, isAddButtonPressed]);

  // Permanently dismiss add button tooltip when add button is pressed
  useEffect(() => {
    if (isAddButtonPressed) {
      markUserPressedAddButton();
    }
  }, [isAddButtonPressed, markUserPressedAddButton]);

  // Permanently dismiss indicator tooltip when user holds indicator
  useEffect(() => {
    if (isIndicatorHeld) {
      markUserHeldIndicator();
    }
  }, [isIndicatorHeld, markUserHeldIndicator]);

  useEffect(() => {
    const calculateSizes = () => {
      const vwSize = window.innerWidth * 0.12;
      const vhSize = window.innerHeight * 0.08;
      setKargaSize(Math.min(vwSize, vhSize));
    };
    
    calculateSizes();
    window.addEventListener('resize', calculateSizes);
    return () => window.removeEventListener('resize', calculateSizes);
  }, []);
  
  const otherSize = kargaSize * 0.7;
  const gap = kargaSize * 0.32;
  const navbarPadding = kargaSize * 0.25;
  const navbarPaddingRight = kargaSize * 0.4;

  // Search toggle dimensions
  const searchToggleHeight = 48;
  const searchToggleGap = searchToggleHeight / 2; // Gap between search box and CaroContain

  // Announce topic changes
  useEffect(() => {
    const metadata = getTopicMetadata(activeTopicId);
    const slideIndex = activeSlideIndexByTopic[activeTopicId];
    const announcement = `${metadata.name}, slide ${slideIndex + 1} of ${metadata.slideCount}`;
    
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = announcement;
    }
  }, [activeTopicId, activeSlideIndexByTopic, getTopicMetadata]);

  // Handle add button press - expand to max height
  useEffect(() => {
    if (activeTopicId !== 'courses') return;
    
    if (isAddButtonPressed && caroContainRef.current) {
      const maxHeightVh = 70;
      const maxHeightPx = (window.innerHeight * maxHeightVh) / 100;
      caroContainRef.current.measureAndAnimate(maxHeightPx);
      setLockMaxHeight(true);
    } else if (!isAddButtonPressed) {
      setLockMaxHeight(false);
    }
  }, [isAddButtonPressed, activeTopicId]);

  // Handle snap complete from TopicWrapper
  const handleSnapComplete = useCallback((slideIndex: number, measuredHeight: number) => {
    setActiveSlideForTopic(activeTopicId, slideIndex);
    
    if (caroContainRef.current) {
      if (lockMaxHeight && activeTopicId === 'courses') {
        const maxHeightVh = 70;
        const maxHeightPx = (window.innerHeight * maxHeightVh) / 100;
        caroContainRef.current.measureAndAnimate(maxHeightPx);
        return;
      }

      const bottomPadding = 24;
      const topPadding = 12;
      const indicatorHeight = caroContainRef.current.getIndicatorHeight();
      const totalHeight = measuredHeight + indicatorHeight + bottomPadding + topPadding;
      
      caroContainRef.current.measureAndAnimate(totalHeight);
    }
  }, [activeTopicId, setActiveSlideForTopic, lockMaxHeight]);

  // Handle immediate slide change for UI updates (gradient, indicator)
  const handleSlideChange = useCallback((slideIndex: number) => {
    setActiveSlideForTopic(activeTopicId, slideIndex);
  }, [activeTopicId, setActiveSlideForTopic]);

  // Handle remeasure request from CaroContain (on resize)
  const handleRemeasureRequest = useCallback(() => {
    if (activeTopicId === 'courses' && isAddButtonPressed && caroContainRef.current) {
      const maxHeightVh = 70;
      const maxHeightPx = (window.innerHeight * maxHeightVh) / 100;
      caroContainRef.current.measureAndAnimate(maxHeightPx);
      return;
    }

    const activeTopicRef = topicWrapperRefs.current[activeTopicId];
    if (activeTopicRef) {
      activeTopicRef.remeasureCurrentSlide();
    }
  }, [activeTopicId, isAddButtonPressed]);

  // Handle Contact mode toggle
  const handleContactModeToggle = useCallback(() => {
    if (activeTopicId !== 'contact') return;
    
    const newMode = contactView === 'info' ? 'map' : 'info';
    setContactView(newMode);
    
    const contactRef = topicWrapperRefs.current['contact'];
    if (contactRef) {
      requestAnimationFrame(() => {
        contactRef.remeasureCurrentSlide();
      });
    }
  }, [activeTopicId, contactView, setContactView]);

  // Global gesture handlers
  const handleHorizontalSwipeLeft = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastHorizontalSwipeTimeRef.current < HORIZONTAL_SWIPE_COOLDOWN) {
      return;
    }
    lastHorizontalSwipeTimeRef.current = currentTime;

    const activeTopicRef = topicWrapperRefs.current[activeTopicId];
    
    if (activeTopicRef) {
      activeTopicRef.scrollNext();
      markUserHasSwiped();
    }
  }, [activeTopicId, markUserHasSwiped]);

  const handleHorizontalSwipeRight = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastHorizontalSwipeTimeRef.current < HORIZONTAL_SWIPE_COOLDOWN) {
      return;
    }
    lastHorizontalSwipeTimeRef.current = currentTime;

    const activeTopicRef = topicWrapperRefs.current[activeTopicId];
    
    if (activeTopicRef) {
      activeTopicRef.scrollPrev();
      markUserHasSwiped();
    }
  }, [activeTopicId, markUserHasSwiped]);

  const handleVerticalSwipeUp = useCallback(() => {
    navigateToNextTopic();
    markUserHasSwiped();
  }, [navigateToNextTopic, markUserHasSwiped]);

  const handleVerticalSwipeDown = useCallback(() => {
    navigateToPrevTopic();
    markUserHasSwiped();
  }, [navigateToPrevTopic, markUserHasSwiped]);

  const handleLoginSubmit = useCallback(() => {
  }, []);

  // Render active topic content
  const renderTopicContent = () => {
    const targetSlideIndex = activeSlideIndexByTopic[activeTopicId];

    switch (activeTopicId) {
      case 'values':
        return (
          <TopicWrapper
            ref={(ref) => { topicWrapperRefs.current['values'] = ref; }}
            topicId="values"
            isActive={true}
            targetSlideIndex={targetSlideIndex}
            onSnapComplete={handleSnapComplete}
            onSlideChange={handleSlideChange}
            isDraggingDisabled={isIndicatorHeld}
          >
            <Values darkMode={darkMode} />
          </TopicWrapper>
        );
      case 'courses':
        return (
          <TopicWrapper
            ref={(ref) => { topicWrapperRefs.current['courses'] = ref; }}
            topicId="courses"
            isActive={true}
            targetSlideIndex={targetSlideIndex}
            onSnapComplete={handleSnapComplete}
            onSlideChange={handleSlideChange}
            isDraggingDisabled={isIndicatorHeld}
          >
            <Courses darkMode={darkMode} isAddButtonPressed={isAddButtonPressed} />
          </TopicWrapper>
        );
      case 'team':
        return (
          <TopicWrapper
            ref={(ref) => { topicWrapperRefs.current['team'] = ref; }}
            topicId="team"
            isActive={true}
            targetSlideIndex={targetSlideIndex}
            onSnapComplete={handleSnapComplete}
            onSlideChange={handleSlideChange}
            isDraggingDisabled={isIndicatorHeld}
          >
            <Team darkMode={darkMode} />
          </TopicWrapper>
        );
      case 'contact':
        return (
          <TopicWrapper
            ref={(ref) => { topicWrapperRefs.current['contact'] = ref; }}
            topicId="contact"
            isActive={true}
            targetSlideIndex={targetSlideIndex}
            onSnapComplete={handleSnapComplete}
            onSlideChange={handleSlideChange}
            isDraggingDisabled={isIndicatorHeld}
          >
            <Contact darkMode={darkMode} />
          </TopicWrapper>
        );
      case 'login':
        return (
          <TopicWrapper
            ref={(ref) => { topicWrapperRefs.current['login'] = ref; }}
            topicId="login"
            isActive={true}
            targetSlideIndex={targetSlideIndex}
            onSnapComplete={handleSnapComplete}
            onSlideChange={handleSlideChange}
            isDraggingDisabled={isIndicatorHeld}
          >
            <Login darkMode={darkMode} />
          </TopicWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Loading screen - positioned OUTSIDE GlobalGestureLayer */}
      {showLoadingScreen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            dismissLoadingScreen();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            loadingGestureStartRef.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerMove={(e) => {
            if (!loadingGestureStartRef.current) return;
            
            e.stopPropagation();
            e.preventDefault();
            
            const deltaX = Math.abs(e.clientX - loadingGestureStartRef.current.x);
            const deltaY = Math.abs(e.clientY - loadingGestureStartRef.current.y);
            
            // If user has moved more than 10px in any direction, dismiss
            if (deltaX > 10 || deltaY > 10) {
              dismissLoadingScreen();
              loadingGestureStartRef.current = null;
            }
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            e.preventDefault();
            loadingGestureStartRef.current = null;
          }}
          onPointerCancel={(e) => {
            e.stopPropagation();
            e.preventDefault();
            loadingGestureStartRef.current = null;
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: LIGHT_MODE.BACKGROUND,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            zIndex: 10000,
            opacity: isLoadingScreenFading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: isLoadingScreenFading ? 'none' : 'auto',
            cursor: 'pointer',
            touchAction: 'none',
          }}
        >
          {/* Lamine gradient overlay - visible version for loading screen */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
              backgroundImage: `
                radial-gradient(at 20% 30%, rgba(80, 25, 0, 0.15) 0px, transparent 50%),
                radial-gradient(at 70% 40%, rgba(255, 120, 0, 0.15) 0px, transparent 55%),
                radial-gradient(at 45% 80%, rgba(255, 200, 100, 0.12) 0px, transparent 50%)
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grain />
          <DotGrid darkMode={false} activeTopicId="values" />
          <img
            src={logoImage}
            alt="Kargaburga Logo"
            style={{
              height: '15vh',
              width: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          />
          <p
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#3A3A3A',
              textAlign: 'center',
              maxWidth: '600px',
              padding: '0 2rem',
              position: 'relative',
              zIndex: 1,
              lineHeight: '1.6',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '16px' }}>Kargaburga'ya Hoş Geldiniz!</strong>
            Eğitimlerimiz, dünya çapındaki projelerin tasarım ve uygulama süreçlerini yöneten uzmanlar tarafından doğrudan sahadaki tecrübeyle verilmektedir. Bizimle sadece bir katılım belgesi değil; profesyonel birikiminizle örtüşen gerçek bir yetkinlik kazanırsınız.
          </p>
        </div>
      )}
      
      {/* Main app content - wrapped in GlobalGestureLayer */}
      <div style={{
        opacity: showMainContent ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: showMainContent ? 'auto' : 'none',
      }}>
        <GlobalGestureLayer
          onHorizontalSwipeLeft={handleHorizontalSwipeLeft}
          onHorizontalSwipeRight={handleHorizontalSwipeRight}
          onVerticalSwipeUp={handleVerticalSwipeUp}
          onVerticalSwipeDown={handleVerticalSwipeDown}
          isEnabled={showMainContent}
          isGestureBlocked={isIndicatorHeld}
          isVerticalGestureBlocked={isAddButtonPressed}
        >
          <div 
            className="relative min-h-screen w-full" 
            translate="no"
            lang="tr"
            style={{ 
              backgroundColor: darkMode ? darkBackgroundColor : backgroundColor,
              transition: 'background-color 0.5s ease-in-out',
              pointerEvents: 'auto',
            }}
          >
            <Navbar 
              kargaSize={kargaSize}
              otherSize={otherSize}
              gap={gap}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              padding={navbarPadding}
              paddingRight={navbarPaddingRight}
              startEntranceAnimation={startEntranceAnimation}
            />

            {/* Content area */}
            <div 
              className="fixed inset-0 flex flex-col items-center justify-center" 
              style={{ 
                zIndex: 2, 
                pointerEvents: 'none',
                paddingTop: `${(kargaSize + navbarPadding * 2) / 2}px`,
                paddingBottom: `${(kargaSize + navbarPadding * 2) / 2}px`,
              }}
            >
              {/* Backdrop for click-outside detection - only when search is expanded */}
              {activeTopicId === 'courses' && showSearchToggle && isSearchExpanded && (
                <div 
                  onClick={() => {
                    // Call the collapse function stored on window
                    if ((window as any).__searchToggleCollapse) {
                      (window as any).__searchToggleCollapse();
                    }
                  }}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 19,
                    pointerEvents: 'auto',
                    cursor: 'default',
                  }}
                />
              )}

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto', position: 'relative' }}>
                <div style={{
                  opacity: startEntranceAnimation ? 1 : 0,
                  transition: 'opacity 400ms ease-out 1200ms',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <CaroContain
                    ref={caroContainRef}
                    minHeightPx={kargaSize}
                    maxHeightVh={70}
                    activeTopicId={activeTopicId}
                    darkMode={darkMode}
                    showIndicatorTooltipBox={!hasUserSwiped && !hasUserHeldIndicator && !isIndicatorHeld && activeTopicId !== 'login' && activeTopicId !== 'contact'}
                    showAddButtonTooltipBox={activeTopicId === 'courses' && !hasUserPressedAddButton && showSearchToggle}
                    addButtonRef={addButtonRef}
                    onAnimationStart={() => {
                      setIsHeightAnimating(true);
                    }}
                    onAnimationEnd={() => {
                      setIsHeightAnimating(false);
                    }}
                    onRemeasureRequest={handleRemeasureRequest}
                    onContactModeToggle={handleContactModeToggle}
                    onLoginSubmit={handleLoginSubmit}
                    onVerticalNavigateNext={navigateToNextTopic}
                    onVerticalNavigatePrev={navigateToPrevTopic}
                    onIndicatorHeldChange={setIsIndicatorHeld}
                    onAddButtonPress={setIsAddButtonPressed}
                    isAddButtonExpanded={isAddButtonPressed}
                    disableVerticalNavigation={isAddButtonPressed}
                    onSlideSelect={(index) => {
                      const wrapperRef = topicWrapperRefs.current[activeTopicId];
                      if (wrapperRef) {
                        wrapperRef.scrollToSlide(index);
                      }
                    }}
                  >
                    {renderTopicContent()}
                  </CaroContain>

                  {/* Search Toggle - positioned above CaroContain bottom */}
                  {(activeTopicId === 'courses') && (
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: `translateX(-50%) scale(${showSearchToggle ? 1 : 0.8})`,
                        marginBottom: `${showSearchToggle ? searchToggleGap : searchToggleGap * 0.5}px`,
                        zIndex: 20,
                        pointerEvents: showSearchToggle ? 'auto' : 'none',
                        opacity: showSearchToggle ? 1 : 0,
                        transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), margin-bottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      <SearchToggle 
                        height={searchToggleHeight} 
                        darkMode={darkMode}
                        onExpandedChange={setIsSearchExpanded}
                        onRequestCollapse={() => {}}
                        onSearchChange={handleSearchChange}
                        ref={searchToggleRef}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Aria-live region for announcements */}
            <div
              ref={ariaLiveRef}
              aria-live="polite"
              aria-atomic="true"
              style={{
                position: 'absolute',
                left: '-10000px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
              }}
            />
          </div>
          <Lamine />
          <Grain />
        </GlobalGestureLayer>
      </div>
      
      {/* DotGrid outside main content wrapper to avoid opacity inheritance */}
      {!showLoadingScreen && (
        <div
          style={{
            opacity: showDotGrid ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            pointerEvents: 'none',
          }}
        >
          <DotGrid darkMode={darkMode} activeTopicId={activeTopicId} />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <NavigationController>
      <AppContent />
    </NavigationController>
  );
}