import React, { useEffect, useState } from "react";
import WebGL from "../../webGL/webgl";
import "../../css/dash.css";
import GraphComponent from "./Graph";
import No3 from "./no3";
import VideoComponent from "./video";
import DiceNumber from "./dice";

function Dash() {
  const [product, setProduct] = useState(0);
  const [goodproduct, setGoodproduct] = useState(0);
  const [goodrate, setGoodrate] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("open", () => {
      console.log("WebSocket connection.");
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage && receivedMessage.Wrapper) {
        const tag1Value = receivedMessage.Wrapper.find(
          (item) => item.tagId === "1"
        )?.value;

        if (tag1Value) {
          const tag15 = receivedMessage.Wrapper.find(
            (item) => item.tagId === "15"
          )?.value;
          setProduct(tag15);

          const tag16 = receivedMessage.Wrapper.find(
            (item) => item.tagId === "16"
          )?.value;
          setGoodproduct(tag16);

          const v = ((parseInt(tag16) / parseFloat(tag15)) * 100).toFixed(1);
          if (v === "NaN") {
            setGoodrate(tag15);
          } else {
            setGoodrate(v);
          }
        }
      }
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <div className="Dash">
        <div className="DashBoard">
          <WebGL />
          <div className="DashBox">
            {/* 상단 */}
            <div className="twice">
              <div className="Dash1">
                <GraphComponent />
              </div>
              <div className="Dash1-1">
                <div className="Dash1-11">
                  <div class="item">생산량 {product}</div>
                  <div class="item">양품 수 {goodproduct}</div>
                  <div class="item">양품률 {goodrate} %</div>
                </div>
                <div className="Dash1-12">
                  <DiceNumber />
                </div>
              </div>
            </div>
            {/* 중단 */}
            <div className="Dash2">
              <VideoComponent />
            </div>
            {/* 하단 */}
            <div className="Dash3-B">
              <h5 className="item1">3호기</h5>
              <h5 className="item2">MOTOR1</h5>
              <div className="item2-1"></div>
              <h5 className="item3">MOTOR2</h5>
              <div className="item3-1"></div>
              <div className="Dash3">
                <No3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
