import "./App.css";
import { Canvas, RangeInput } from "./Component";

function App() {
  return (
    <>
      <h1>打砖块</h1>
      <Canvas />
      <RangeInput />
      <p>按 A 或 D 左右移动挡板</p>
      <p>按 F 开始游戏</p>
      <p>按 P 暂停/恢复游戏</p>
    </>
  );
}

export default App;
