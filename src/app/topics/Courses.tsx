import { useEffect, useState } from 'react';
import {
  autocadCourse,
  revitCourse,
  maxVrayCourse,
  rhinoVrayCourse,
  grasshopperCourse,
  photoshopCourse,
  illustratorCourse
} from '@/data/courses';
import { SlideContainer } from '@/app/components/SlideContainer';
import { PriceToggle } from '@/app/components/PriceToggle';
import { TRANSITIONS } from '@/constants/styles';

export function Courses({
  darkMode,
  isAddButtonPressed,
  onContentSwapped,
}: {
  darkMode?: boolean;
  isAddButtonPressed?: boolean;
  onContentSwapped?: () => void;
}) {
  // Crossfade between the short description and the full curriculum instead
  // of an instant swap. `displayedPressed` lags behind the real prop during
  // the fade-out half of the transition, so the OLD content (and its layout:
  // padding/maxWidth) stays on screen, fading to opacity 0, before we swap to
  // the NEW content and fade it back in.
  const [displayedPressed, setDisplayedPressed] = useState(isAddButtonPressed);
  const [contentOpacity, setContentOpacity] = useState(1);
  const FADE_MS = 250;

  useEffect(() => {
    if (isAddButtonPressed === displayedPressed) return;

    setContentOpacity(0);

    const swapTimer = setTimeout(() => {
      setDisplayedPressed(isAddButtonPressed);
      // Double rAF: guarantees the browser has painted the opacity:0 state
      // from the swap before we flip to opacity:1, so the fade-in transition
      // actually has something to animate from instead of the two style
      // changes getting batched into a single, invisible jump. This also
      // means the new content has definitely been committed to the DOM by
      // this point, which is why onContentSwapped (the height remeasure
      // trigger) lives here too rather than right after setDisplayedPressed -
      // calling it too early would just re-measure the old, not-yet-replaced
      // content.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setContentOpacity(1);
          onContentSwapped?.();
        });
      });
    }, FADE_MS);

    return () => clearTimeout(swapTimer);
  }, [isAddButtonPressed, displayedPressed]);

  const slides = [
    autocadCourse,
    revitCourse,
    maxVrayCourse,
    rhinoVrayCourse,
    grasshopperCourse,
    photoshopCourse,
    illustratorCourse
  ];

  const textColor = darkMode ? '#FFFFFF' : '#000000';

  return (
    <>
      {slides.map((slide, index) => (
        <SlideContainer
          key={index}
          padding={displayedPressed ? '0' : '2rem'}
        >
          <div
            style={{
              maxWidth: displayedPressed ? '100%' : '42rem',
              width: '100%',
              opacity: contentOpacity,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          >
            {!displayedPressed && (
              <>
                <h2
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: textColor,
                    textAlign: 'center',
                    transition: TRANSITIONS.COLOR_OPACITY,
                    opacity: 1,
                  }}
                >
                  {slide.title.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </h2>
                <div
                  style={{
                    fontSize: '14px',
                    color: textColor,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    marginBottom: '1rem',
                    transition: TRANSITIONS.COLOR_OPACITY,
                    opacity: 1,
                  }}
                >
                  <span>{slide.duration}</span>
                  <PriceToggle 
                    online={slide.price.online}
                    örgün={slide.price.örgün}
                    textColor={textColor}
                    darkMode={darkMode}
                  />
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: textColor,
                    textAlign: 'center',
                    maxWidth: '38rem',
                    margin: '0 auto',
                    transition: TRANSITIONS.COLOR_OPACITY,
                    opacity: 1,
                  }}
                >
                  {slide.body}
                </p>
              </>
            )}

            {/* Müfredat Section - Only show when + button is pressed and curriculum exists */}
            {displayedPressed && slide.curriculum && (
              <div
                className="curriculum-scroll"
                style={{
                  margin: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '0',
                  paddingBottom: '2rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  borderRadius: '16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  transition: 'all 0.5s ease-in-out, opacity 0.5s ease-in-out',
                  opacity: 1,
                  maxHeight: 'calc(70vh - 8rem)',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {slide.curriculum.weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: textColor,
                        marginBottom: '0.75rem',
                        transition: TRANSITIONS.COLOR,
                      }}
                    >
                      {week.title}
                    </h4>

                    {week.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        style={{
                          marginBottom: '1rem',
                        }}
                      >
                        <h5
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: textColor,
                            marginBottom: '0.5rem',
                            transition: TRANSITIONS.COLOR,
                          }}
                        >
                          {lesson.title}
                        </h5>
                        <ul
                          style={{
                            fontSize: '11px',
                            color: textColor,
                            paddingLeft: '1.25rem',
                            margin: 0,
                            lineHeight: 1.6,
                            opacity: 0.8,
                            transition: TRANSITIONS.COLOR,
                          }}
                        >
                          {lesson.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} style={{ marginBottom: '0.25rem' }}>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </SlideContainer>
      ))}
    </>
  );
}