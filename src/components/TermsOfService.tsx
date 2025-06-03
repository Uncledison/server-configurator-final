import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, CreditCard, Shield } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
              <FileText className="h-6 w-6 text-white" />
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
              <h1 className="text-4xl font-bold text-white mb-4">서비스 이용약관</h1>
              <p className="text-slate-300">
                Serveria 서비스 이용에 관한 기본적인 사항을 규정합니다.
              </p>
              <div className="text-sm text-slate-400 mt-2">
                최종 업데이트: 2025년 6월 3일 | 시행일: 2025년 6월 3일
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              {/* 제1조 목적 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제1조 (목적)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>
                    이 약관은 Serveria(이하 "회사")가 제공하는 서버 구성 서비스(이하 "서비스")의 이용과 관련하여 
                    회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                  </p>
                </div>
              </section>

              {/* 제2조 정의 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제2조 (정의)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                  <div className="bg-slate-800/50 p-6 rounded-lg space-y-4">
                    <div>
                      <span className="text-blue-400 font-semibold">1. "서비스"</span>
                      <p className="ml-4 mt-1">회사가 제공하는 온라인 서버 구성 도구 및 관련 서비스 일체</p>
                    </div>
                    <div>
                      <span className="text-blue-400 font-semibold">2. "이용자"</span>
                      <p className="ml-4 mt-1">이 약관에 따라 회사의 서비스를 받는 회원 및 비회원</p>
                    </div>
                    <div>
                      <span className="text-blue-400 font-semibold">3. "회원"</span>
                      <p className="ml-4 mt-1">회사와 서비스 이용계약을 체결하고 이용자 아이디를 부여받은 자</p>
                    </div>
                    <div>
                      <span className="text-blue-400 font-semibold">4. "계정"</span>
                      <p className="ml-4 mt-1">회원 식별과 서비스 이용을 위해 회원이 설정한 이메일과 비밀번호의 조합</p>
                    </div>
                    <div>
                      <span className="text-blue-400 font-semibold">5. "콘텐츠"</span>
                      <p className="ml-4 mt-1">서비스에서 이용자가 생성한 서버 구성 데이터, 사양서 등 모든 정보</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 제3조 약관의 명시와 설명 및 개정 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제3조 (약관의 명시와 설명 및 개정)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 약관의 명시</span>
                    <p className="ml-4 mt-1">회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기화면에 게시합니다.</p>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 약관의 개정</span>
                    <p className="ml-4 mt-1">회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있으며, 
                    개정된 약관은 시행일 7일 이전부터 공지합니다.</p>
                  </div>
                  <div>
                    <span className="text-white font-medium">③ 개정 약관의 효력</span>
                    <p className="ml-4 mt-1">개정된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있으며, 
                    계속 이용하는 경우 개정된 약관에 동의한 것으로 봅니다.</p>
                  </div>
                </div>
              </section>

              {/* 제4조 서비스의 제공 및 변경 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제4조 (서비스의 제공 및 변경)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 제공 서비스</span>
                    <p className="ml-4 mt-1">회사는 다음과 같은 서비스를 제공합니다:</p>
                    <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                      <li>드래그 앤 드롭 방식의 서버 구성 도구</li>
                      <li>실시간 호환성 검사 및 성능 계산</li>
                      <li>자동 사양서 및 견적서 생성</li>
                      <li>서버 구성 데이터 저장 및 관리</li>
                      <li>팀 협업 기능</li>
                      <li>API 연동 서비스</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 서비스의 변경</span>
                    <p className="ml-4 mt-1">회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있으며, 
                    변경 전에 해당 내용을 서비스에 공지합니다.</p>
                  </div>
                </div>
              </section>

              {/* 제5조 회원가입 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제5조 (회원가입)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 가입 신청</span>
                    <p className="ml-4 mt-1">이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 
                    의사표시를 함으로써 회원가입을 신청합니다.</p>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 가입 승낙</span>
                    <p className="ml-4 mt-1">회사는 다음 각 호에 해당하지 않는 한 회원가입을 승낙합니다:</p>
                    <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                      <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                      <li>허위 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                      <li>이미 가입된 회원과 이메일 주소가 동일한 경우</li>
                      <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 제6조 이용자의 의무 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제6조 (이용자의 의무)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                  <div className="bg-red-600/20 p-6 rounded-lg border border-red-400/30">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-red-300 font-semibold">금지 행위</span>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                      <li>타인의 개인정보를 도용하거나 허위 정보를 등록하는 행위</li>
                      <li>회사의 서비스 정보를 이용하여 얻은 정보를 무단으로 복제, 유통, 조작하는 행위</li>
                      <li>회사 및 제3자의 저작권 등 지적재산권을 침해하는 행위</li>
                      <li>회사의 동의 없이 영리목적으로 서비스를 사용하는 행위</li>
                      <li>서비스의 안정적인 운영을 방해하는 행위</li>
                      <li>바이러스, 악성코드 등을 배포하는 행위</li>
                      <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 제7조 회사의 의무 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제7조 (회사의 의무)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div className="bg-green-600/20 p-6 rounded-lg border border-green-400/30">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-green-300 font-semibold">회사의 책임</span>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                      <li>법령과 이 약관이 정하는 권리의 행사와 의무의 이행을 신의에 따라 성실하게 합니다.</li>
                      <li>이용자가 안전하게 서비스를 이용할 수 있도록 개인정보보호를 위해 보안시스템을 갖추어야 합니다.</li>
                      <li>서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정될 경우 
                      즉시 처리하여야 합니다.</li>
                      <li>계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 
                      지체 없이 이를 수리 또는 복구합니다.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 제8조 유료서비스 이용 및 결제 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제8조 (유료서비스 이용 및 결제)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 유료서비스</span>
                    <p className="ml-4 mt-1">회사는 기본 서비스 외에 프리미엄 기능을 포함한 유료서비스를 제공할 수 있습니다.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CreditCard className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-blue-300 font-medium">결제 방법</span>
                    </div>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>신용카드, 체크카드</li>
                      <li>온라인 계좌이체</li>
                      <li>휴대폰 결제</li>
                      <li>기타 회사가 정하는 결제 수단</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 환불 정책</span>
                    <p className="ml-4 mt-1">유료서비스의 환불은 전자상거래법 및 회사의 환불 정책에 따라 처리됩니다. 
                    단, 이용자의 책임 있는 사유로 인한 경우는 제외됩니다.</p>
                  </div>
                </div>
              </section>

              {/* 제9조 서비스 중단 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제9조 (서비스 중단)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 임시 중단</span>
                    <p className="ml-4 mt-1">회사는 다음의 경우 서비스 제공을 임시적으로 중단할 수 있습니다:</p>
                    <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                      <li>시스템 정기점검, 서버 교체 및 네트워크 불안정 등의 시스템 운영상 필요한 경우</li>
                      <li>정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 서비스 이용에 지장이 있는 경우</li>
                      <li>기타 불가항력적 사유가 있는 경우</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 사전 통지</span>
                    <p className="ml-4 mt-1">회사는 서비스를 일정 기간 중단해야 할 경우 그 사유와 기간을 
                    서비스 초기화면에 게시하거나 이용자에게 통지합니다.</p>
                  </div>
                </div>
              </section>

              {/* 제10조 계약 해지 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제10조 (계약 해지)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 이용자의 해지</span>
                    <p className="ml-4 mt-1">이용자는 언제든지 서비스 내 계정 관리 메뉴를 통하여 이용계약 해지를 신청할 수 있으며, 
                    회사는 관련 법령 등이 정하는 바에 따라 이를 즉시 처리합니다.</p>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 회사의 해지</span>
                    <p className="ml-4 mt-1">회사는 이용자가 다음 각 호에 해당하는 행위를 하였을 때 사전 통지 없이 
                    이용계약을 해지하거나 기간을 정하여 서비스 이용을 정지할 수 있습니다:</p>
                    <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                      <li>타인의 정보를 도용한 경우</li>
                      <li>서비스의 운영을 고의로 방해한 경우</li>
                      <li>제6조에서 금지한 행위를 한 경우</li>
                      <li>기타 관련 법령이나 이 약관을 위반한 경우</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 제11조 손해배상 및 면책조항 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제11조 (손해배상 및 면책조항)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 손해배상</span>
                    <p className="ml-4 mt-1">회사와 이용자는 서비스 이용과 관련하여 고의 또는 과실로 상대방에게 
                    손해를 끼친 경우에는 이를 배상할 책임이 있습니다.</p>
                  </div>
                  <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-400/30">
                    <div className="flex items-center mb-2">
                      <Shield className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-yellow-300 font-medium">면책사항</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우</li>
                      <li>이용자의 귀책사유로 인한 서비스 이용의 장애</li>
                      <li>이용자가 서비스를 이용하여 기대하는 수익을 상실한 것</li>
                      <li>서비스를 통하여 얻은 자료로 인한 손해</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 제12조 분쟁 해결 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  제12조 (분쟁 해결)
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div>
                    <span className="text-white font-medium">① 준거법</span>
                    <p className="ml-4 mt-1">이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국의 법을 적용합니다.</p>
                  </div>
                  <div>
                    <span className="text-white font-medium">② 관할법원</span>
                    <p className="ml-4 mt-1">서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 
                    관할하는 법원을 관할법원으로 합니다.</p>
                  </div>
                </div>
              </section>

              {/* 부칙 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/20 pb-2">
                  부칙
                </h2>
                <div className="text-slate-300 space-y-3">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li><strong>시행일:</strong> 이 약관은 2025년 6월 3일부터 시행됩니다.</li>
                      <li><strong>이전 약관:</strong> 이 약관이 시행되기 이전에 이미 가입한 회원들에게도 동일하게 적용됩니다.</li>
                      <li><strong>문의처:</strong> 본 약관에 대한 문의는 legal@serveria.co.kr로 연락하시기 바랍니다.</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  본 약관을 숙지하시고 서비스를 이용해 주시기 바랍니다.<br />
                  약관에 대한 질문이나 불분명한 사항이 있으시면 언제든 문의해 주세요.
                </p>
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
    </div>
  );
};

export default TermsOfService;
