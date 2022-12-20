/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

const [WIDTH, HEIGHT] = [2, 2];

function App() {
  const [cells, setCells] = useState([]);
  const container = useRef();

  useEffect(() => {
    const { x, y, bottom, height, width } =
      container.current.getBoundingClientRect();

    const initial = [
      [x, bottom],
      [x + width, y + height],
      [x + width / 2, y],
    ];

    setCells((prev) => prev.concat(initial));

    const addCell = (count, c, index = 0) => {
      if (count === 0) return;
      const to = randomInRange(0, 2);
      const current = midPoint(c, initial[to]);
      setCells((prev) => prev.concat([current]));
      return addCell(count - 1, current, index + 1);
    };

    const start = [randomInRange(x, width), randomInRange(y + width, height)];
    addCell(5000, start);
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="h-[500px] w-[500px]" ref={container}>
        {cells.map(([x, y], i) => (
          <Cell
            top={y - HEIGHT / 2}
            left={x - WIDTH / 2}
            width={WIDTH}
            height={HEIGHT}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

const Cell = ({ top, left, width, height }) => (
  <div
    className="absolute bg-red-500"
    style={{
      top,
      left,
      width,
      height,
    }}
  />
);

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function midPoint([x1, y1], [x2, y2]) {
  const fst = (x1 + x2) / 2;
  const snd = (y1 + y2) / 2;

  return [parseFloat(fst.toFixed(2)) || 0, parseFloat(snd.toFixed(2)) || 0];
}

export default App;
