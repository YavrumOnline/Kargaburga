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
import { getHeadingStyle, getBodyTextStyle, TRANSITIONS } from '@/constants/styles';

export function Courses({ darkMode, isAddButtonPressed }: { darkMode?: boolean; isAddButtonPressed?: boolean }) {
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
          padding={isAddButtonPressed ? '0' : '2rem'}
        >
          <div style={{ maxWidth: isAddButtonPressed ? '100%' : '42rem', width: '100%' }}>
            {!isAddButtonPressed && (
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
            {isAddButtonPressed && slide.curriculum && (
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