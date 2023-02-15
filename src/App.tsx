import React, { EventHandler, useRef, useState, ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, FileInput, Label, RangeSlider } from 'flowbite-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { BsZoomIn, BsZoomOut, BsArrowRight, BsArrowDown, BsArrowLeft, BsArrowUp, BsArrowClockwise, BsArrowCounterclockwise, BsX, BsCheck2, BsLock, BsUnlock, BsCrop, BsArrowsMove, BsBootstrapReboot } from 'react-icons/bs';
import { TfiArrowsHorizontal, TfiArrowsVertical } from 'react-icons/tfi'

function App() {
  const [image, setImage] = useState<string>("");
  const [cropData, setCropData] = useState<string>("");
  const [cropper, setCropper] = useState<Cropper>();
  const [rotateValue, setRotateValue] = useState<number>(0)
  const onChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (!e) return;
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onCropStart = () => {
    //set loading true
  }

  const onCropEnd = () => {
    //set loading false
  }

  const rotateImage = (num: number) => {
    if (!cropper) return;
    if (Math.abs(num) >= 360) {
      setRotateValue(0)
      cropper.rotateTo(0)
    } else {
      setRotateValue(num);
      cropper.rotateTo(num);
    }
  }

  const getCropper = () => {
    if (!image) return;
    return <>
      <Cropper
        className={'cropper'}
        zoomTo={0.5}
        initialAspectRatio={0}
        preview=".img-preview"
        src={image}
        viewMode={1}
        enable={true}
        rotateTo={rotateValue}
        cropstart={() => onCropStart()}
        cropend={() => onCropEnd()}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides={true}
      />
      <br />
      <RangeSlider id="rotation" min="-360" max="360" value={rotateValue} onChange={(e) => rotateImage(parseInt(e.target.value))} />
      <br />
      {cropper && <div className='flex_container'>
        <Button.Group>
          <Button onClick={() => cropper.setDragMode("move")}>
            <BsArrowsMove />
          </Button>
          <Button onClick={() => cropper.setDragMode("crop")}>
            <BsCrop />
          </Button>
        </Button.Group>

        <Button.Group>
          <Button onClick={() => cropper.setAspectRatio(16 / 9)}>
            16:9
          </Button>
          <Button onClick={() => cropper.setAspectRatio(4 / 3)}>
            4:3
          </Button>
          <Button onClick={() => cropper.setAspectRatio(1 / 1)}>
            1:1
          </Button>
          <Button onClick={() => cropper.setAspectRatio(2 / 3)}>
            2:3
          </Button>
          <Button onClick={() => cropper.setAspectRatio(NaN)}>
            Free
          </Button>
        </Button.Group>

        <Button.Group>
          <Button onClick={() => cropper.zoom(0.1)}>
            <BsZoomIn />
          </Button>
          <Button onClick={() => cropper.zoom(-0.1)}>
            <BsZoomOut />
          </Button>
        </Button.Group>

        <Button.Group>
          <Button onClick={() => cropper.move(-10, 0)}>
            <BsArrowLeft />
          </Button>
          <Button onClick={() => cropper.move(10, 0)}>
            <BsArrowRight />
          </Button>
          <Button onClick={() => cropper.move(0, -10)}>
            <BsArrowUp />
          </Button>
          <Button onClick={() => cropper.move(0, 10)}>
            <BsArrowDown />
          </Button>
        </Button.Group>

        <Button.Group>
          <Button onClick={() => rotateImage(rotateValue - 45)}>
            <BsArrowCounterclockwise />
          </Button>
          <Button onClick={() => rotateImage(rotateValue + 45)}>
            <BsArrowClockwise />
          </Button>
        </Button.Group>

        <Button.Group>
          <Button onClick={() => cropper.scaleX(-cropper.getData().scaleX)}>
            <TfiArrowsHorizontal />
          </Button>
          <Button onClick={() => cropper.scaleY(-cropper.getData().scaleY)}>
            <TfiArrowsVertical />
          </Button>
        </Button.Group>

        <Button.Group>
          <Button onClick={() => cropper.disable()}>
            <BsLock />
          </Button>
          <Button onClick={() => cropper.enable()}>
            <BsUnlock />
          </Button>
        </Button.Group>

        <Button onClick={() => cropper.reset()}>
          <BsBootstrapReboot />
        </Button>

        <Button.Group>
          <Button onClick={getCropData}>
            <BsCheck2 />
          </Button>
          <Button onClick={() => cropper.clear()}>
            <BsX />
          </Button>
        </Button.Group>
      </div>}
      <br />
    </>
  }

  // const getPreview = () => {
  //   if (!image) return;
  //   return <div className="box" style={{ width: "50%", float: "left" }}>
  //     <h1>Preview</h1>
  //     <div
  //       className="img-preview"
  //       style={{ width: "100%", float: "left", height: "300px" }}
  //     />
  //   </div>
  // }

  const getCropped = () => {
    if (!cropData) return;
    return <div className="box">
      <h1>Cropped</h1>
      <img src={cropData} alt="cropped" />
    </div>
  }

  return (
    <div>
      <div>
        <FileInput
          id="file"
          onChange={onChange}
        />
        <br />
        {getCropper()}
      </div>
      <div>
        {getCropped()}
      </div>
    </div>
  );
}

export default App;
