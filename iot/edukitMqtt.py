import paho.mqtt.client as mqtt
import mongoConnect
import json

def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    parse_json = json.loads(payload)
    if 'Wrapper' in parse_json and len(parse_json['Wrapper']) > 0 and parse_json['Wrapper'][0].get('value'):
        mongoConnect.insert_data(parse_json)
    else:
        print("Invalid message format:", parse_json)

mqtt_client = mqtt.Client("Test_Broker")
mqtt_client.connect("localhost")
mqtt_client.subscribe("#")
mqtt_client.on_message = on_message

mqtt_client.loop_start()

try:
    while True:
        pass
except KeyboardInterrupt:
    mqtt_client.disconnect()
    mqtt_client.loop_stop()