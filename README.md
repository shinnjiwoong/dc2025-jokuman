# CD 플레이어 웹사이트

로컬 음원을 재생할 수 있는 CD 플레이어 웹사이트입니다.

## 기능

- 6곡의 음악을 Swiper로 슬라이드하여 재생
- CD 모양의 플레이어가 음악 재생 시 회전
- 드래그로 곡 전환 가능
- 재생/정지, 이전/다음 곡 컨트롤
- 진행바와 시간 표시

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 http://localhost:3000 접속

## 음악 파일 추가

1. `public/music/` 폴더에 음악 파일을 추가하세요
2. `src/app/page.tsx` 파일의 `songs` 배열에서 파일 경로와 곡 정보를 수정하세요

예시:
```typescript
const songs: Song[] = [
  {
    id: 1,
    title: "실제 곡 제목",
    artist: "실제 아티스트명",
    src: "/music/실제파일명.mp3"
  },
  // ... 나머지 곡들
];
```

## Vercel 배포

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 import
3. 자동 배포 완료

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Swiper.js
- HTML5 Audio API
