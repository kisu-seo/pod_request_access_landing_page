// ====================================
// 이메일 폼 유효성 검사
// ====================================

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 폼 요소 가져오기
  const form = document.getElementById('emailForm');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('emailError');
  
  // 이메일 유효성 검사를 위한 정규식 패턴
  // 설명: @ 앞뒤로 문자가 있고, 마지막에 도메인(.com 등)이 있는지 확인
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // 폼 제출 이벤트 리스너
  form.addEventListener('submit', function(event) {
    // 기본 제출 동작 막기 (페이지 새로고침 방지)
    event.preventDefault();
    
    // 입력된 이메일 값 가져오기 (앞뒤 공백 제거)
    const emailValue = emailInput.value.trim();
    
    // 이메일이 비어있는지 확인
    if (emailValue === '') {
      showError('Oops! Please add your email'); // 에러 메시지 표시
      return; // 함수 종료
    }
    
    // 이메일 형식이 올바른지 확인
    if (!emailPattern.test(emailValue)) {
      showError('Oops! Please check your email'); // 에러 메시지 표시
      return; // 함수 종료
    }
    
    // 유효성 검사를 통과한 경우
    clearError(); // 에러 메시지 제거
    
    // TODO: 실제로는 여기서 서버로 데이터를 전송해야 합니다
    // 예시: fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email: emailValue }) })
    
    // 임시: 콘솔에 성공 메시지 출력
    console.log('Email submitted successfully:', emailValue);
    
    // 임시: 폼 초기화
    form.reset();
    
    // 임시: 성공 알림 (실제로는 별도 UI로 표시해야 함)
    alert('Thank you! We will notify you when we launch.');
  });
  
  // 입력 필드에서 타이핑할 때마다 에러 메시지 제거
  emailInput.addEventListener('input', function() {
    if (errorMessage.textContent !== '') {
      clearError(); // 에러 메시지 초기화
    }
  });
  
  // 에러 메시지를 표시하는 함수
  function showError(message) {
    errorMessage.textContent = message; // 에러 메시지 설정
    emailInput.setAttribute('aria-invalid', 'true'); // 접근성: 유효하지 않음 표시
  }
  
  // 에러 메시지를 제거하는 함수
  function clearError() {
    errorMessage.textContent = ''; // 에러 메시지 초기화
    emailInput.removeAttribute('aria-invalid'); // 접근성 속성 제거
  }
});
