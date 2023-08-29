import { NextResponse } from "next/server";

export default function ErrorResponse({
  pathname,
  status,
  error,
  reason,
}: ErrorPayload) {
  // API 요청에 대해 JSON 형태의 응답 전달
  if (pathname.includes("/api/")) {
    return NextResponse.json<ErrorBody>(
      { error: error ?? "Unknown Error", reason, pathname },
      { status }
    );
  }

  // 일반 홈페이지 요청에 대해 특정 오류 페이지로 리다이렉트 처리
  else {
    return NextResponse.redirect(`/error/${status}`, { status });
  }
}

interface ErrorBody {
  error: string;
  pathname: string;
  reason?: string | string[];
}

export interface ErrorPayload {
  // API 요청인지 홈페이지 요청인지 구분하기 위해 사용된다.
  pathname: string;

  error?: string;
  status: number;
  reason?: string | string[];
}
