//몇분전 표기 함수
import {  } from "../types/product";

export function timeAgo(product:Product): string{

  const now = new Date();
  const createdAt = new Date(product.createdAt);

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