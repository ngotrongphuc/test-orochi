import React, { useRef, useEffect } from 'react';

interface WaveProps {
  frequency: number;
  amplitude: number;
  color: string;
  lineWidth: number;
  phase: number;
  speed: number; // Thêm thuộc tính speed để điều chỉnh tốc độ di chuyển của sóng
  shift?: number;
  outline?: boolean;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateWaves = (numWaves: number): WaveProps[] => {
  const colors = ["#FFF"];
  
  const waves: WaveProps[] = [];
  
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      frequency: 0.007, 
      color: colors[getRandomInt(0, colors.length - 1)],
      phase: i * 240 + 45,
      shift: getRandomInt(-10, 10),
      amplitude: getRandomInt(200, 400), // Tăng biên độ để sóng rộng hơn
      outline: true,
      lineWidth: getRandomInt(3, 6),
      speed: 0.005 + Math.random() * 0.02, // Tốc độ di chuyển ngẫu nhiên
    });
  }
  
  return waves;
};

type WaveComponentProps = {
  className?: string
  wavesNumber?: number
}

const WaveComponent: React.FC<WaveComponentProps> = ({className, wavesNumber = 6}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waves = useRef<WaveProps[]>(generateWaves(wavesNumber));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawWave = (wave: WaveProps) => {
      context.beginPath();
      context.lineWidth = wave.lineWidth;
      context.strokeStyle = wave.color;

      const centerY = canvas.height / 2;
      const length = canvas.width;
      const numPoints = 1000; 

      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints) * length;
        const y = centerY + wave.amplitude * Math.sin(wave.frequency * x + wave.phase);
        if (i === 0) {
          context.moveTo(x, y)
        } else {
          context.lineTo(x, y)
        }
      }

      context.stroke()
    }

    const animate = () => {
      clear()

      waves.current.forEach(wave => {
        drawWave(wave)
        wave.amplitude = 75 + 50 * Math.sin(wave.phase)
        wave.phase += wave.speed
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ backgroundColor: '#FFFFFF00' }} className={className} />;
};

export default WaveComponent;
