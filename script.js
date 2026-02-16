/**
 * ====================================
 * 이메일 폼 유효성 검사 모듈
 * ====================================
 * 
 * @file script.js
 * @description 
 * 팟캐스트 랜딩 페이지의 이메일 구독 폼 유효성 검사를 담당합니다.
 * 
 * ## 핵심 기능
 * 1. 이메일 형식 검증 (정규식 기반)
 * 2. 실시간 에러 메시지 표시/제거
 * 3. 접근성 속성(aria-invalid) 동적 관리
 * 
 * ## UX 플로우
 * - 빈 이메일 제출 → "Oops! Please add your email"
 * - 잘못된 형식 제출 → "Oops! Please check your email"
 * - 사용자 입력 시작 → 에러 메시지 즉시 제거 (불필요한 불안감 해소)
 * - 유효한 이메일 제출 → alert 알림 (프로덕션: 서버 API 호출 필요)
 * 
 * ## 디자인 결정 사항
 * - 브라우저 기본 검증 비활성화 (novalidate): 일관된 UX 제공
 * - 에러 시 입력 필드에 빨간 테두리 추가: 시각적 피드백
 * - 에러 메시지를 폼 외부 배치: 레이아웃 shift 방지
 * 
 * @author Frontend Mentor Team
 * @version 1.0.0
 */

/**
 * DOM이 완전히 로드된 후 이메일 폼 초기화
 * 
 * Why defer 대신 DOMContentLoaded:
 * - <script defer>로 이미 DOM 로드 후 실행되지만,
 *   명시적으로 DOMContentLoaded를 사용하여 코드 의도를 명확히 합니다.
 * 
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * @type {HTMLFormElement} 이메일 제출 폼
   */
  const form = document.getElementById('emailForm');

  /**
   * @type {HTMLInputElement} 이메일 입력 필드
   */
  const emailInput = document.getElementById('email');

  /**
   * @type {HTMLParagraphElement} 에러 메시지 표시 요소
   */
  const errorMessage = document.getElementById('emailError');

  /**
   * 이메일 유효성 검사를 위한 정규식 패턴
   * 
   * 패턴 설명:
   * - ^[^\s@]+: @앞에 공백/@ 제외 1개 이상 문자 필수
   * - @: @ 기호 필수
   * - [^\s@]+: @뒤 도메인명 필수 (공백/@ 제외)
   * - \.: 마침표(.) 필수
   * - [^\s@]+$: 최상위 도메인(.com 등) 필수
   * 
   * 통과 예시: user@example.com, test.user@domain.co.kr
   * 실패 예시: user@, @example.com, user@domain, user @domain.com
   * 
   * @constant {RegExp}
   */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * ========================================
   * 폼 제출 이벤트 핸들러
   * ========================================
   * 
   * 로직 흐름:
   * 
   * 1단계: 기본 동작 방지
   *   └─ preventDefault()로 페이지 새로고침 차단
   * 
   * 2단계: 유효성 검사 (2가지 검증)
   *   ├─ 첫 번째: 빈 값 검사
   *   │   └─ 실패 시 → "Please add your email" + 함수 종료
   *   └─ 두 번째: 이메일 형식 검사 (정규식)
   *       └─ 실패 시 → "Please check your email" + 함수 종료
   * 
   * 3단계: 성공 처리
   *   ├─ 에러 메시지 제거
   *   ├─ 폼 초기화 (입력값 비우기)
   *   └─ 성공 알림 표시
   * 
   * Why 단계별 검증:
   * 빈 값과 형식 오류를 구분하여 사용자에게 명확한 피드백을 제공합니다.
   * (예: "이메일을 입력하세요" vs "이메일 형식이 올바르지 않습니다")
   * 
   * @param {Event} event - 폼 제출 이벤트 객체
   * @listens submit
   */
  form.addEventListener('submit', function (event) {
    /* 1단계: 기본 제출 동작 차단 (페이지 새로고침 방지) */
    event.preventDefault();

    /**
     * @type {string} 입력된 이메일 값 (앞뒤 공백 제거)
     * 
     * Why trim():
     * 사용자가 실수로 공백을 입력한 경우를 처리하여
     * "example@test.com "과 "example@test.com"을 동일하게 취급합니다.
     */
    const emailValue = emailInput.value.trim();

    /* 
     * 2단계-1: 빈 값 검증
     * 
     * Why 먼저 검사:
     * 정규식 검사 전에 빈 값을 먼저 확인하여
     * 불필요한 연산을 줄이고 더 구체적인 에러 메시지를 제공합니다.
     * 
     * Result (실패 시):
     * - 에러 메시지: "Oops! Please add your email"
     * - 입력 필드: 빨간 테두리 표시 (aria-invalid="true")
     * - 스크린 리더: "유효하지 않은 입력" 음성 안내
     * - 함수 종료: return으로 이후 코드 실행 방지
     */
    if (emailValue === '') {
      showError('Oops! Please add your email');
      return;
    }

    /* 
     * 2단계-2: 이메일 형식 검증
     * 
     * Why 정규식 검증:
     * 서버에 잘못된 요청을 보내기 전에 클라이언트에서 1차 필터링하여
     * 불필요한 네트워크 트래픽과 서버 부하를 줄입니다.
     * 
     * Result (실패 시):
     * - 에러 메시지: "Oops! Please check your email"
     * - 사용자는 입력값을 재확인하고 수정할 수 있습니다
     */
    if (!emailPattern.test(emailValue)) {
      showError('Oops! Please check your email');
      return;
    }

    /* 
     * 3단계: 유효성 검사 통과 - 성공 처리
     * 
     * 프로덕션 개선 사항:
     * TODO: fetch API로 서버에 이메일 전송
     * TODO: 로딩 스피너 표시 (네트워크 지연 대비)
     * TODO: 서버 응답에 따라 성공/실패 UI 분기
     * TODO: 에러 발생 시 재시도 옵션 제공
     */
    clearError();

    /* 임시: 개발 환경에서 디버깅용 로그 */
    console.log('Email submitted successfully:', emailValue);

    /* 임시: 입력 필드 초기화 */
    form.reset();

    /* 
     * 임시: 성공 알림
     * 
     * 프로덕션 개선:
     * alert() 대신 toast 알림이나 별도 성공 페이지로 전환하여
     * 더 나은 UX를 제공해야 합니다.
     */
    alert('Thank you! We will notify you when we launch.');
  });

  /**
   * ========================================
   * 입력 필드 변경 이벤트 핸들러
   * ========================================
   * 
   * Why 실시간 에러 제거:
   * 사용자가 수정을 시작하자마자 에러를 지워서
   * 부정적인 피드백을 최소화하고 재입력을 장려합니다.
   * 
   * UX Result:
   * - 사용자가 첫 글자를 입력하면 즉시 빨간 테두리와 에러 메시지 제거
   * - "내가 수정하고 있구나"는 긍정적 신호 전달
   * - 불필요하게 오래 남아있는 에러 메시지로 인한 불안감 해소
   * 
   * @listens input
   */
  emailInput.addEventListener('input', function () {
    if (errorMessage.textContent !== '') {
      clearError();
    }
  });

  /**
   * 에러 메시지를 표시하는 헬퍼 함수
   * 
   * 실행 순서:
   * 1. 에러 메시지 텍스트 설정
   * 2. aria-invalid="true" 속성 추가
   *    └─ 스크린 리더가 "유효하지 않은 입력"임을 음성으로 알림
   * 
   * CSS 효과:
   * - .form-group__input[aria-invalid="true"] 선택자로
   *   빨간 테두리(border-color: var(--color-red)) 자동 적용
   * 
   * @param {string} message - 표시할 에러 메시지
   * @returns {void}
   */
  function showError(message) {
    errorMessage.textContent = message;
    emailInput.setAttribute('aria-invalid', 'true');
  }

  /**
   * 에러 메시지를 제거하는 헬퍼 함수
   * 
   * 실행 순서:
   * 1. 에러 메시지 텍스트 초기화 (빈 문자열)
   * 2. aria-invalid 속성 제거
   *    └─ 스크린 리더에게 "이제 유효한 상태"임을 알림
   * 
   * CSS 효과:
   * - aria-invalid 속성이 제거되어 빨간 테두리 사라짐
   * - 원래 테두리(투명)로 복원
   * 
   * @returns {void}
   */
  function clearError() {
    errorMessage.textContent = '';
    emailInput.removeAttribute('aria-invalid');
  }
});
