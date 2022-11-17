# GameDuo_Cache-Backend

> 개발 기간 : 2022년 11월 14일 ~ 11월 15일 (2일)

> 추가 사항 구현 & 리팩토링(Refactoring) : 11월 16일 ~

## Description

Nest.js를 활용한 보스레이드 PVE 컨텐츠 관련 서비스 (feat. Cache)

## 기술 스택

- TypeScript
- Node.js (Nest.js)
- MySQL
- Typeorm
- Postman

## Installation

```bash
$ npm install
```
```bash
.env.sample file setting -> .env
```

## Running the app

```bash
$ npm run start:dev
```

## 프로젝트 구조

```bash
📦src
 ┣ 📂boss
 ┃ ┣ 📜boss.controller.spec.ts
 ┃ ┣ 📜boss.controller.ts
 ┃ ┣ 📜boss.module.ts
 ┃ ┣ 📜boss.service.spec.ts
 ┃ ┗ 📜boss.service.ts
 ┣ 📂caching
 ┃ ┣ 📜caching.module.ts
 ┃ ┣ 📜caching.service.spec.ts
 ┃ ┗ 📜caching.service.ts
 ┣ 📂configs
 ┃ ┗ 📜ormconfig.ts
 ┣ 📂dto
 ┃ ┗ 📜raid.dto.ts
 ┣ 📂entities
 ┃ ┣ 📜Boss.ts
 ┃ ┗ 📜Users.ts
 ┣ 📂users
 ┃ ┣ 📜users.controller.spec.ts
 ┃ ┣ 📜users.controller.ts
 ┃ ┣ 📜users.module.ts
 ┃ ┣ 📜users.service.spec.ts
 ┃ ┗ 📜users.service.ts
 ┣ 📜app.controller.spec.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts

```
