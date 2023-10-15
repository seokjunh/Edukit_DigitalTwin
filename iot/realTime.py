import cv2

# 카메라 캡처를 엽니다. 
# 0은 내장 카메라, 또는 카메라 번호를 지정할 수 있습니다 (예: 0, 1, 2 등).
# 만약 네트워크 카메라를 사용하고자 한다면, URL을 사용하십시오.
cap = cv2.VideoCapture(1)

while(cap.isOpened()):
    # 프레임을 읽습니다.
    ret, frame = cap.read()

    if ret:
        # 프레임을 화면에 출력합니다.
        cv2.imshow('Frame', frame)

        # 'q'를 누르면 루프를 빠져나옵니다.
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break

# 작업이 끝나면 캡처를 해제합니다.
cap.release()
cv2.destroyAllWindows()
