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

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAPressed, setIsAPressed] = useState(false);
  // 键盘按下事件处理
  const handleKeyDown = (e: KeyboardEvent) => {
    // 检查按下的是否是 'a' 或 'A' 键
    if (e.key.toLowerCase() === "a") {
      setIsAPressed(true);
      console.log('"a" 键被按下');
    }
  };
  // 键盘松开事件处理
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "a") {
      setIsAPressed(false);
      console.log('"a" 键被松开');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = LoadImage(paddlePath);
    const speed = 20;
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    if (canvas && ctx) {
      // 图片加载成功回调
      image.onload = () => {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制图片到Canvas
        // 参数: 图片对象, x坐标, y坐标, 宽度, 高度
        ctx.drawImage(image, 150, 250);
      };

      if (isAPressed) {
        setInterval(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 150 - speed, 250);
        }, 1000 / 30);
      }
    }

    // 组件卸载时移除事件监听，避免内存泄漏
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
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
