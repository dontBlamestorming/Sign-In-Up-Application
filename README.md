# Sign-In-Up-Application

## 요약

아이디와 비밀번호를 입력하여 로그인, 회원가입을 할 수 있는 간단한 SPA(Single-Page-Application)입니다.

***

## 기술스택

### Client-side
- React
- Bootstrap
### Server-side
- nginx(Web-server)
- NodeJS(Vanilla)

### Database
- MySQL
### Deploy
- EC2(ubuntu) of AWS

***

## 자세히
### 디렉토리 구조    
    ├── README.md                 - README file
    │
    ├── client                    - client-side
    │   ├── package.json          - npm 설정
    │   ├── models.py             - 서버 모델 정의
    │   │── views.py              - 서버 뷰 함수(API 엔드포인트) 정의
    │   │ 
    │   ├── src/                  - 클라이언트 사이드 폴더
    │   │   ├── App.js            - main component
    │   │   ├── App.css           - main css
    │   │   ├── auth.js           - axios functions
    │   │   ├── components/       - 리액트 컴포넌트
    │   │
    │   ├── public/               
    │   │   ├── images/           - img
    │ 
    ├── dbConfig.js               - DB(MySQL) config
    ├── dbConfigInfo.json         - DB info(pw, db 이름 등)  // git ignored
    ├── package.json              - npm 설정
    └── server.js                 - NodeJS script        

***

### Architecture

<p align="center">
  <img width="858" alt="architecture" src="https://user-images.githubusercontent.com/41932978/103398829-abcaef80-4b81-11eb-8466-b88b2cee3ccc.png">
</p>



***

### Application 스크린 샷

| Sign-In  | Sign-Up |
| ------------- | ------------- |
| ![Sign-In](https://user-images.githubusercontent.com/41932978/103398773-7de5ab00-4b81-11eb-9224-caff22edbe5d.gif)  | ![Sign-Up](https://user-images.githubusercontent.com/41932978/103398790-8a6a0380-4b81-11eb-86f9-c83411bcf9fc.gif)  |
| Worng Access  | 404 page  |
| <img alt="wrong-path" src="https://user-images.githubusercontent.com/41932978/103398868-d1f08f80-4b81-11eb-8e02-6f7710713891.png">  | <img alt="404-page" src="https://user-images.githubusercontent.com/41932978/103398870-d452e980-4b81-11eb-901a-ec8ff5ff36f3.png">  |

***

## 보완점 개발 예정
- [ ] 사용자는 80번 포트로만 접근할 수 있으며 이는 단순히 텍스트를 통해 데이터를 주고받고 하기 때문에 보안상 취약하다. https를 적용해보자.
- [ ] 인증과 관련된 보안문제를 강화하기 위해 jwt와 같은 token을 추가해보자
- [ ] NodeJS와 관련하여 request의 데이터를 받는 코드와, DB에 쿼리를 날리는 코드가 하드코딩되어 있으니 리팩토링 시켜보자

***

## 개발 후기


### 어려웠던 부분
1.  Web-server라는 존재를 몰랐었기에 nginx의 location과 server설정 하는 부분에서 시간을 많이 보냈던 것 같다. 하지만 이 부분을 공부하면서 Web-server라는 것이 어떠한 역할을 하는지에 대한 이해를 높일 수 있었던 것 같고, 가상 호스팅으로 여러개의 웹을 하나의 main server로 구성해보고 싶다는 생각을 했다. 물론 이러한 대규모의 서비스는 사용자가 몰리는 시간의 트래픽, 그리고 요청을 처리하는 서버의 규모 등을 고려하는 것이 필요하겠지만 한번 쯤 해보고 싶다는 생각이 들었다.
2.  NodeJS에서 post형식으로 데이터를 stream으로 받아서 body에 저장하는 과정과 DB에 쿼리를 날리는 로직이 중복이 많다. 중복을 피하기 위해 이런저런 방법을 많이 모색해봤으나 비동기적으로 동작하는 부분에 대한 이해가 좀 부족한 것 같다. 전체적인 Server-side 구성에 대한 부분은 상대적으로 약간 쉬운 느낌이 있었고 무엇보다도 재밌었다. 따라서 효율적인 로직을 짜내는 것에 더 집중해야 할 것 같다.
3.  Client-side에서 bootstrap을 처음 사용해보았다. 확실히 bootstrap으로 인해 css에 대한 부담이 덜해진 것은 맞다. 하지만 스타일에 있어서 원하는대로 커스터마이징 하는 것에 대한 부담감은 배로 증가하는 부작용이 있는 것 같다. 또한 react에서 bootstrap을 많이 고집하는 사람은 없는지 documentation은 있지만 용례에 대한 정보가 많이 부족했다. 대부분은 Material-ui를 사용하는 것 같다.


***

### 느낀점

- 처음으로 Client-side에서 Server-side까지 이루는 작업을 해보았다. 물론 매우 간단하고 쉬운 작업일 수 있겠으나 하나씩 독학하는 입장에서는 눈을가리고 앞을 더듬어가는 방식으로 길을 찾아가는 기분이었다. 많이 부족하지만 어느정도 구현해보니 내가 매일 마주하는 인증시스템과 웹 어플리케이션들이 얼마나 잘 짜여진 서비스인지 체감할 수 있었던 것 같다.
- 아직까지 공부해야 할 것이 매우 많다는 것을 느낀다. 하지만 이제는 내가 뭘 모르고 있는지 조금은 알 것 같다. 이 프로젝트를 고도화 하는데에 초점을 더 맞춘 다음 빨리 다른 프로젝트로 해보고 싶다는 생각이 든다.
