# 스타일 가이드 (Style Guide)

이 문서는 Pod Request Access Landing Page 프로젝트의 디자인 시스템을 정리한 가이드입니다.

---

## 01. 색상 (Colors)

### Green (주요 브랜드 색상)
- **HEX**: `#54E6AF`
- **RGB**: `84, 230, 175`
- **HSL**: `157°, 74%, 62%`

### Blue (블루 계열 - 4가지 톤)

#### Blue-950 (가장 어두운 블루)
- **HEX**: `#121725`
- **RGB**: `18, 23, 37`
- **HSL**: `224°, 35%, 11%`

#### Blue-900
- **HEX**: `#2C344B`
- **RGB**: `44, 52, 75`
- **HSL**: `225°, 26%, 23%`

#### Blue-600
- **HEX**: `#5A668A`
- **RGB**: `90, 102, 138`
- **HSL**: `225°, 21%, 45%`

#### Blue-300 (가장 밝은 블루)
- **HEX**: `#C2CBE5`
- **RGB**: `194, 203, 229`
- **HSL**: `225°, 40%, 83%`

### White (흰색)
- **HEX**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **HSL**: `0°, 0%, 100%`

### Red (에러 표시용)
- **HEX**: `#FB3E3E`
- **RGB**: `251, 60, 60`
- **HSL**: `0°, 96%, 61%`

---

## 02. 타이포그래피 (Typography)

### 폰트 패밀리 (Font Family)
- **Primary Font**: Chivo

### Text Preset 1 - Chivo Light (All Uppercase)
**대형 헤드라인용 스타일**
- **Font Weight**: Light
- **Font Size**: `48px`
- **Line Height**: `120%` (57.6px)
- **Letter Spacing**: `0px`
- **Transform**: ALL UPPERCASE

**사용 예시**: 메인 페이지 제목, 큰 헤드라인

### Text Preset 2 - Chivo Light
**본문 텍스트용 스타일**
- **Font Weight**: Light
- **Font Size**: `18px`
- **Line Height**: `150%` (27px)
- **Letter Spacing**: `0px`

**사용 예시**: 설명 문구, 일반 본문

### Text Preset 3 - Chivo Bold
**강조 텍스트용 스타일**
- **Font Weight**: Bold
- **Font Size**: `14px`
- **Line Height**: `200%` (28px)
- **Letter Spacing**: `0px`

**사용 예시**: 버튼 텍스트, 강조가 필요한 짧은 텍스트

---

## 03. 간격 시스템 (Spacing)

디자인에서 일관된 간격을 유지하기 위한 spacing 토큰입니다.

| 토큰 이름 | 값 (px) | 사용 용도 예시 |
|---------|---------|--------------|
| 1300 | 104px | 섹션 간 매우 큰 간격 |
| 1100 | 88px | 큰 섹션 간격 |
| 1000 | 80px | 주요 섹션 간격 |
| 800 | 64px | 중간 섹션 간격 |
| 700 | 56px | 카드/컴포넌트 간격 |
| 500 | 40px | 중간 여백 |
| 400 | 32px | 일반적인 여백 |
| 300 | 24px | 작은 여백 |
| 200 | 16px | 요소 간 간격 |
| 100 | 8px | 최소 간격 |
| 50 | 4px | 매우 작은 간격 |

---

## CSS Variables 구현 예시

위 디자인 토큰들을 CSS 변수로 활용하면 유지보수가 쉬워집니다:

```css
:root {
  /* Colors */
  --color-green: #54E6AF;
  --color-blue-950: #121725;
  --color-blue-900: #2C344B;
  --color-blue-600: #5A668A;
  --color-blue-300: #C2CBE5;
  --color-white: #FFFFFF;
  --color-red: #FB3E3E;
  
  /* Typography */
  --font-family-primary: 'Chivo', sans-serif;
  
  /* Spacing */
  --spacing-1300: 104px;
  --spacing-1100: 88px;
  --spacing-1000: 80px;
  --spacing-800: 64px;
  --spacing-700: 56px;
  --spacing-500: 40px;
  --spacing-400: 32px;
  --spacing-300: 24px;
  --spacing-200: 16px;
  --spacing-100: 8px;
  --spacing-50: 4px;
}
```

---

## 접근성 참고사항

- **색상 대비**: 텍스트와 배경 간 명도 대비가 WCAG AA 기준(4.5:1) 이상인지 확인하세요
- **폰트 크기**: 본문 텍스트는 최소 16px 이상 권장 (현재 18px로 설정되어 접근성 양호)
- **Line Height**: 텍스트 가독성을 위해 최소 120% 이상 유지 (모든 프리셋 충족)
