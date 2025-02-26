import { useRef, useState } from "react";

const Scanner = () => {

  const [capturando, setCapturando] = useState(false);
  const [codigo, setCodigo] = useState("");
  
  const worker = useRef<Worker | null>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const oldTime = useRef(0);

  const InitWorker = () => {
    console.log("init worker");
    worker.current = new Worker("/wasmWorker.js");
    worker.current.onmessage = async ev => {
      if(ev.data != null){
        
        console.log(ev);
        if(ev.data.type === "QR-Code"){
          return;
        }

        worker.current?.terminate();

        setCodigo(`${ev.data.data} ${ev.data.type}`);
        setCapturando(false);
        
      }
    }
  }

  const tick = (time: number) => {
    if(canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA){

      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;


      if(ctxRef.current){
        const ctx = ctxRef.current;

        ctx.drawImage(videoRef.current,0, 0);

        if(time - oldTime.current > 600){
          oldTime.current = time;

          const imageData = ctx.getImageData(0,0,width, height);

          worker.current?.postMessage({width: imageData.width, height: imageData.height});
          worker.current?.postMessage(imageData, [imageData.data.buffer]);
        }
      }

    }

    requestAnimationFrame(tick);
  }

  return (
    <div>
      <h1>Scanner</h1>
    </div>
  );
}

export default Scanner;
