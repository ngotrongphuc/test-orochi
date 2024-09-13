export class Wave {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private frequency: number;
    private phase: number;
    private amplitude: number;
    private color: string;
    private shift: number;
    private lineWidth: number;
    private outline: boolean;
    private fill: boolean;
    private gradient: boolean;
    private origin: { x: number; y: number };
  
    constructor(options: any) {
      this.canvas = options.canvas;
      this.context = this.canvas.getContext('2d')!;
      this.frequency = options.frequency || 0.005;
      this.phase = options.phase || 30;
      this.amplitude = options.amplitude || 50;
      this.color = options.color || 'red';
      this.shift = options.shift || 10;
      this.lineWidth = options.lineWidth || 4;
      this.outline = options.outline !== undefined ? options.outline : true;
      this.fill = options.fill !== undefined ? options.fill : false;
      this.gradient = options.gradient !== undefined ? options.gradient : false;
      this.origin = options.origin || { x: 0, y: this.canvas.height / 2 };
    }
  
    private drawPoint(x: number, y: number, color: string) {
      const context = this.context;
      const radius = this.lineWidth / 2;
      context.beginPath();
      if (this.outline) {
        context.fillStyle = color;
        context.lineWidth = 2;
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
      }
      if (this.fill) {
        if (this.gradient) {
          const gradient = context.createLinearGradient(0, 0, 0, this.canvas.height);
          gradient.addColorStop(0.5, color);
          gradient.addColorStop(1, 'transparent');
          context.fillStyle = gradient;
        } else {
          context.fillStyle = color;
        }
        context.fillRect(x - radius, y - radius, radius, this.canvas.height - y + radius);
      }
    }
  
    private drawWave(width: number, phase: number, color: string, amplitude: number, frequency: number) {
      for (let x = this.origin.x; x < this.origin.x + width; x++) {
        const y = this.origin.y + amplitude * Math.sin(frequency * (x + phase));
        this.drawPoint(x, y, color);
      }
    }
  
    private clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    redraw(options: any = {}) {
      this.phase += Math.random() * 5 + this.shift;
      const amplitude = options.amplitude || this.amplitude;
      const color = options.color || this.color;
      const phase = options.phase || this.phase;
      const frequency = options.frequency || this.frequency;
      this.drawWave(this.canvas.width, phase, color, amplitude, frequency);
    }
  
    draw(options: any = {}) {
      requestAnimationFrame(() => this.draw(options));
      this.clearCanvas();
      this.phase += Math.random() * 5 + this.shift;
      const amplitude = options.amplitude || this.amplitude;
      const color = options.color || this.color;
      const phase = options.phase || this.phase;
      const frequency = options.frequency || this.frequency;
      this.drawWave(this.canvas.width, phase, color, amplitude, frequency);
    }
  }
  