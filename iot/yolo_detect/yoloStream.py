from flask import Flask, Response
import cv2
import base64
from ultralytics import YOLO
from ultralytics.utils.plotting import Annotator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CORS(app, origins="192.168.0.33:3000")

model = YOLO('./runs/detect/train7/weights/best.pt')

cap = cv2.VideoCapture(2)
cap.get(1280)
cap.get(720)


@app.route('/detection')
def detection():
    success, frame = cap.read()
    if not success:
        return "An error occurred during image processing.", 500
    
    try:
        img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model.predict(img)
        annotator = Annotator(frame)

        for r in results:
            boxes = r.boxes
            for box in boxes:
                b = box.xyxy[0]
                c = box.cls
                annotator.box_label(b, model.names[int(c)])

        frame_with_boxes = annotator.result()
        _, buffer_img = cv2.imencode('.jpg', frame_with_boxes)
        encoded_image_data = base64.b64encode(buffer_img).decode()

    except Exception as e:
        print(f"An error occurred: {e}")
        return "An error occurred during image processing.", 500

    return Response(encoded_image_data, mimetype='text/plain')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
