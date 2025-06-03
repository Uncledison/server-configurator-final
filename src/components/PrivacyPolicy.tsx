import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  // 컴포넌트가 열릴 때 맨 위로 부드럽게 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로 돌아가기
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-lg font-bold text-white">Serveria</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">개인정보 보호정책</h1>
              <p className="text-slate-300">
                Serveria는 고객의 개인정보를 소중히 여기며, 관련 법령을 준수합니다.
              </p>
              <div className="text-sm text-slate-400 mt-2">
                최종 업데이트: 2025년 6월 3일
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              {/* 1. 개인정보의 수집 및 이용목적 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  1. 개인정보의 수집 및 이용목적
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>Serveria는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>서비스 제공 및 회원 관리</li>
                    <li>서버 구성 데이터 저장 및 관리</li>
                    <li>고객 문의 및 기술 지원</li>
                    <li>서비스 개선 및 맞춤형 서비스 제공</li>
                    <li>마케팅 및 광고 활용 (동의 시)</li>
                    <li>법령상 의무 이행</li>
                  </ul>
                </div>
              </section>

              {/* 2. 수집하는 개인정보의 항목 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  2. 수집하는 개인정보의 항목
                </h2>
                <div className="text-slate-300 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">회원가입 시 수집 항목</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>필수항목:</strong> 이메일 주소, 비밀번호, 이름</li>
                      <li><strong>선택항목:</strong> 회사명, 전화번호, 부서</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">서비스 이용 과정에서 수집되는 항목</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>서버 구성 데이터, 저장된 프로젝트 정보</li>
                      <li>서비스 이용 기록, 접속 로그, 쿠키</li>
                      <li>기기 정보 (IP주소, 브라우저 정보)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 개인정보의 보유 및 이용기간 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  3. 개인정보의 보유 및 이용기간
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li><strong>회원 정보:</strong> 회원 탈퇴 시까지 (탈퇴 후 즉시 삭제)</li>
                      <li><strong>서비스 이용 기록:</strong> 3년 (통신비밀보호법)</li>
                      <li><strong>결제 기록:</strong> 5년 (전자상거래법)</li>
                      <li><strong>고객 문의 기록:</strong> 3년</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    단, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 기간 동안 보관합니다.
                  </p>
                </div>
              </section>

              {/* 4. 개인정보의 제3자 제공 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  4. 개인정보의 제3자 제공
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>Serveria는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.</p>
                  <p>다만, 다음의 경우에는 예외적으로 제공할 수 있습니다:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                    <li>이용자의 사전 동의를 받은 경우</li>
                  </ul>
                </div>
              </section>

              {/* 5. 개인정보처리의 위탁 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  5. 개인정보처리의 위탁
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>Serveria는 서비스 품질 향상을 위해 아래와 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2">수탁업체</th>
                          <th className="text-left py-2">위탁업무</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-2">Supabase Inc.</td>
                          <td className="py-2">회원 정보 저장 및 인증</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2">Vercel Inc.</td>
                          <td className="py-2">웹 호스팅 및 서비스 운영</td>
                        </tr>
                        <tr>
                          <td className="py-2">Google Analytics</td>
                          <td className="py-2">서비스 이용 통계 분석</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* 6. 정보주체의 권리 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  6. 정보주체의 권리
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>개인정보 처리현황 통지 요구</li>
                    <li>개인정보 열람 요구</li>
                    <li>개인정보 정정·삭제 요구</li>
                    <li>개인정보 처리정지 요구</li>
                    <li>손해배상 요구</li>
                  </ul>
                  <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-400/30 mt-4">
                    <p className="text-blue-300">
                      <strong>권리 행사 방법:</strong> 개인정보보호책임자에게 이메일, 전화, 방문 등을 통해 요청하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. 개인정보의 파기절차 및 방법 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  7. 개인정보의 파기절차 및 방법
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">파기절차</h3>
                    <p>보유기간이 만료되거나 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때는 지체없이 해당 개인정보를 파기합니다.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">파기방법</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>전자적 파일:</strong> 기록을 재생할 수 없도록 로우레벨포맷 등의 방법을 이용하여 파기</li>
                      <li><strong>종이 문서:</strong> 분쇄하거나 소각하여 파기</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 8. 개인정보보호책임자 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  8. 개인정보보호책임자
                </h2>
                <div className="text-slate-300 space-y-4">
                  <p>Serveria는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.</p>
                  
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-3">개인정보보호책임자</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <strong className="w-20">성명:</strong>
                        <span>김서버 (대표이사)</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-blue-400" />
                        <strong className="w-16">이메일:</strong>
                        <span>privacy@serveria.co.kr</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-green-400" />
                        <strong className="w-16">전화:</strong>
                        <span>02-1234-5678</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1 text-red-400" />
                        <strong className="w-16">주소:</strong>
                        <span>서울특별시 강남구 테헤란로 123, Serveria빌딩 10층</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-400/30">
                    <p className="text-yellow-300">
                      <strong>개인정보 침해신고센터:</strong> privacy.go.kr (privacy.go.kr, 국번없이 182)<br />
                      <strong>개인정보 분쟁조정위원회:</strong> www.kopico.go.kr (1833-6972)<br />
                      <strong>대검찰청 사이버범죄수사단:</strong> www.spo.go.kr (02-3480-3571)
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. 쿠키 운영 및 거부 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  9. 쿠키(Cookie) 운영 및 거부
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>Serveria는 개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">쿠키 사용 목적</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>로그인 상태 유지</li>
                      <li>사용자 설정 저장</li>
                      <li>서비스 이용 통계 분석</li>
                      <li>맞춤형 서비스 제공</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <p><strong>쿠키 거부 방법:</strong></p>
                    <p className="text-sm mt-2">웹브라우저 설정에서 쿠키 허용/차단을 선택할 수 있습니다. 단, 쿠키를 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.</p>
                  </div>
                </div>
              </section>

              {/* 10. 개인정보 처리방침 변경 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  10. 개인정보 처리방침의 변경
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <ul className="space-y-1 text-sm">
                      <li><strong>공고일자:</strong> 2025년 6월 3일</li>
                      <li><strong>시행일자:</strong> 2025년 6월 3일</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <button 
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
