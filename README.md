# EARLY-BUDDY-SERVER
## project_early-buddy_server
* 2020 SOPT 25기 일정 알림 서비스 'EARLY-BUDDY'
* 프로젝트 기간 : 2019.12.21 ~ 2020.1.4
* API - https://github.com/EARLY-BUDDY/EARLY-BUDDY-SERVER/wiki
* 의존성
```
"dependencies": {
    "clean-css": "^4.2.1",
    "constantinople": "^4.0.1",
    "cookie-parser": "~1.4.4",
    "data-utils": "0.0.2",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "firebase-admin": "^8.9.0",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.4.0",
    "moment-timezone": "^0.5.27",
    "morgan": "~1.9.1",
    "node-schedule": "^1.3.2",
    "node-scheduler": "^1.0.0",
    "pbkdf2": "^3.0.17",
    "promise-mysql": "^4.1.1",
    "rand-token": "^0.4.0",
    "request": "^2.88.0",
    "urlencode": "^1.1.0",
    "xml2js": "^0.4.23"
  }
  ```
## Work Flow

## 시작하기
모든 소스코드는 vscode+ Windows10/MAC + Node.js 10 환경에서 작성되었습니다.
* Node.js의 Aysnc/Await 도구를 사용해 (Promise) 비동기 제어를 하고 있습니다.
* Node.js의 버전을 7.6 이상으로 유지해야 합니다.

### 실행하기
```
npm start
```
* `localhost:3456` 으로 접속이 가능합니다.
### AWS EC2 실행 하기
*` nodejs `와 `npm`을 설치합니다. 설치 방법은 [node.org](https://nodejs.org/en/)를 참고하세요.
*  Node.js 8 LTS 버전을 설치합니다.
*  실행에 필요한 의존성을 설치합니다.
```
npm install 
```

### 실행하기 
* Express 앱용 프로세스 관리자 `pm2` 를 이용해 배포 합니다.
```
npm install pm2 -g
```
* Express 앱용 프로세스 관리자 pm2 를 이용해 배포 합니다.
```
 pm2 start ./bin/www --name "앱 이름"
```
* 현재 실행중인 프로세스 목록을 확인합니다.
```
 pm2 list
```
* 프로세스를 중지합니다.
```
pm2 delete --name "앱 이릅"
```
* 프로세스를 모니터 합니다.
```
pm2 moni t --name "앱 이름"
```
## 배포
* AWS EC2 - 애플리케이션 서버
* AWS RDS - db 서버
* AWS S3 - 저장소 서버

## 사용된 도구
* [Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
* [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
* [NPM](https://rometools.github.io/rome/)  - 자바 스크립트 패키지 관리자 
* [PM2](https://pm2.keymetrics.io/]) - Express 앱용 프로세스 관리자
* [vscode](https://code.visualstudio.com/)  - 편집기
* [Mysql](https://www.mysql.com/) - DataBase
* [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws%20ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws%20ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템
* [AWS RDS](https://aws.amazon.com/ko/rds/) - 클라우드 환경 데이터베이스 관리 시스템
* [AWS S3](https://aws.amazon.com/ko/s3/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_s3_b&sc_content=s3_e&sc_detail=aws%20s3&sc_category=s3&sc_segment=177211245240&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177211245240!e!!g!!aws%20s3&ef_id=WkRozwAAAnO-lPWy:20180412120059:s]) - 클라우드 환경 데이터 저장소
## 사용 모듈
* [Async & Await](https://www.npmjs.com/package/async)
* [JWT(JsonWebToken)](https://www.npmjs.com/package/jsonwebtoken)
* [multer](https://github.com/expressjs/multer)
## 개발자
* [심정욱](https://github.com/SimJungUk)
* [박경선](https://github.com/gngsn)
* [양시연](https://github.com/ssionii)
* [손예지](https://github.com/yezgoget)
* [기여자 목록](https://github.com/EARLY-BUDDY/EARLY-BUDDY-SERVER/graphs/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 확인할 수 있습니다.
- 
## EARLY-BUDDY의 다른 프로젝트
* [ANDROID](https://github.com/EARLY-BUDDY/EARLY-BUDDY-ANDROID)
* [IOS](https://github.com/EARLY-BUDDY/EARLYBUDDY-iOS)
