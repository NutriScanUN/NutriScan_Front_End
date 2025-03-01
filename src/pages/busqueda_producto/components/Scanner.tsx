import { useEffect, useRef, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";

interface Props{
  show: boolean;
  onHide: () => void;
  onReference: (reference: string) => void;
}

const Scanner = ({show, onHide, onReference}: Props) => {

  const [capturando, setCapturando] = useState(false);
  const [codigo, setCodigo] = useState("");
  
  const worker = useRef<Worker | null>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const oldTime = useRef(0);

  const handleHide = () => {
    setCapturando(false);
    setCodigo("");
    onHide();
  }

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


  useEffect(() => {

    console.log("videoRef:", videoRef.current, "canvasRef:", canvasRef.current);

    if(capturando){

      InitWorker();

      if(canvasRef.current){
        ctxRef.current = canvasRef.current.getContext("2d",{
          willReadFrequently: true
        });
      }

      navigator.mediaDevices?.getUserMedia({
        audio: false,
        video: {
          facingMode:"environment",
          aspectRatio: 1
        }
      })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();

          requestAnimationFrame(tick);
        }
      })
      .catch(err => console.error(err.name, err));
    }else{
      videoRef.current.pause();
      if(videoRef.current.srcObject){
        videoRef.current.srcObject = null;
      }
    }
  }, [capturando]);

  useEffect(() => { if(show) setCapturando(true) }, [show])

  return (
    <Modal backdrop="static" show={show} onHide={handleHide}>
      <Modal.Header closeButton className="text-bg-dark" closeVariant="white">
        <Modal.Title>Scanner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {
      capturando ?
        <canvas id="captura" className="maintainRatio" ref={canvasRef}/>:
      codigo?
      <>
        <Modal.Title className="px-3 pb-3">Codigo del producto</Modal.Title>
        <ListGroup>
          <ListGroup.Item className="text-center text-bg-dark">{codigo}</ListGroup.Item>
        </ListGroup>
      </>:<></>
      }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleHide} variant="secondary">Cerrar</Button>
        <Button onClick={() => onReference(codigo.split(" ")[0])} variant="primary">Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Scanner;
