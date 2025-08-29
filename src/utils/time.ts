//몇분전 표기 함수
import { type Product } from "../types/product";

export function timeAgo(product:Product): string{

  console.log("1. 서버에서 받은 원본 데이터:", product.createdAt);

  const now = new Date();
  const createdAt = new Date(product.createdAt + 'Z');
  console.log("3. Date 객체로 변환된 결과:", createdAt);
  console.log("4. 현재 시간(now) 객체:", now);

  const diffMilliseconds = now.getTime() - createdAt.getTime();
  const minutesPassed = Math.floor(diffMilliseconds / (1000 * 60));

  let timeAgo: string;

  if (minutesPassed < 1) {
    timeAgo = '방금 전';
  } else if (minutesPassed < 60) {
    timeAgo = `${minutesPassed}분 전`;
  } else if (minutesPassed < 60 * 24) { 
    const hours = Math.floor(minutesPassed / 60);
    timeAgo = `${hours}시간 전`;
  } else {
    timeAgo = createdAt.toLocaleDateString('ko-KR');
  } 

  return timeAgo;

  }