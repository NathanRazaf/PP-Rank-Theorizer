import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import osuStdImg from "@/assets/gamemodes/mode-osu@2x.png";
import osuTaikoImg from "@/assets/gamemodes/mode-taiko@2x.png";
import osuCatchImg from "@/assets/gamemodes/mode-fruits@2x.png";
import osuManiaImg from "@/assets/gamemodes/mode-mania@2x.png";
import {Tooltip} from "react-tooltip";

// Types for game modes
export type GameMode = "osu" | "taiko" | "catch" | "mania";



// Enhanced function to get CSS filter for a given hue
function getHueFilter(baseHue: number) {
  // Normalize hue value to 0-360 range
  const hue = ((baseHue % 360) + 360) % 360;

  // First, invert the white to get a base that can be colored
  const baseFilter = "invert(1)";

  // Then apply hue rotation and other adjustments based on the target hue
  return `${baseFilter} sepia(1) saturate(10000%) hue-rotate(${hue}deg) brightness(1.8) drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5))`;
}

interface GameModeTabProps {
  onModeChange?: (mode: GameMode) => void;
  activeMode?: GameMode;
  preferredMode: GameMode;
}

function GameModeTab({ onModeChange, activeMode = "osu", preferredMode }: GameModeTabProps) {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // State to store the current base hue
  const [baseHue, setBaseHue] = useState(0);

  // State to track which icon is being hovered
  const [hoveredMode, setHoveredMode] = useState<GameMode | null>(null);

  // Function to get the current base hue from CSS variable
  const getBaseHueFromCSS = () => {
    const hueValue = getComputedStyle(document.documentElement)
        .getPropertyValue('--base-hue').trim();
    return parseInt(hueValue) || 0;
  };

  // Set up the initial hue and a MutationObserver to watch for CSS variable changes
  useEffect(() => {
    // Set initial hue
    const initialHue = getBaseHueFromCSS();
    setBaseHue(initialHue);

    // Function to check for hue changes
    const checkHueChange = () => {
      const newHue = getBaseHueFromCSS();
      if (newHue !== baseHue) {
        setBaseHue(newHue);
      }
    };

    // Create a MutationObserver to watch for style attribute changes
    const observer = new MutationObserver(checkHueChange);

    // Start observing the document's root element for attribute changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    // Also set up an interval as a fallback for other methods of CSS variable changes
    const intervalId = setInterval(checkHueChange, 1000);

    // Cleanup function
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [baseHue]);

  // Handle game mode switching
  const handleModeClick = (mode: GameMode) => {
    if (onModeChange) {
      onModeChange(mode);
    }

    if (username) {
      navigate(`/users/${username}/${mode}`);
    }
  };

  // Get style for game mode icons based on active state and hover state
  const getModeStyle = (mode: GameMode) => {
    // Base CSS styles for all states
    const baseStyles = {
      cursor: 'pointer',
    };

    // Determine the filter value based on active and hover states
    const filterValue =
        // If this is the active mode or being hovered, remove the color filter
        (activeMode === mode || hoveredMode === mode)
            ? 'drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5))'
            // Otherwise apply the hue filter
            : getHueFilter(baseHue);

    return {
      ...baseStyles,
      filter: filterValue
    };
  };

  const GameModeItem = ({ mode, img } : {mode: GameMode, img: string }) => {
    // Determine if this icon should show in original color (white)
    const isOriginalColor = activeMode === mode || hoveredMode === mode;

    return (

        <div className="flex flex-row gap-1 items-center relative">
          <Tooltip id={`${mode}-tab-tooltip`} opacity={1} className="z-20" style={{ backgroundColor: "var(--dropdown-bg)", padding: "5px 20px 5px 20px"}} />
          <img
              src={img}
              alt={`osu!${mode}`}
                data-tooltip-id={`${mode}-tab-tooltip`}
                data-tooltip-content={mode === "osu" ? "osu!" : `osu!${mode}`}
                data-tooltip-place="top"
              className="w-7 h-7 z-10"
              style={getModeStyle(mode)}
              onClick={() => handleModeClick(mode)}
              onMouseEnter={() => setHoveredMode(mode)}
              onMouseLeave={() => setHoveredMode(null)}
          />
          {mode === preferredMode && (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="absolute top-1 -right-6 w-5 h-5"
                  style={{
                    fill: isOriginalColor ? '#ffffff' : `hsl(${baseHue}, 100%, 70%)`,
                    transition: 'all 0.3s ease-in-out',
                    filter: 'drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5))'
                  }}
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
              </svg>
          )}
        </div>
    );
  }


  return (
      <div className="flex flex-row gap-10 bg-osu-bg-2 rounded-3xl p-2 px-10 mt-2 mb-2">
        <GameModeItem mode={"osu"} img={osuStdImg}/>
        <GameModeItem mode={"taiko"} img={osuTaikoImg}/>
        <GameModeItem mode={"catch"} img={osuCatchImg}/>
        <GameModeItem mode={"mania"} img={osuManiaImg}/>
      </div>
  );
}

export default GameModeTab;