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
| Worng Path  | 404 page  |
| <img alt="wrong-path" src="https://user-images.githubusercontent.com/41932978/103398868-d1f08f80-4b81-11eb-8e02-6f7710713891.png">  | <img alt="404-page" src="https://user-images.githubusercontent.com/41932978/103398870-d452e980-4b81-11eb-901a-ec8ff5ff36f3.png">  |

***

## 보완점 개발 예정
- [ ] 사용자는 80번 포트로만 접근할 수 있으며 이는 단순히 텍스트를 통해 데이터를 주고받고 하기 때문에 보안상 취약하다. https를 적용해보자.
- [ ] 인증과 관련된 보안문제를 강화하기 위해 jwt와 같은 token을 추가해보자
- [ ] NodeJS와 관련하여 request의 데이터를 받는 코드와, DB에 쿼리를 날리는 코드가 하드코딩되어 있으니 리팩토링 시켜보자

***

## 개발 후기


### 어려웠던 부분
- Web-server라는 존재를 몰랐었기에 nginx의 location과 server설정 하는 부분에서 시간을 많이 보냈던 것 같다. 
***

### 느낀점
