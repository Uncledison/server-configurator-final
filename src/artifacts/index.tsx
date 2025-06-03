import { useState, useEffect, useMemo } from 'react';
import { Server, Cpu, HardDrive, Download, CheckCircle, ArrowRight, PlayCircle, Users, Zap, Shield, Clock, Star, ChevronDown, Menu, X, Quote, Mail, Phone, MapPin, ArrowUp, Github, Twitter, Linkedin, Youtube, CreditCard, Monitor, Building, Settings, Database, Network, Laptop, ScanLine, Layers, Router, HelpCircle, FileText, UserPlus } from 'lucide-react';

// 간단한 개인정보 보호정책 컴포넌트 (내부에 직접 작성)
const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">개인정보 보호정책</h1>
            <button 
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
          
          <div className="text-slate-300 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. 개인정보의 수집 및 이용목적</h2>
              <p>Serveria는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>회원가입 및 회원관리</li>
                <li>서비스 제공 및 계약의 이행</li>
                <li>고객상담 및 불만처리</li>
                <li>마케팅 및 광고에의 활용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. 수집하는 개인정보의 항목</h2>
              <p>수집하는 개인정보의 항목은 다음과 같습니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>필수항목: 이름, 이메일 주소, 연락처</li>
                <li>선택항목: 회사명, 부서, 직급</li>
                <li>자동수집: IP주소, 쿠키, 서비스 이용기록</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <p>개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체없이 파기합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. 개인정보보호책임자</h2>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p><strong>담당자:</strong> 개인정보보호담당자</p>
                <p><strong>연락처:</strong> privacy@serveria.com</p>
                <p><strong>전화:</strong> 02-1234-5678</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// 간단한 이용약관 컴포넌트 (내부에 직접 작성)
const TermsOfService = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">서비스 이용약관</h1>
            <button 
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
          
          <div className="text-slate-300 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">제1조 (목적)</h2>
              <p>이 약관은 Serveria가 제공하는 서버 구성 및 관련 서비스의 이용과 관련하여 회사와 이용자간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">제2조 (정의)</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>서비스:</strong> Serveria가 제공하는 서버 구성 도구 및 관련 서비스</li>
                <li><strong>이용자:</strong> 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원</li>
                <li><strong>회원:</strong> 회사에 개인정보를 제공하여 회원등록을 한 자</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">제3조 (서비스의 제공)</h2>
              <p>회사는 다음과 같은 서비스를 제공합니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>서버 하드웨어 구성 도구</li>
                <li>호환성 검증 서비스</li>
                <li>자동 견적서 생성</li>
                <li>기술 지원 및 상담</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">제4조 (서비스 이용)</h2>
              <p>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 회사의 업무상이나 기술상의 이유로 서비스가 일시 중단될 수 있습니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">문의처</h2>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p><strong>이메일:</strong> support@serveria.com</p>
                <p><strong>전화:</strong> 02-1234-5678</p>
                <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 123</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// 서버 부품 타입 정의
interface ServerComponent {
  id: string;
  name: string;
  category: 'cpu' | 'memory' | 'storage' | 'network';
  price: number;
  specs: Record<string, any>;
  icon: React.ReactNode;
  compatibility?: string[];
}

// 미리 정의된 서버 부품들
const serverComponents: ServerComponent[] = [
  {
    id: 'cpu-1',
    name: 'Intel Xeon E5-2690 v4',
    category: 'cpu',
    price: 450000,
    specs: { cores: 14, threads: 28, baseClock: '2.6GHz', socket: 'LGA2011-3' },
    icon: <Cpu className="h-6 w-6" />
  },
  {
    id: 'cpu-2',
    name: 'AMD EPYC 7543P',
    category: 'cpu',
    price: 890000,
    specs: { cores: 32, threads: 64, baseClock: '2.8GHz', socket: 'SP3' },
    icon: <Cpu className="h-6 w-6" />
  },
  {
    id: 'memory-1',
    name: 'Samsung DDR4 32GB',
    category: 'memory',
    price: 150000,
    specs: { capacity: '32GB', speed: '3200MHz', type: 'DDR4', ecc: true },
    icon: <Database className="h-6 w-6" />
  },
  {
    id: 'storage-1',
    name: 'Samsung PM1735 3.2TB',
    category: 'storage',
    price: 680000,
    specs: { capacity: '3.2TB', type: 'NVMe SSD', interface: 'PCIe 4.0', endurance: '1DWPD' },
    icon: <HardDrive className="h-6 w-6" />
  }
];

// 서버 구성 도구 컴포넌트
const ServerConfigurator = ({ onBack }: { onBack: () => void }) => {
  const [selectedComponents, setSelectedComponents] = useState<ServerComponent[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<ServerComponent | null>(null);

  const totalPrice = useMemo(() => {
    return selectedComponents.reduce((sum, component) => sum + component.price, 0);
  }, [selectedComponents]);

  const handleDragStart = (component: ServerComponent) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedComponent) {
      setSelectedComponents(prev => [...prev, draggedComponent]);
      setDraggedComponent(null);
    }
  };

  const removeComponent = (componentId: string) => {
    setSelectedComponents(prev => prev.filter(c => c.id !== componentId));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">서버 구성 도구</h1>
            <p className="text-slate-300">드래그 앤 드롭으로 서버를 구성해보세요</p>
          </div>
          <button 
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center"
          >
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            홈으로 돌아가기
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 부품 선택 영역 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">서버 부품 선택</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serverComponents.map((component) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={() => handleDragStart(component)}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 cursor-move hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-blue-400 mr-3">
                      {component.icon}
                    </div>
                    <h3 className="text-white font-semibold">{component.name}</h3>
                  </div>
                  <div className="text-sm text-slate-300 mb-4">
                    {Object.entries(component.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span>{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xl font-bold text-blue-400">
                    ₩{formatPrice(component.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 구성된 서버 영역 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">구성된 서버</h2>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 p-6 min-h-[400px]"
            >
              {selectedComponents.length === 0 ? (
                <div className="text-center text-slate-400 mt-20">
                  <Server className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>부품을 여기로 드래그하세요</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedComponents.map((component, index) => (
                    <div key={`${component.id}-${index}`} className="bg-white/20 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-blue-400 mr-3">
                          {component.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{component.name}</h4>
                          <p className="text-sm text-slate-300">₩{formatPrice(component.price)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeComponent(component.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 총 가격 */}
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
              <div className="text-center">
                <p className="text-white/80 mb-2">총 예상 가격</p>
                <p className="text-3xl font-bold text-white">₩{formatPrice(totalPrice)}</p>
              </div>
              <button className="w-full mt-4 bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                견적서 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
const ServeriaApp = () => {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 개인정보 보호정책 페이지 표시
  if (showPrivacyPolicy) {
    return <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />;
  }

  // 이용약관 페이지 표시  
  if (showTermsOfService) {
    return <TermsOfService onBack={() => setShowTermsOfService(false)} />;
  }

  // 서버 구성 도구 표시
  if (showConfigurator) {
    return <ServerConfigurator onBack={() => setShowConfigurator(false)} />;
  }

  const switchToBuilder = () => {
    setShowConfigurator(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 네비게이션 */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex items-center space-x-2">
              <Server className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Serveria</span>
            </div>

            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-slate-300 hover:text-white transition-colors">홈</button>
              <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-white transition-colors">기능</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-slate-300 hover:text-white transition-colors">사용법</button>
              <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white transition-colors">요금제</button>
              <button 
                onClick={switchToBuilder}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                체험하기
              </button>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {showMobileMenu && (
            <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
              <div className="px-6 py-4 space-y-4">
                <button onClick={() => scrollToSection('home')} className="block text-slate-300 hover:text-white transition-colors">홈</button>
                <button onClick={() => scrollToSection('features')} className="block text-slate-300 hover:text-white transition-colors">기능</button>
                <button onClick={() => scrollToSection('how-it-works')} className="block text-slate-300 hover:text-white transition-colors">사용법</button>
                <button onClick={() => scrollToSection('pricing')} className="block text-slate-300 hover:text-white transition-colors">요금제</button>
                <button 
                  onClick={switchToBuilder}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors text-left"
                >
                  체험하기
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section id="home" className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Serveria
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              전문가 수준의 서버 구성을 누구나 쉽게. 
              <br />드래그 앤 드롭으로 완성하는 서버 설계의 혁신.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={switchToBuilder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg hover:shadow-blue-500/25"
            >
              <PlayCircle className="mr-2 h-6 w-6" />
              무료로 시작하기
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/10 transition-all duration-300 inline-flex items-center"
            >
              더 알아보기
              <ArrowRight className="ml-2 h-6 w-6" />
            </button>
          </div>

          {/* 미리보기 이미지 */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-left">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 flex items-center space-x-3">
                      <Cpu className="h-6 w-6 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Intel Xeon E5</div>
                        <div className="text-slate-400 text-sm">14코어 CPU</div>
                      </div>
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3">
                      <Database className="h-6 w-6 text-green-400" />
                      <div>
                        <div className="text-white font-medium">DDR4 32GB</div>
                        <div className="text-slate-400 text-sm">ECC 메모리</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-6xl text-blue-400">+</div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 flex items-center space-x-3">
                      <HardDrive className="h-6 w-6 text-purple-400" />
                      <div>
                        <div className="text-white font-medium">NVMe SSD</div>
                        <div className="text-slate-400 text-sm">3.2TB 스토리지</div>
                      </div>
                    </div>
                    <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-4 text-center">
                      <div className="text-white font-bold">총 예상 가격</div>
                      <div className="text-cyan-400 text-xl font-bold">₩2,180,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Features 섹션 */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              서버 구성이 이렇게 <span className="text-blue-400">쉬워도 되나요?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              복잡한 서버 설계를 누구나 쉽게 할 수 있도록. Serveria가 제공하는 혁신적인 기능들을 만나보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "간편한 드래그 & 드롭",
                description: "서버와 부품을 끌어다 놓기만 하면 끝! 복잡한 설정 없이 직관적으로 서버를 구성하세요.",
                color: "blue-400"
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "실시간 호환성 체크",
                description: "호환되지 않는 조합은 미리 알려드려요. 구매 후 후회할 일이 없습니다.",
                color: "green-400"
              },
              {
                icon: <Download className="h-8 w-8" />,
                title: "자동 사양서 생성",
                description: "PDF와 세금계산서를 자동으로 생성합니다. 구매 결정이 더욱 빨라져요.",
                color: "yellow-400"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "시간 절약",
                description: "몇 시간 걸리던 서버 설계를 몇 분 만에. 소중한 시간을 아껴드립니다.",
                color: "red-400"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "팀 협업 지원",
                description: "팀원들과 실시간으로 서버 구성을 공유하고 함께 결정하세요.",
                color: "orange-400"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "B2B 특화 기능",
                description: "기업 고객을 위한 대량 주문, 할인 협상, 전용 지원팀을 제공합니다.",
                color: "cyan-400"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 h-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className={`text-${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works 섹션 */}
      <section id="how-it-works" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-purple-400">3단계</span>로 완성하는 서버 구성
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              복잡해 보이는 서버 구성, 실제로는 이렇게 간단합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Monitor className="h-12 w-12" />,
                title: "부품 선택",
                description: "필요한 서버 부품들을 카탈로그에서 선택하세요. CPU, 메모리, 스토리지 등 모든 부품이 준비되어 있습니다."
              },
              {
                step: "02", 
                icon: <Settings className="h-12 w-12" />,
                title: "드래그 & 구성",
                description: "선택한 부품들을 드래그해서 서버 구성 영역에 배치하세요. 실시간으로 호환성을 확인할 수 있습니다."
              },
              {
                step: "03",
                icon: <Download className="h-12 w-12" />,
                title: "견적서 다운로드",
                description: "완성된 구성의 견적서를 PDF로 다운로드하세요. 바로 구매 진행이나 팀 공유가 가능합니다."
              }
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="text-6xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="text-purple-300 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={switchToBuilder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg hover:shadow-blue-500/25"
            >
              지금 바로 체험해보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              당신에게 딱 맞는 <span className="text-blue-400">요금제</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              개인부터 대기업까지, 모든 규모의 비즈니스를 위한 유연한 요금제를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "스타터",
                price: "무료",
                description: "개인 사용자나 소규모 프로젝트에 적합",
                features: [
                  "기본 서버 구성 도구",
                  "최대 3개 프로젝트",
                  "PDF 견적서 다운로드",
                  "커뮤니티 지원",
                  "기본 부품 라이브러리"
                ],
                popular: false,
                buttonText: "무료 시작",
                buttonClass: "border border-white/20 text-white hover:bg-white/10"
              },
              {
                name: "비즈니스",
                price: "29,000",
                description: "중소기업과 팀을 위한 전문 기능",
                features: [
                  "모든 스타터 기능 포함",
                  "무제한 프로젝트",
                  "팀 협업 기능",
                  "고급 부품 라이브러리",
                  "우선 고객 지원",
                  "API 연동",
                  "커스텀 브랜딩"
                ],
                popular: true,
                buttonText: "14일 무료 체험",
                buttonClass: "bg-blue-600 hover:bg-blue-700 text-white"
              },
              {
                name: "엔터프라이즈",
                price: "문의",
                description: "대기업을 위한 맞춤형 솔루션",
                features: [
                  "모든 비즈니스 기능 포함",
                  "전용 계정 관리자",
                  "온프레미스 배포",
                  "SSO 연동",
                  "SLA 보장",
                  "24/7 전화 지원",
                  "맞춤형 개발"
                ],
                popular: false,
                buttonText: "영업팀 문의",
                buttonClass: "border border-white/20 text-white hover:bg-white/10"
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      가장 인기
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}<span className="text-lg text-slate-300">{plan.price !== "무료" && plan.price !== "문의" ? "원/월" : ""}</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.buttonClass}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials 섹션 */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              고객들이 말하는 <span className="text-blue-400">Serveria</span>
            </h2>
            <p className="text-xl text-slate-300">
              실제 고객들의 생생한 후기를 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "김철수",
                role: "스타트업 CTO",
                company: "테크스타트업",
                content: "서버 구성에 대한 지식이 부족했는데, Serveria 덕분에 완벽한 서버를 구성할 수 있었습니다. 정말 직관적이에요!",
                avatar: "👨‍💻"
              },
              {
                name: "박영희",
                role: "IT 매니저", 
                company: "글로벌 제조업체",
                content: "팀원들과 함께 서버 구성을 검토하고 결정할 수 있어서 정말 편했습니다. 의사결정 시간이 절반으로 줄었어요.",
                avatar: "👩‍💼"
              },
              {
                name: "이민수",
                role: "시스템 엔지니어",
                company: "대기업 IT부서",
                content: "호환성 체크 기능이 정말 유용합니다. 예전에는 부품 구매 후 호환 문제로 고생했는데, 이제는 그런 걱정이 없어요.",
                avatar: "👨‍🔧"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-slate-300 text-sm">{testimonial.role}</p>
                    <p className="text-blue-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-slate-300 leading-relaxed">{testimonial.content}</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              지금 바로 시작하세요!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              무료로 서버를 구성해보고, Serveria의 강력한 기능을 경험하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={switchToBuilder}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <PlayCircle className="mr-2 h-6 w-6" />
                무료 체험 시작
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center">
                영업팀 문의
                <ArrowRight className="ml-2 h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Server className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">Serveria</span>
              </div>
              <p className="text-slate-400 mb-6">
                전문가 수준의 서버 구성을 누구나 쉽게.
              </p>
              <div className="flex space-x-4">
                <Github className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">제품</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">서버 구성 도구</a></li>
                <li><a href="#" className="hover:text-white transition-colors">호환성 검사</a></li>
                <li><a href="#" className="hover:text-white transition-colors">견적서 생성</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">도움말 센터</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">상태 페이지</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개발자 문서</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">법적 고지</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button 
                    onClick={() => setShowPrivacyPolicy(true)} 
                    className="hover:text-white transition-colors text-left"
                  >
                    개인정보 보호정책
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowTermsOfService(true)} 
                    className="hover:text-white transition-colors text-left"
                  >
                    이용약관
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">쿠키 정책</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              © 2024 Serveria. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@serveria.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>02-1234-5678</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top 버튼 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ServeriaApp;
