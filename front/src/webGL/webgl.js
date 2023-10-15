import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Edukit from "./loader";
import GUI from "lil-gui";
import "../css/gui.css";
import "../css/dash.css";
import axios from "axios";

function WebGL() {
  const navigate = useNavigate();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [start, setStart] = useState(false); // 시작 정지
  const [reset, setReset] = useState(false); // 리셋

  const [chipOn, setChipOn] = useState(false); //1호기동작
  const [unit2, setUnit2] = useState(); //2호기 칩 도착
  const [unit3, setUnit3] = useState(); // 3호기 칩 도착

  const [color, setColor] = useState(); // 컬러센싱
  const [rememberColor, setRememberColor] = useState(); // 이전 컬러센싱 기억

  const [no1Count, setNo1Count] = useState(); //no1 생산량
  const [Limit, setLimit] = useState(); //자제투입 리미트

  const [no3Gripper, setGripper] = useState(); // 3호기 그리퍼

  // Add these lines
  const currentX = useRef(x);
  const currentY = useRef(y);

  const currentStart = useRef(start);
  const currentReset = useRef(reset);

  const currentchip = useRef(chipOn);
  const crrentunit2 = useRef(unit2);
  const currentunit3 = useRef(unit3);

  const currentColor = useRef(color);
  const currentRemeberColor = useRef(rememberColor);

  const currentNo1Count = useRef(no1Count);
  const currentLimit = useRef(Limit);

  const currentGripper = useRef(no3Gripper);

  const edukitRef = useRef(null);

  const data = {
    DiceNumber: 0,
  };

  const fetchData = () => {
    axios
      .post(`http://192.168.0.124:8081/dice/diceSave`, data)
      .then((response) => {
        console.log(response.data);
        console.log(1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("open", () => {
      console.log("WebSocket connection.");
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.Wrapper) {
        const tag1 = receivedMessage.Wrapper.find((item) => item.tagId === "1"); // 시작
        const tag8 = receivedMessage.Wrapper.find((item) => item.tagId === "8"); // 리셋

        const tag3 = receivedMessage.Wrapper.find((item) => item.tagId === "3");
        const tag4 = receivedMessage.Wrapper.find((item) => item.tagId === "4");

        const tag5 = receivedMessage.Wrapper.find((item) => item.tagId === "5"); //3호기 칩 도착
        const tag6 = receivedMessage.Wrapper.find((item) => item.tagId === "6"); //3호기 칩 도착

        const tag21 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "21"
        );
        const tag22 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "22"
        );
        const tag24 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "24"
        );

        const tag39 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "39"
        );
        // no1 생산량
        const tag15 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "15"
        );
        // 자제투입 리미트
        const tag36 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "36"
        );

        // 3호기 그리퍼
        const tag40 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "40"
        );

        const tag43 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "43"
        );
        myObject.NO1 = tag3 && tag3.value ? "#00FF00" : "#FF0000";
        myObject.NO2 = tag4 && tag4.value ? "#00FF00" : "#FF0000";
        myObject.NO3 = tag21 && tag21.value >= 1 ? "#00FF00" : "#FF0000";
        myObject.BELT = tag43 && tag43.value >= 1 ? "#00FF00" : "#FF0000";
        no1.setValue(myObject.NO1);
        no2.setValue(myObject.NO2);
        no3.setValue(myObject.NO3);
        belt.setValue(myObject.BELT);

        setX(tag21.value);
        setY(tag22.value);

        setStart(tag1.value);
        setReset(tag8.value);

        setChipOn(tag3.value);
        setUnit2(tag24.value);

        setColor(tag39.value);
        setRememberColor(tag6.value);

        setNo1Count(tag15.value);
        setLimit(tag36.value);

        setUnit3(tag5.value);
        setGripper(tag40.value);

        currentX.current = tag21.value;
        currentY.current = tag22.value;

        currentStart.current = tag1.value;
        currentReset.current = tag8.value;

        currentunit3.current = tag5.value;

        currentchip.current = tag3.value;
        crrentunit2.current = tag24.value;

        currentColor.current = tag39.value;
        currentRemeberColor.current = tag6.value;

        currentNo1Count.current = tag15.value;
        currentLimit.current = tag36.value;

        currentGripper.current = tag40.value;
      }
    });
    // 화면 비율
    const canvas = document.querySelector("#webgl");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth * 0.45) / (window.innerHeight * 0.85),
      0.1,
      1000
    );

    camera.position.set(50, 50, 70);
    scene.add(camera);

    const guiContainer = document.createElement("div");
    guiContainer.classList.add("gui-container");
    document.body.appendChild(guiContainer);

    const gui = new GUI({ autoPlace: false });
    guiContainer.appendChild(gui.domElement);

    const controlsElement = document.querySelector(".title");
    controlsElement.textContent = "에듀킷 상태 및 제어";

    const lilGuiElement = document.querySelector(".lil-gui");
    lilGuiElement.style.setProperty("--background-color", "#112a4a");
    lilGuiElement.style.setProperty("--title-background-color", "#0f2d51");
    lilGuiElement.style.setProperty("--widget-color", "#25526f");
    lilGuiElement.style.setProperty("--hover-color", "#25526f50");

    lilGuiElement.style.setProperty("--font-size", "14px");
    lilGuiElement.style.setProperty("--name-width", "25%");

    const edukit = new Edukit(); // edukit을 한 번만 불러옵니다.
    edukit.fileload(scene);

    edukitRef.current = edukit;

    const myObject = {
      start: function () {
        const data = JSON.stringify({ tagId: "1", value: "1" });
        ws.send(data);
      },
      stop: function () {
        const data = JSON.stringify({ tagId: "1", value: "0" });
        ws.send(data);
      },
      NO1: "#FF0000",
      NO2: "#FF0000",
      NO3: "#FF0000",
      BELT: "#FF0000",
      reset: function () {
        fetchData();
        const data = JSON.stringify({ tagId: "8", value: "1" });
        ws.send(data);
        window.location.reload(navigate("/dash"));
      },
    };

    const [minY, maxY] = [0, 18000000];
    const [minX, maxX] = [0, 1300000];

    // yAxisFunc 함수는 num 속성 값을 슬라이더의 높이로 변환하는 함수입니다.
    // 해당 슬라이더는 min에서 max 사이의 값을 0에서 7 사이의 값으로 변환합니다.
    const yAxisFunc = (value) => {
      return ((value - minY) / (maxY - minY)) * 7;
    };
    //xAxisFunc 함수는 num2 속성 값을 슬라이더의 각도로 변환하는 함수입니다.
    //해당 슬라이더는 min에서 max 사이의 값을 0에서 90도 사이의 각도로 변환합니다.
    const xAxisFunc = (value) => {
      return ((value - minX) / (maxX - minX)) * THREE.MathUtils.degToRad(90);
    };
    gui.add(myObject, "start");
    gui.add(myObject, "stop");

    const no1 = gui.addColor(myObject, "NO1");
    const no2 = gui.addColor(myObject, "NO2");
    const no3 = gui.addColor(myObject, "NO3");
    const belt = gui.addColor(myObject, "BELT");
    gui.add(myObject, "reset");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth * 0.45, window.innerHeight * 0.85);

    // .Right 클래스에 맞게 캔버스 크기를 설정
    const rightElement = document.querySelector(".Right");

    // 캔버스 크기 업데이트
    function updateCanvasSize() {
      const rightWidth = rightElement.clientWidth;
      const rightHeight = rightElement.clientHeight;

      // .Right의 가로와 세로 비율에 맞춰 카메라 비율 조절
      camera.aspect = rightWidth / rightHeight;
      renderer.setSize(rightWidth, rightHeight);
    }

    // 초기 화면 크기 설정
    updateCanvasSize();

    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x112a4a);

    // 윈도우 크기가 변경될 때마다 크기 업데이트
    window.addEventListener("resize", () => {
      updateCanvasSize();
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.updateProjectionMatrix();
      // renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    new OrbitControls(camera, renderer.domElement);

    let requestId = null;
    const tick = () => {
      renderer.render(scene, camera);

      requestId = requestAnimationFrame(tick);
      camera.updateMatrixWorld();
      camera.updateProjectionMatrix();

      if (edukitRef.current && edukitRef.current.loaded) {
        //edukitRef.current.start(currentStart.current, currentReset.current);

        edukitRef.current.actionY(yAxisFunc(currentY.current));
        edukitRef.current.actionX(xAxisFunc(currentX.current));
        edukitRef.current.actionChip(currentchip.current, currentunit3.current);

        edukitRef.current.unitTwo(crrentunit2.current, currentColor.current);
        edukitRef.current.unitOne(
          currentNo1Count.current,
          currentLimit.current
        );
        //console.log(currentColor.current,currentRemeberColor.current);
        //console.log(currentNo1Count,currentNo1Limit);
        //console.log(currentunit3.current);
        //console.log(currentGripper.current);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(requestId);
      ws.close();
      guiContainer.remove();
    };
  }, []);

  return (
    <div className="Right">
      <canvas
        id="webgl"
        style={{ borderRadius: "30px", padding: "1%" }}
      ></canvas>
    </div>
  );
}

export default WebGL;
