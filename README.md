# TOY PROJECT - 오목 온라인 (클라이언트)

2인 멀티플레이가 가능한 오목 게임 웹 어플리케이션입니다.
<br>
직접 방을 생성하거나 다른 사람이 생성한 방에 들어가서 상대방과 오목을 플레이할 수 있습니다.
<br>

- [오목 온라인 Live Page](http://omok.kinzup.com)
  <br>
- [Repository for Server Code](https://github.com/KINZ-UP/omok_server)

<br>

_Fig. 1 Screenshot_
<br>
<img src="./images/playing01.png" width="500" style="text-align: center">
<br>

## Dev Stacks

**ReactJS**, ReduxJS, Redux-saga, styled-components, socket-io
<br>
AWS S3, AWS Route

<br>

## How to Use

회원가입 / 로그인 후 게임 로비에서 **새게임** 버튼을 클릭하여 방을 만들거나 다른 사람이 만들 방에 접속하여 플레이합니다.
<br>
방 생성시 공개/비공개 여부를 설정할 수 있으며, 게임 제한시간 및 오목판의 한변의 칸수를 설정할 수 있습니다.

<br>

## Game Rules

- 일반적인 오목룰에 따라 흑과 백이 돌아가면서 빈 칸에 돌을 놓습니다.
- 어느 한 색깔의 돌이 연이어 5개 놓이는 _오목_ 상태가 되면 해당 플레이어가 승리합니다.
- 렌주룰을 적용하여 흑은 쌍삼 자리에 착수할 수 없으며, 육목 이상의 경우 승리 조건(오목)으로 인정하지 않습니다.
- 백은 돌이 놓이지 않은 모든 곳에 제약없이 착수할 수 있으며, 육목 이상의 모양도 승리 조건을 만족한 것으로 인정합니다.
- 제한 시간 안에 돌을 놓지 않으면 시간패합니다.

<br>

## Key Features

### Fully Responsive Layout

### Auto Renewing of Game List

### Handling User Disconnection

### 금수 룰 적용

<br><br>

## How to Install

### Clone Repository

```bash
git clone
```

### Install Packages

```js
npm i

// or if using yarn

yarn
```

### Execute

```js
npm start

// or

yarn start
```

### Add Environmental Variables

_.dev_

```
REACT_APP_BASE_URL=INSERT_SERVER_URL_HERE
```

root 폴더에 _.dev_ 를 생성하여 **REACT_APP_BASE_URL** 변수에 서버 URL을 입력합니다.
<br>

[서버 Repository](https://github.com/KINZ-UP/omok_server)
