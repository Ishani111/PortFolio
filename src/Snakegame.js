import { useRef, useEffect, useState, useCallback } from "react";
import "./SnakeGame.css";
const CELL = 25;
const COLS = 24;
const ROWS = 24;
const WIDTH  = COLS * CELL;
const HEIGHT = ROWS * CELL;
const INITIAL_SPEED = 150;

const randomCell = () => ({
  x: Math.floor(Math.random() * COLS),
  y: Math.floor(Math.random() * ROWS),
});

const checkCollision = (head, snake) => {
  const hitWall =
    head.x < 0 ||
    head.x >= COLS ||
    head.y < 0 ||
    head.y >= ROWS;

  const hitSelf = snake
    .slice(1)
    .some((seg) => seg.x === head.x && seg.y === head.y);

  return hitWall || hitSelf;
};

export default function SnakeGame() {

  const canvasRef    = useRef(null);
  const snakeRef     = useRef([{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }]);
  const directionRef = useRef({ x: 1, y: 0 });
  const nextDirRef   = useRef({ x: 1, y: 0 });
  const foodRef      = useRef(randomCell());
  const intervalRef  = useRef(null);

  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver,  setGameOver]  = useState(false);
  const [started,   setStarted]   = useState(false);
  const [paused,    setPaused]    = useState(false);
  const [speed,     setSpeed]     = useState(INITIAL_SPEED);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 1. Background
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 2. Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= WIDTH; x += CELL) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, HEIGHT); ctx.stroke();
    }
    for (let y = 0; y <= HEIGHT; y += CELL) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(WIDTH, y); ctx.stroke();
    }

    // 3. Food
    const food = foodRef.current;
    ctx.fillStyle = "#cc0000";
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2 - 2, food.y * CELL + CELL / 2 - 2, 2, 0, Math.PI * 2);
    ctx.fill();

    // 4. Snake
    const snake = snakeRef.current;
    snake.forEach((segment, index) => {
      const px   = segment.x * CELL;
      const py   = segment.y * CELL;
      const size = CELL - 2;

      if (index === 0) {
        ctx.fillStyle = "#ff2222";
        ctx.fillRect(px + 1, py + 1, size, size);

        const dir  = directionRef.current;
        const eye1 = { x: px + CELL / 2 - 3, y: py + CELL / 2 - 3 };
        const eye2 = { x: px + CELL / 2 + 3, y: py + CELL / 2 - 3 };

        if (dir.x ===  1) { eye1.x = px+14; eye1.y = py+4;  eye2.x = px+14; eye2.y = py+12; }
        if (dir.x === -1) { eye1.x = px+2;  eye1.y = py+4;  eye2.x = px+2;  eye2.y = py+12; }
        if (dir.y === -1) { eye1.x = px+4;  eye1.y = py+2;  eye2.x = px+12; eye2.y = py+2;  }
        if (dir.y ===  1) { eye1.x = px+4;  eye1.y = py+14; eye2.x = px+12; eye2.y = py+14; }

        ctx.fillStyle = "white";
        ctx.beginPath(); ctx.arc(eye1.x, eye1.y, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(eye2.x, eye2.y, 2, 0, Math.PI * 2); ctx.fill();

      } else {
        const fade = 1 - (index / snake.length) * 0.6;
        const r    = Math.floor(200 * fade);
        ctx.fillStyle = `rgb(${r}, ${Math.floor(r * 0.9)}, ${Math.floor(r * 0.85)})`;
        ctx.fillRect(px + 1, py + 1, size, size);
      }
    });
  }, []);

  const tick = useCallback(() => {
    directionRef.current = nextDirRef.current;

    const snake   = snakeRef.current;
    const dir     = directionRef.current;
    const newHead = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (checkCollision(newHead, snake)) {
      clearInterval(intervalRef.current);
      setGameOver(true);
      setHighScore((prev) => Math.max(prev, score));
      return;
    }

    const food    = foodRef.current;
    const ateFood = newHead.x === food.x && newHead.y === food.y;

    if (ateFood) {
      snakeRef.current  = [newHead, ...snake];
      foodRef.current   = randomCell();
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore % 5 === 0) setSpeed((s) => Math.max(60, s - 10));
        return newScore;
      });
    } else {
      snakeRef.current = [newHead, ...snake.slice(0, -1)];
    }

    draw();
  }, [draw, score]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const current = directionRef.current;

      if ((e.key === "ArrowUp"    || e.key === "w") && current.y !== 1)  nextDirRef.current = { x: 0,  y: -1 };
      if ((e.key === "ArrowDown"  || e.key === "s") && current.y !== -1) nextDirRef.current = { x: 0,  y:  1 };
      if ((e.key === "ArrowLeft"  || e.key === "a") && current.x !== 1)  nextDirRef.current = { x: -1, y:  0 };
      if ((e.key === "ArrowRight" || e.key === "d") && current.x !== -1) nextDirRef.current = { x: 1,  y:  0 };

      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!started || gameOver || paused) return;
    intervalRef.current = setInterval(tick, speed);
    return () => clearInterval(intervalRef.current);
  }, [started, gameOver, paused, speed, tick]);

  const restart = () => {
    snakeRef.current     = [{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }];
    directionRef.current = { x: 1, y: 0 };
    nextDirRef.current   = { x: 1, y: 0 };
    foodRef.current      = randomCell();
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setStarted(true);
  };

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="sg-page">

      {/* Title */}
      <div className="sg-title-block">
        <h2 className="sg-title">Snake</h2>
        <p className="sg-subtitle">Arrow keys or WASD · Space to pause</p>
      </div>

      {/* Score row */}
      <div className="sg-score-row">
        {[
          { label: "Score", value: score },
          { label: "Best",  value: highScore },
          { label: "Speed", value: `${Math.round((INITIAL_SPEED / speed) * 100)}%` },
        ].map(({ label, value }) => (
          <div key={label} className="sg-score-card">
            <div className="sg-score-label">{label}</div>
            <div className="sg-score-value">{value}</div>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="sg-canvas-wrap">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="sg-canvas" />

        {/* Start overlay */}
        {!started && !gameOver && (
          <Overlay>
            <OverlayTitle>Snake</OverlayTitle>
            <OverlaySub>Use arrow keys or WASD to move</OverlaySub>
            <OverlaySub>Eat the red dots to grow</OverlaySub>
            <OverlaySub>Don't hit the walls or yourself</OverlaySub>
            <OverlayButton onClick={() => setStarted(true)}>Start Game</OverlayButton>
          </Overlay>
        )}

        {/* Paused overlay */}
        {paused && !gameOver && started && (
          <Overlay>
            <OverlayTitle>Paused</OverlayTitle>
            <OverlaySub>Press Space to resume</OverlaySub>
            <OverlayButton onClick={() => setPaused(false)}>Resume</OverlayButton>
          </Overlay>
        )}

        {/* Game over overlay */}
        {gameOver && (
          <Overlay>
            <OverlayTitle>Game Over</OverlayTitle>
            <p className="sg-final-label">Final Score</p>
            <p className="sg-final-score">{score}</p>
            {score === highScore && score > 0 && (
              <p className="sg-new-best">New High Score!</p>
            )}
            <OverlayButton onClick={restart}>Play Again</OverlayButton>
          </Overlay>
        )}
      </div>

      {/* Mobile controls */}
      <div className="sg-mobile-controls">
        <ArrowBtn onClick={() => { if (directionRef.current.y !== 1)  nextDirRef.current = { x: 0,  y: -1 }; }}>▲</ArrowBtn>
        <div className="sg-mobile-row">
          <ArrowBtn onClick={() => { if (directionRef.current.x !== 1)  nextDirRef.current = { x: -1, y: 0  }; }}>◀</ArrowBtn>
          <ArrowBtn onClick={() => { if (directionRef.current.y !== -1) nextDirRef.current = { x: 0,  y: 1  }; }}>▼</ArrowBtn>
          <ArrowBtn onClick={() => { if (directionRef.current.x !== -1) nextDirRef.current = { x: 1,  y: 0  }; }}>▶</ArrowBtn>
        </div>
      </div>

    </div>
  );
}

function Overlay({ children }) {
  return <div className="sg-overlay">{children}</div>;
}

function OverlayTitle({ children }) {
  return <h3 className="sg-overlay-title">{children}</h3>;
}

function OverlaySub({ children }) {
  return <p className="sg-overlay-sub">{children}</p>;
}

function OverlayButton({ children, onClick }) {
  return <button className="sg-overlay-btn" onClick={onClick}>{children}</button>;
}

function ArrowBtn({ children, onClick }) {
  return <button className="sg-arrow-btn" onClick={onClick}>{children}</button>;
}
