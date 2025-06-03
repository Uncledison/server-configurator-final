import React, { useEffect } from 'react';
import { ArrowLeft, Cookie, Shield, BarChart3, Settings, Globe, Mail, Phone } from 'lucide-react';

interface CookiePolicyProps {
  onBack: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack }) => {
  // 컴포넌트가 열릴 때 맨 위로 부드럽게 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 상단 네비게이션 */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>홈으로 돌아가기</span>
            </button>
            <div className="flex items-center space-x-2">
              <Cookie className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Serveria</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <div className="pt-16 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          
          {/* 페이지 제목 */}
          <div className="p-8 border-b border-white/20">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Cookie className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">쿠키 정책</h1>
                <p className="text-slate-400 mt-1">Cookie Policy</p>
              </div>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div className="p-8 text-slate-300 space-y-8">
            {/* 소개 */}
            <section>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <Cookie className="h-6 w-6 text-blue-400 mr-3" />
                  쿠키란 무엇인가요?
                </h2>
                <p className="leading-relaxed">
                  쿠키(Cookie)는 웹사이트가 귀하의 브라우저에 저장하는 작은 텍스트 파일입니다. 
                  Serveria는 개선된 서비스 제공과 사용자 경험 향상을 위해 쿠키를 사용합니다.
                </p>
              </div>
            </section>

            {/* 사용 목적 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">쿠키 사용 목적</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="text-green-400 font-semibold mb-2">✅ 필수 기능</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 로그인 상태 유지</li>
                    <li>• 서버 구성 임시 저장</li>
                    <li>• 보안 및 인증</li>
                  </ul>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">📊 성능 분석</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 웹사이트 방문 통계</li>
                    <li>• 사용자 행동 분석</li>
                    <li>• 서비스 개선</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 쿠키 유형 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">사용하는 쿠키 유형</h2>
              
              <div className="space-y-6">
                {/* 필수 쿠키 */}
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-green-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">필수 쿠키</h3>
                    <span className="ml-auto bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">항상 활성</span>
                  </div>
                  <p className="mb-4">웹사이트의 기본 기능을 위해 반드시 필요한 쿠키입니다.</p>
                  <div className="bg-slate-700/50 rounded p-4">
                    <strong className="text-white">사용 예시:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• 사용자 인증 및 로그인 세션 유지</li>
                      <li>• 서버 구성 작업 중 데이터 임시 저장</li>
                      <li>• 보안 토큰 및 CSRF 방지</li>
                      <li>• 사용자 기본 설정 (언어, 테마)</li>
                    </ul>
                  </div>
                </div>

                {/* 성능 쿠키 */}
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">성능 및 분석 쿠키</h3>
                    <span className="ml-auto bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">선택적</span>
                  </div>
                  <p className="mb-4">웹사이트 성능을 분석하고 사용자 경험을 개선하기 위한 쿠키입니다.</p>
                  <div className="bg-slate-700/50 rounded p-4">
                    <strong className="text-white">제3자 서비스:</strong>
                    <ul className="mt-2 space-y-2">
                      <li>
                        <strong className="text-blue-400">• Google Analytics:</strong> 웹사이트 방문 통계, 사용자 행동 분석
                      </li>
                      <li>
                        <strong className="text-purple-400">• Vercel Analytics:</strong> 페이지 성능 및 로딩 시간 분석
                      </li>
                      <li>
                        <strong className="text-green-400">• Hotjar (선택적):</strong> 사용자 경험 개선을 위한 히트맵 분석
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 기능 쿠키 */}
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="h-6 w-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">기능 쿠키</h3>
                    <span className="ml-auto bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">선택적</span>
                  </div>
                  <p className="mb-4">향상된 기능과 개인화된 경험을 제공하기 위한 쿠키입니다.</p>
                  <div className="bg-slate-700/50 rounded p-4">
                    <strong className="text-white">사용 예시:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• 최근 구성한 서버 설정 기억</li>
                      <li>• 자주 사용하는 부품 추천</li>
                      <li>• 대시보드 레이아웃 설정</li>
                      <li>• 알림 및 팝업 표시 설정</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 쿠키 관리 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">쿠키 관리 방법</h2>
              
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-3">
                  <Globe className="h-6 w-6 text-yellow-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">브라우저 설정</h3>
                </div>
                <p className="mb-4">대부분의 웹 브라우저에서 쿠키를 관리할 수 있습니다:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-white">Chrome:</strong>
                    <p>설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</p>
                  </div>
                  <div>
                    <strong className="text-white">Firefox:</strong>
                    <p>설정 → 개인정보 및 보안 → 쿠키 및 사이트 데이터</p>
                  </div>
                  <div>
                    <strong className="text-white">Safari:</strong>
                    <p>환경설정 → 개인정보 → 쿠키 및 웹사이트 데이터</p>
                  </div>
                  <div>
                    <strong className="text-white">Edge:</strong>
                    <p>설정 → 쿠키 및 사이트 권한 → 쿠키 및 저장된 데이터</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-red-400 font-semibold mb-3">⚠️ 중요 알림</h3>
                <p className="text-sm">
                  쿠키를 비활성화하면 일부 웹사이트 기능이 제대로 작동하지 않을 수 있습니다. 
                  특히 로그인, 서버 구성 저장, 개인화된 추천 기능 등이 영향을 받을 수 있습니다.
                </p>
              </div>
            </section>

            {/* 업데이트 정보 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">정책 업데이트</h2>
              <div className="bg-slate-800/50 rounded-lg p-6">
                <p className="mb-4">
                  이 쿠키 정책은 서비스 개선 및 법적 요구사항 변경에 따라 업데이트될 수 있습니다. 
                  중요한 변경사항이 있을 경우 웹사이트를 통해 공지하겠습니다.
                </p>
                <div className="bg-slate-700/50 p-4 rounded">
                  <p><strong>최초 공고일:</strong> 2025년 6월 3일</p>
                  <p><strong>최종 수정일:</strong> 2025년 6월 3일</p>
                  <p><strong>시행일:</strong> 2025년 6월 3일</p>
                </div>
              </div>
            </section>

            {/* 문의처 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">문의처</h2>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6">
                <p className="mb-4 text-white font-semibold">쿠키 정책에 대한 문의사항이 있으시면 언제든 연락해 주세요:</p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-400 mr-3" />
                    <span><strong>이메일:</strong> privacy@serveria.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-400 mr-3" />
                    <span><strong>전화:</strong> 02-1234-5678 (평일 09:00-18:00)</span>
                  </div>
                  <div className="flex items-start">
                    <Settings className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                    <div>
                      <strong>주소:</strong> 서울특별시 강남구 테헤란로 123<br />
                      <span className="text-slate-400">Serveria 개인정보보호팀</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* 하단 CTA */}
          <div className="border-t border-white/20 p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-slate-300 mb-2">
                본 약관을 숙지하시고 서비스를 이용해 주시기 바랍니다.
              </p>
              <p className="text-slate-400 text-sm mb-6">
                약관에 대한 질문이나 불분명한 사항이 있으시면 언제든 문의해 주세요.
              </p>
              <button 
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>홈으로 돌아가기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
