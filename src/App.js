import React, { useState, useEffect } from 'react';
import './App.css';
import 'typeface-roboto';
const colors = {
  lightcoral: [240, 128, 128],
  aqua: [0, 255, 255],
  plum: [221, 160, 221],
  peachpuff: [255, 190, 150],
  palegoldenrod: [225, 215, 120],
  lavenderblush: [255, 230, 235],
  skyblue: [120, 200, 235],
  mistyrose: [255, 190, 185],
  cornsilk: [255, 240, 200],
  powderblue: [160, 200, 220],
  thistle: [195, 160, 195],
};

const adjustColor = (color, brightness, saturation) => {


  const hsl = rgbToHsl(color[0], color[1], color[2]);

  // Adjust brightness and saturation
  hsl[1] = Math.min(1, hsl[1] * saturation);
  hsl[2] = Math.min(1, hsl[2] * brightness);

  const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  return [h, s, l];
};

const hslToRgb = (h, s, l) => {
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const getMidColor = (startColor, endColor) => {
  const midColor = colors[startColor].map((c1, index) => {
    const c2 = colors[endColor][index];
    return Math.floor((c1 + c2) / 2);
  });

  return midColor;
};

const App = () => {
  const [colors, setColors] = useState({
    startColor: 'lightcoral',
    endColor: 'aqua',
    midColor: getMidColor('lightcoral', 'aqua'),
  });
  const basecolors = {
    lightcoral: [240, 128, 128],
    aqua: [0, 255, 255],
    plum: [221, 160, 221],
    peachpuff: [255, 190, 150],
    palegoldenrod: [225, 215, 120],
    lavenderblush: [255, 230, 235],
    skyblue: [120, 200, 235],
    mistyrose: [255, 190, 185],
    cornsilk: [255, 240, 200],
    powderblue: [160, 200, 220],
    thistle: [195, 160, 195],
  };


  useEffect(() => {
    const darkerStartColor = adjustColor(basecolors[colors.startColor], 0.7, 1.2);
    const lighterEndColor = adjustColor(basecolors[colors.endColor], 1.2, 1);
    const midColor = adjustColor(getMidColor(colors.startColor, colors.endColor), 1.2, 1.2);
    document.documentElement.style.setProperty('--start-color', lighterEndColor);
    document.documentElement.style.setProperty('--mid-color', midColor);
    document.documentElement.style.setProperty('--end-color', darkerStartColor);
  }, [colors.startColor, colors.endColor]);

  const handleColorChange = (event) => {
    const { name, value } = event.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <div className="title">
        <h1>THOUGHTS</h1>
      </div>
      <svg className="svg-gradient">
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              className="start"
              offset="0%"
              stopColor="var(--start-color)"
            ></stop>
            <stop
              className="mid"
              offset="50%"
              stopColor="var(--mid-color)"
            ></stop>
            <stop
              className="end"
              offset="100%"
              stopColor="var(--end-color)"
            ></stop>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
      </svg>
      <div className="dropdown-container">
        <p>
          What does
          <select
            className="color-dropdown"
            name="startColor"
            value={colors.startColor}
            onChange={handleColorChange}
          >
            <option value="lightcoral">Light Coral</option>
            <option value="aqua">Aqua</option>
            <option value="plum">Plum</option>
            <option value="peachpuff">Peach Puff</option>
            <option value="palegoldenrod">Pale Goldenrod</option>
            <option value="lavenderblush">Lavender Blush</option>
            <option value="skyblue">Sky Blue</option>
            <option value="mistyrose">Misty Rose</option>
            <option value="cornsilk">Cornsilk</option>
            <option value="powderblue">Powder Blue</option>
            <option value="thistle">Thistle</option>

          </select>
          think about
          <select
            className="color-dropdown"
            name="endColor"
            value={colors.endColor}
            onChange={handleColorChange}
          >
            <option value="lightcoral">Light Coral</option>
            <option value="aqua">Aqua</option>
            <option value="plum">Plum</option>
            <option value="peachpuff">Peach Puff</option>
            <option value="palegoldenrod">Pale Goldenrod</option>
            <option value="lavenderblush">Lavender Blush</option>
            <option value="skyblue">Sky Blue</option>
            <option value="mistyrose">Misty Rose</option>
            <option value="cornsilk">Cornsilk</option>
            <option value="powderblue">Powder Blue</option>
            <option value="thistle">Thistle</option>

          </select>
          ?
        </p>
      </div>

    </div>
  );
};

export default App;

