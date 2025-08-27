//회원가입 닉네임 유효성 함수
//닉네임에 특수문자, 공백금지, 8글자

export const nicknameValidator = {

  validate: (nickname: string): boolean => {
    //  공백, 특수문자 포함 여부 검사
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(nickname)) {
      return false;
    }

    // 글자 수 제한 (1자 이상 8자 이하)
    if (nickname.length < 1 || nickname.length > 8) {
      return false;
    }

    return true;
  },

getErrorMessage: (nickname: string): string => {
    // 공백 또는 특수문자가 포함된 경우
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    if (!regex.test(nickname)) {
      return "특수문자 및 공백을 제외하고 입력해주세요.";
    }

    // 글자 수 제한에 걸린 경우
    if (nickname.length < 1 || nickname.length > 8) {
      return "닉네임은 1글자 이상 8글자 이내로 입력해주세요.";
    }

    // 이 외의 경우에는 에러 없음
    return "";
  },
};