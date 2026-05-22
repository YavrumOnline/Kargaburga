import { MasterToggle } from '@/app/components/MasterToggle';
import { Bird, GraduationCap, Users, MapPin, LogIn, Sun, Moon } from 'lucide-react';
import { useNavigation, TopicId } from '@/app/navigation/NavigationController';
import { TOPIC_THEME_COLORS, TOPIC_LIGHT_COLORS } from '@/constants/colors';
import logoImage from 'figma:asset/d6700bdde9369bcbe482a5c7165c7c654a42697e.png';

interface NavbarProps {
  kargaSize: number;
  otherSize: number;
  gap: number;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  padding: number;
  paddingRight: number;
  startEntranceAnimation: boolean;
}

const TOPIC_ICON_MAP: Record<TopicId, React.ComponentType<any>> = {
  values: Bird,
  courses: GraduationCap,
  team: Users,
  contact: MapPin,
  login: LogIn,
};

export function Navbar({ 
  kargaSize, 
  otherSize, 
  gap, 
  darkMode, 
  setDarkMode,
  padding,
  paddingRight,
  startEntranceAnimation
}: NavbarProps) {
  const { activeTopicId, navigateToTopic } = useNavigation();
  const groupStyle = { gap: `${gap}px` };
  
  const mainTopics: TopicId[] = ['values', 'courses', 'team', 'contact'];
  
  // Icon colors - default black for light mode, white for dark mode
  const defaultIconColor = darkMode ? '#FFFFFF' : '#000000';
  
  // Icon style with transition
  const iconStyleWithTransition = { 
    width: '45%', 
    height: '45%',
    transition: 'color 0.5s ease-in-out',
  };
  
  return (
    <header 
      data-gesture-exclude
      className="flex items-center justify-between"
      style={{ 
        gap: `${gap}px`,
        paddingTop: `${padding}px`,
        paddingBottom: `${padding}px`,
        paddingLeft: `${padding}px`,
        paddingRight: `${paddingRight}px`,
        maxWidth: '100vh',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="flex items-center" style={groupStyle}>
        {mainTopics.map((topicId, index) => {
          // Animation delay: each button starts 200ms after the previous
          const delayMs = index * 200;
          const animationStyle = {
            opacity: startEntranceAnimation ? 1 : 0,
            transition: `opacity 400ms ease-out ${delayMs}ms`,
          };
          
          // Special handling for the first item (values/logo)
          if (index === 0) {
            const size = kargaSize;
            const isActive = activeTopicId === topicId;
            
            return (
              <div key={topicId} style={animationStyle}>
                <MasterToggle 
                  size={size}
                  icon={
                    <img 
                      src={logoImage} 
                      alt="Logo" 
                      style={{ 
                        width: '60%', 
                        height: '60%',
                        objectFit: 'contain',
                        filter: (darkMode || isActive) ? 'invert(1)' : 'none',
                        transition: 'filter 0.5s ease-in-out',
                      }} 
                    />
                  }
                  isActive={isActive}
                  onClick={() => navigateToTopic(topicId)}
                  glowColor={TOPIC_THEME_COLORS[topicId]}
                  darkMode={darkMode}
                />
              </div>
            );
          }
          
          // All other items remain the same
          const Icon = TOPIC_ICON_MAP[topicId];
          const size = otherSize;
          const isActive = activeTopicId === topicId;
          const iconColor = isActive ? TOPIC_LIGHT_COLORS[topicId] : defaultIconColor;
          
          return (
            <div key={topicId} style={animationStyle}>
              <MasterToggle 
                size={size}
                icon={<Icon style={iconStyleWithTransition} color={iconColor} />}
                isActive={isActive}
                onClick={() => navigateToTopic(topicId)}
                glowColor={TOPIC_THEME_COLORS[topicId]}
                darkMode={darkMode}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center" style={groupStyle}>
        {/* Login button - index 4 (800ms delay) */}
        <div style={{
          opacity: startEntranceAnimation ? 1 : 0,
          transition: 'opacity 400ms ease-out 800ms',
        }}>
          <MasterToggle 
            size={otherSize}
            icon={<LogIn style={iconStyleWithTransition} color={activeTopicId === 'login' ? TOPIC_LIGHT_COLORS.login : defaultIconColor} />}
            isActive={activeTopicId === 'login'}
            onClick={() => navigateToTopic('login')}
            glowColor={TOPIC_THEME_COLORS.login}
            darkMode={darkMode}
          />
        </div>
        {/* Dark mode toggle - index 5 (1000ms delay) */}
        <div style={{
          opacity: startEntranceAnimation ? 1 : 0,
          transition: 'opacity 400ms ease-out 1000ms',
        }}>
          <MasterToggle 
            size={otherSize}
            icon={darkMode ? <Moon style={iconStyleWithTransition} color={darkMode ? '#FFFFFF' : defaultIconColor} /> : <Sun style={iconStyleWithTransition} color={darkMode ? '#FFFFFF' : defaultIconColor} />}
            isActive={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            glowColor="#FFFFFF"
            darkMode={darkMode}
          />
        </div>
      </div>
    </header>
  );
}