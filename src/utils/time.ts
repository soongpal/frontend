//몇분전 표기 함수

export function timeAgo(dateString: string): string{

  const createdAt = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z');
  const now = new Date();

  const diffMilliseconds = now.getTime() - createdAt.getTime();
  const minutesPassed = Math.floor(diffMilliseconds / (1000 * 60));
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);

  if (minutesPassed < 1) {
    return '방금 전';
  }
  if (minutesPassed < 60) {
    return `${minutesPassed}분 전`;
  }
  if (hoursPassed < 24) {
    return `${hoursPassed}시간 전`;
  }
  if (daysPassed < 7) {
    return `${daysPassed}일 전`;
  }
  
  return createdAt.toLocaleDateString('ko-KR');
}