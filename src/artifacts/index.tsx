import { useState, useEffect, useMemo } from 'react';
import { 
  Server, Cpu, HardDrive, Download, CheckCircle, 
  ArrowRight, PlayCircle, Users, Zap, Shield, 
  Clock, Star, ChevronDown, Menu, X, Quote, 
  Mail, Phone, MapPin, ArrowUp, Github, Twitter, 
  Linkedin, Youtube, CreditCard, Monitor, 
  MemoryStick, Database, Home, Plus, Minus, 
  AlertCircle, FileText
} from 'lucide-react';

// 타입 정의들
interface ComponentSpec {
  power: number;
  cores?: number;
  capacity?: number;
  memory?: number;
}

interface ComponentSpecs {
  [key: string]: ComponentSpec;
}

interface ServerSpec {
  maxCPU: number;
  maxMemory: number;
  maxGPU: number;
  compatibleCPUs: string[];
  compatibleMemory: string[];
  compatibleGPUs: string[];
  maxPowerConsumption: number;
}

interface ServerSpecs {
  [key: string]: ServerSpec;
}

interface ConfiguredComponents {
  cpu: string[];
  memory: string[];
  gpu: string[];
}

interface AvailableComponents {
  cpu: string[];
  memory: string[];
  gpu: string[];
}

type ComponentType = keyof ConfiguredComponents;

// ServerConfigurator 컴포넌트
const ServerConfigurator = () => {
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [configuredComponents, setConfiguredComponents] = useState<ConfiguredComponents>({
    cpu: [],
    memory: [],
    gpu: []
  });
  const [availableComponents, setAvailableComponents] = useState<AvailableComponents>({
    cpu: [],
    memory: [],
    gpu: []
  });
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const serverSpecs: ServerSpecs = useMemo(() => ({
    'PowerEdge R750': {
      maxCPU: 2,
      maxMemory: 16,
      maxGPU: 3,
      compatibleCPUs: ['Intel Xeon Silver 4314', 'Intel Xeon Gold 5318Y', 'Intel Xeon Platinum 8380'],
      compatibleMemory: ['32GB DDR4-3200', '64GB DDR4-3200', '128GB DDR4-3200'],
      compatibleGPUs: ['NVIDIA RTX A4000', 'NVIDIA RTX A5000', 'NVIDIA A100'],
      maxPowerConsumption: 1400
    },
    'HPE ProLiant DL380': {
      maxCPU: 2,
      maxMemory: 24,
      maxGPU: 8,
      compatibleCPUs: ['Intel Xeon Silver 4314', 'Intel Xeon Gold 5318Y'],
      compatibleMemory: ['16GB DDR4-2933', '32GB DDR4-2933', '64GB DDR4-2933'],
      compatibleGPUs: ['NVIDIA Tesla V100', 'NVIDIA RTX A4000'],
      maxPowerConsumption: 1600
    },
    'SuperMicro SYS-2029GP': {
      maxCPU: 2,
      maxMemory: 12,
      maxGPU: 10,
      compatibleCPUs: ['Intel Xeon Gold 5318Y', 'Intel Xeon Platinum 8380'],
      compatibleMemory: ['32GB DDR4-3200', '64GB DDR4-3200'],
      compatibleGPUs: ['NVIDIA A100', 'NVIDIA RTX A5000'],
      maxPowerConsumption: 2000
    }
  }), []);

  const componentSpecs: ComponentSpecs = useMemo(() => ({
    'Intel Xeon Silver 4314': { power: 135, cores: 16 },
    'Intel Xeon Gold 5318Y': { power: 150, cores: 24 },
    'Intel Xeon Platinum 8380': { power: 270, cores: 40 },
    '16GB DDR4-2933': { power: 5, memory: 16 },
    '32GB DDR4-3200': { power: 8, memory: 32 },
    '64GB DDR4-3200': { power: 12, memory: 64 },
    '128GB DDR4-3200': { power: 15, memory: 128 },
    'NVIDIA Tesla V100': { power: 300 },
    'NVIDIA RTX A4000': { power: 140 },
    'NVIDIA RTX A5000': { power: 230 },
    'NVIDIA A100': { power: 400 }
  }), []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, componentType: ComponentType, componentName: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ componentType, componentName }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { componentType, componentName } = data as { componentType: ComponentType; componentName: string };

    if (!selectedServer || !canAddComponent(componentType)) {
      return;
    }

    setConfiguredComponents(prev => ({
      ...prev,
      [componentType]: [...prev[componentType], componentName]
    }));

    setAvailableComponents(prev => ({
      ...prev,
      [componentType]: prev[componentType].filter(item => item !== componentName)
    }));
  };

  const removeComponent = (componentType: ComponentType, index: number) => {
    const component = configuredComponents[componentType][index];
    
    setConfiguredComponents(prev => ({
      ...prev,
      [componentType]: prev[componentType].filter((_, i) => i !== index)
    }));

    setAvailableComponents(prev => ({
      ...prev,
      [componentType]: [...prev[componentType], component]
    }));
  };

  const isValidServerKey = (key: string): key is string => {
    return key in serverSpecs;
  };

  const canAddComponent = (componentType: ComponentType): boolean => {
    if (!selectedServer || !isValidServerKey(selectedServer)) return false;
    
    const spec = serverSpecs[selectedServer];
    const current = configuredComponents[componentType].length;
    
    switch (componentType) {
      case 'cpu':
        return current < spec.maxCPU;
      case 'memory':
        return current < spec.maxMemory;
      case 'gpu':
        return current < spec.maxGPU;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (selectedServer && isValidServerKey(selectedServer)) {
      const spec = serverSpecs[selectedServer];
      setAvailableComponents({
        cpu: spec.compatibleCPUs,
        memory: spec.compatibleMemory,
        gpu: spec.compatibleGPUs
      });
      setConfiguredComponents({
        cpu: [],
        memory: [],
        gpu: []
      });
      setErrors([]);
    }
  }, [selectedServer, serverSpecs]);

  const calculateTotalPower = () => {
    let total = 0;
    
    Object.entries(configuredComponents).forEach(([type, components]) => {
      components.forEach(component => {
        const spec = componentSpecs[component];
        if (spec) {
          total += spec.power;
        }
      });
    });
    
    return total;
  };

  const validateConfiguration = () => {
    const newErrors: string[] = [];
    
    if (!selectedServer) {
      newErrors.push('서버 모델을 선택해주세요.');
    }
    
    if (configuredComponents.cpu.length === 0) {
      newErrors.push('최소 1개의 CPU가 필요합니다.');
    }
    
    if (configuredComponents.memory.length === 0) {
      newErrors.push('최소 1개의 메모리가 필요합니다.');
    }
    
    const totalPower = calculateTotalPower();
    if (selectedServer && isValidServerKey(selectedServer)) {
      const maxPower = serverSpecs[selectedServer].maxPowerConsumption;
      if (totalPower > maxPower) {
        newErrors.push(`전력 소비가 한계를 초과했습니다. (${totalPower}W / ${maxPower}W)`);
      }
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const resetConfiguration = () => {
    setConfiguredComponents({
      cpu: [],
      memory: [],
      gpu: []
    });
    if (selectedServer && isValidServerKey(selectedServer)) {
      const spec = serverSpecs[selectedServer];
      setAvailableComponents({
        cpu: spec.compatibleCPUs,
        memory: spec.compatibleMemory,
        gpu: spec.compatibleGPUs
      });
    }
    setErrors([]);
  };

  const saveConfiguration = () => {
    if (validateConfiguration()) {
      const config = {
        server: selectedServer,
        components: configuredComponents,
        totalPower: calculateTotalPower(),
        timestamp: new Date().toISOString()
      };
      
      console.log('저장된 구성:', config);
      alert('서버 구성이 저장되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">서버 구성하기</h1>
          <p className="text-slate-300">드래그 & 드롭으로 전문적인 서버를 구성해보세요</p>
        </div>

        {/* 서버 선택 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. 서버 모델 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(serverSpecs).map((server) => (
              <button
                key={server}
                onClick={() => setSelectedServer(server)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedServer === server
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-slate-600 bg-slate-700/50 hover:border-purple-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Server className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-semibold">{server}</span>
                </div>
                <div className="text-sm text-slate-300">
                  <div>CPU: 최대 {serverSpecs[server].maxCPU}개</div>
                  <div>메모리: 최대 {serverSpecs[server].maxMemory}개</div>
                  <div>GPU: 최대 {serverSpecs[server].maxGPU}개</div>
                  <div>최대 전력: {serverSpecs[server].maxPowerConsumption}W</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedServer && (
          <>
            {/* 구성 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* 사용 가능한 컴포넌트 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">2. 사용 가능한 컴포넌트</h2>
                
                {/* CPU */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    CPU ({configuredComponents.cpu.length}/{serverSpecs[selectedServer].maxCPU})
                  </h3>
                  <div className="space-y-2">
                    {availableComponents.cpu.map((cpu) => (
                      <div
                        key={cpu}
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'cpu', cpu)}
                        className="p-3 bg-slate-700 rounded-lg cursor-move hover:bg-slate-600 transition-colors"
                      >
                        <div className="text-white font-medium">{cpu}</div>
                        <div className="text-sm text-slate-300">
                          {componentSpecs[cpu]?.power}W, {componentSpecs[cpu]?.cores} 코어
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Memory */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <MemoryStick className="w-5 h-5" />
                    메모리 ({configuredComponents.memory.length}/{serverSpecs[selectedServer].maxMemory})
                  </h3>
                  <div className="space-y-2">
                    {availableComponents.memory.map((memory) => (
                      <div
                        key={memory}
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'memory', memory)}
                        className="p-3 bg-slate-700 rounded-lg cursor-move hover:bg-slate-600 transition-colors"
                      >
                        <div className="text-white font-medium">{memory}</div>
                        <div className="text-sm text-slate-300">
                          {componentSpecs[memory]?.power}W, {componentSpecs[memory]?.memory}GB
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GPU */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    GPU ({configuredComponents.gpu.length}/{serverSpecs[selectedServer].maxGPU})
                  </h3>
                  <div className="space-y-2">
                    {availableComponents.gpu.map((gpu) => (
                      <div
                        key={gpu}
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'gpu', gpu)}
                        className="p-3 bg-slate-700 rounded-lg cursor-move hover:bg-slate-600 transition-colors"
                      >
                        <div className="text-white font-medium">{gpu}</div>
                        <div className="text-sm text-slate-300">
                          {componentSpecs[gpu]?.power}W
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 구성된 서버 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">3. 서버 구성</h2>
                
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="min-h-[400px] border-2 border-dashed border-slate-600 rounded-lg p-4 hover:border-purple-400 transition-colors"
                >
                  <div className="text-center text-slate-400 mb-4">
                    컴포넌트를 여기로 드래그하세요
                  </div>

                  {/* 구성된 CPU */}
                  {configuredComponents.cpu.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-purple-400 font-semibold mb-2">CPU</h4>
                      {configuredComponents.cpu.map((cpu, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-slate-700 rounded mb-2">
                          <span className="text-white">{cpu}</span>
                          <button
                            onClick={() => removeComponent('cpu', index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 구성된 메모리 */}
                  {configuredComponents.memory.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-purple-400 font-semibold mb-2">메모리</h4>
                      {configuredComponents.memory.map((memory, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-slate-700 rounded mb-2">
                          <span className="text-white">{memory}</span>
                          <button
                            onClick={() => removeComponent('memory', index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 구성된 GPU */}
                  {configuredComponents.gpu.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-purple-400 font-semibold mb-2">GPU</h4>
                      {configuredComponents.gpu.map((gpu, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-slate-700 rounded mb-2">
                          <span className="text-white">{gpu}</span>
                          <button
                            onClick={() => removeComponent('gpu', index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 전력 소비 표시 */}
                <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white">총 전력 소비:</span>
                    <span className={`font-semibold ${
                      calculateTotalPower() > (selectedServer && isValidServerKey(selectedServer) ? serverSpecs[selectedServer].maxPowerConsumption : 0)
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}>
                      {calculateTotalPower()}W / {selectedServer && isValidServerKey(selectedServer) ? serverSpecs[selectedServer].maxPowerConsumption : 0}W
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 에러 메시지 */}
            {errors.length > 0 && (
              <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">구성 오류</span>
                </div>
                <ul className="text-red-300 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={resetConfiguration}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                초기화
              </button>
              <button
                onClick={saveConfiguration}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                구성 저장
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
const ServeriaApp = () => {
  const [currentMode, setCurrentMode] = useState('homepage');
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const sections = ['hero', 'features', 'configurator', 'pricing', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
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
    }
    setMobileMenuOpen(false);
  };

  if (currentMode === 'configurator') {
    return <ServerConfigurator />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">Serveria</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  { id: 'hero', label: '홈' },
                  { id: 'features', label: '기능' },
                  { id: 'configurator', label: '구성도구' },
                  { id: 'pricing', label: '요금제' },
                  { id: 'testimonials', label: '후기' },
                  { id: 'contact', label: '연락처' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-md">
              {[
                { id: 'hero', label: '홈' },
                { id: 'features', label: '기능' },
                { id: 'configurator', label: '구성도구' },
                { id: 'pricing', label: '요금제' },
                { id: 'testimonials', label: '후기' },
                { id: 'contact', label: '연락처' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              전문적인 서버를<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                쉽게 구성하세요
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              드래그 앤 드롭으로 서버를 구성하고, 실시간으로 성능과 호환성을 확인하세요. 
              복잡한 서버 설계가 이제 간단해집니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentMode('configurator')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                지금 바로 체험해보기
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                자세히 알아보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              강력한 기능들
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              전문가 수준의 서버 구성을 누구나 쉽게 할 수 있도록 설계된 혁신적인 도구들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="w-8 h-8" />,
                title: "드래그 앤 드롭 구성",
                description: "직관적인 인터페이스로 복잡한 서버 구성을 간단하게"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "실시간 호환성 검사",
                description: "컴포넌트 간의 호환성을 즉시 확인하고 최적화 제안"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "안정성 검증",
                description: "전력 소비량과 쿨링 요구사항을 자동으로 계산"
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "최신 하드웨어 DB",
                description: "항상 업데이트되는 최신 서버 컴포넌트 정보"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "구성 저장 & 공유",
                description: "완성된 구성을 저장하고 팀과 쉽게 공유"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "빠른 견적 산출",
                description: "실시간으로 정확한 비용 계산과 납기 예상"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/70 transition-colors">
                <div className="text-purple-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator Preview Section */}
      <section id="configurator" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              서버 구성 도구 미리보기
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              실제 구성 도구를 체험해보세요. 전문가 수준의 서버를 몇 분 만에 설계할 수 있습니다.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Dell PowerEdge R750 구성</h3>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>호환성 확인됨</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  CPU (1/2)
                </h4>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-white font-medium">Intel Xeon Gold 5318Y</div>
                  <div className="text-sm text-gray-300">150W, 24코어</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <MemoryStick className="w-5 h-5" />
                  메모리 (2/16)
                </h4>
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-white font-medium">64GB DDR4-3200</div>
                    <div className="text-sm text-gray-300">12W, 64GB</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-white font-medium">64GB DDR4-3200</div>
                    <div className="text-sm text-gray-300">12W, 64GB</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  GPU (1/3)
                </h4>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-white font-medium">NVIDIA RTX A5000</div>
                  <div className="text-sm text-gray-300">230W</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg">총 전력 소비:</span>
                <span className="text-green-400 text-lg font-semibold">404W / 1400W</span>
              </div>
              <div className="mt-2 bg-slate-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '29%'}}></div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentMode('configurator')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <PlayCircle className="w-5 h-5" />
                전체 도구 사용해보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              합리적인 요금제
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              프로젝트 규모에 맞는 요금제를 선택하세요. 모든 플랜에서 핵심 기능을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "스타터",
                price: "무료",
                description: "개인 프로젝트에 적합",
                features: [
                  "기본 서버 구성 도구",
                  "5개 구성 저장",
                  "커뮤니티 지원",
                  "기본 호환성 검사"
                ],
                highlighted: false
              },
              {
                name: "프로페셔널",
                price: "₩29,000/월",
                description: "팀 프로젝트에 최적",
                features: [
                  "고급 구성 도구",
                  "무제한 구성 저장",
                  "팀 협업 기능",
                  "고급 호환성 검사",
                  "이메일 지원",
                  "비용 최적화 제안"
                ],
                highlighted: true
              },
              {
                name: "엔터프라이즈",
                price: "₩99,000/월",
                description: "대규모 조직을 위한",
                features: [
                  "모든 프로 기능",
                  "사용자 정의 컴포넌트",
                  "API 접근",
                  "전담 지원",
                  "온프레미스 배포",
                  "SLA 보장"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-b from-purple-600/20 to-purple-800/20 border-2 border-purple-500' : 'bg-slate-800/50'}`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlighted 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}>
                  {plan.name === "스타터" ? "무료로 시작하기" : "구독하기"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              고객 후기
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              이미 수많은 전문가들이 Serveria로 더 나은 서버를 구성하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김민수",
                role: "시스템 엔지니어, 테크코프",
                avatar: "👨‍💻",
                content: "서버 구성 시간이 70% 단축되었습니다. 호환성 체크 기능이 특히 훌륭해요.",
                rating: 5
              },
              {
                name: "이지연",
                role: "CTO, 스타트업 허브",
                avatar: "👩‍💼",
                content: "비전문가도 쉽게 사용할 수 있어서 팀 전체가 서버 설계에 참여할 수 있게 되었습니다.",
                rating: 5
              },
              {
                name: "박철수",
                role: "인프라 팀장, 대기업",
                avatar: "👨‍🔧",
                content: "실시간 비용 계산과 성능 예측 기능이 예산 계획에 큰 도움이 됩니다.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-start mb-4">
                  <Quote className="w-6 h-6 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 italic">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              문의하기
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              궁금한 점이 있으시거나 맞춤형 솔루션이 필요하시다면 언제든 연락해주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">연락처 정보</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold">이메일</div>
                    <div className="text-gray-300">contact@serveria.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold">전화</div>
                    <div className="text-gray-300">02-1234-5678</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold">주소</div>
                    <div className="text-gray-300">서울시 강남구 테헤란로 123</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">소셜 미디어</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">메시지 보내기</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">제목</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="문의 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">메시지</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="문의 내용을 입력하세요"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  메시지 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Serveria</h3>
              <p className="text-gray-400 mb-4">
                전문적인 서버 구성을 누구나 쉽게 할 수 있도록 만드는 혁신적인 플랫폼
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">제품</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">서버 구성 도구</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">호환성 검사</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">비용 계산기</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">지원</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">도움말</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">튜토리얼</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">커뮤니티</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">문의하기</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">회사</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">소개</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">채용</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">블로그</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">파트너십</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Serveria. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ServeriaApp;
