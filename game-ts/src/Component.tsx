import React, { useRef, useEffect, useState } from "react";
import paddlePath from "./assets/paddle.png";

export const RangeInput = () => {
  // 初始化滑块值（0-100 范围）
  const [rangeValue, setRangeValue] = useState<number>(30);

  // 处理滑块变化
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 将字符串值转换为数字
    setRangeValue(Number(e.target.value));
  };
  return (
    <>
      <p>
        刷新帧率: {rangeValue}
        <input
          type="range"
          id="id-input-speed"
          min="1" // 最小值
          max="120" // 最大值
          step="1" // 步长
          value={rangeValue}
          onChange={handleRangeChange}
        />
      </p>
    </>
  );
};

const LoadImage = (path: string) => {
  // 创建新图片对象
  const image = new Image();
  image.src = path;
  return image;
};

// 在 Canvas 组件中接收帧率参数
export const Canvas = ({ frameRate = 30 }: { frameRate?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAPressed, setIsAPressed] = useState(false);
  const [isDPressed, setIsDPressed] = useState(false);
  const paddleXRef = useRef(150);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(Date.now());
  
  // 键盘按下事件处理
  const handleKeyDown = (e: KeyboardEvent) => {
    // 检查按下的是否是 'a' 或 'A' 键
    if (e.key.toLowerCase() === "a") {
      setIsAPressed(true);
      console.log('"a" 键被按下');
    }
    if (e.key.toLowerCase() === "d") {
      setIsDPressed(true);
      console.log('"d" 键被按下');
    }
  };
  
  // 键盘松开事件处理
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "a") {
      setIsAPressed(false);
      console.log('"a" 键被松开');
    }
    if (e.key.toLowerCase() === "d") {
      setIsDPressed(false);
      console.log('"d" 键被松开');
    }
  };

  // 动画循环函数
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = LoadImage(paddlePath);
    const speedX = 10;
    
    if (canvas && ctx) {
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;
      
      // 使用传入的帧率控制更新频率
      if (deltaTime >= 1000 / frameRate) {
        // 向左移动
        if (isAPressed) {
          paddleXRef.current -= speedX;
        } 
        // 向右移动
        if (isDPressed) {
          paddleXRef.current += speedX;
        }
        // 边界检查
        if (paddleXRef.current < 0) {
          paddleXRef.current = 0;
        } 
        if (paddleXRef.current > canvas.width - image.width) {
          paddleXRef.current = canvas.width - image.width;
        }
        console.log("paddleXRef.current", paddleXRef.current);

        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制图片
        ctx.drawImage(image, paddleXRef.current, 250);
        
        lastTimeRef.current = now;
      }
      
      // 继续动画
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // 监听键盘状态变化
  useEffect(() => {
    if (isAPressed || isDPressed) {
      animate();
    } else {
      // 停止动画
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isAPressed, isDPressed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = LoadImage(paddlePath);
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    if (canvas && ctx) {
      // 图片加载成功回调
      image.onload = () => {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 绘制图片到Canvas
        ctx.drawImage(image, paddleXRef.current, 250);
      };
    }

    // 组件卸载时移除事件监听，避免内存泄漏
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      style={{
        border: "1px black solid",
        backgroundColor: "lightsteelblue",
      }}
    />
  );
};

export {};
