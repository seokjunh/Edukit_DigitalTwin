import React, { useEffect, useState } from "react";
import axios from "axios";

function DiceNumber() {
  const [dicenum, setDicenum] = useState(0);

  const fetchData = () => {
    axios
      .get(`http://192.168.0.124:8081/dice/diceData`)
      .then((response) => {
        setDicenum(response.data[0].DiceNumber);
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

      if (receivedMessage && receivedMessage.Wrapper) {
        const tag1Value = receivedMessage.Wrapper.find(
          (item) => item.tagId === "1"
        )?.value;

        if (tag1Value) {
          console.log(1);
          fetchData();
        }
      }
    });

    return () => {
      ws.close();
    };
  }, []);

  return <div class="item">주사위 {dicenum}</div>;
}

export default DiceNumber;
