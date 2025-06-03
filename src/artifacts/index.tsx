import { useState, useEffect, useMemo } from 'react';
import { 
  Server, Cpu, HardDrive, Download, CheckCircle, 
  ArrowRight, PlayCircle, Users, Zap, Shield, 
  Clock, Star, ChevronDown, Menu, X, Quote, 
  Mail, Phone, MapPin, ArrowUp, Github, Twitter, 
  Linkedin, Youtube, CreditCard, Monitor, 
  MemoryStick, Database, Home, Plus, Minus, 
  AlertCircle, FileText, AlertTriangle
} from 'lucide-react';

import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfService from '../components/TermsOfService';
import CookiePolicy from '../components/CookiePolicy';

// 타입 정의
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

  // 서버 스펙 정의 - HP 3개, Dell 3개 순서
  const serverSpecs: ServerSpecs = useMemo(() => ({
    'HPE ProLiant DL380 Gen10': {
      maxCPU: 2,
      maxMemory: 3072,
      maxGPU: 4,
      compatibleCPUs: ['Intel Xeon Silver 4314', 'Intel Xeon Gold 5118', 'Intel Xeon Scalable 1st/2nd Gen'],
      compatibleMemory: ['32GB DDR4-2933', '64GB DDR4-2933', '128GB DDR4-2933'],
      compatibleGPUs: ['NVIDIA Tesla V100', 'NVIDIA RTX A6000', 'NVIDIA A100', 'NVIDIA H100'],
      maxPowerConsumption: 800
    },
    'HPE ProLiant DL360 Gen10 Plus': {
      maxCPU: 2,
      maxMemory: 2048,
      maxGPU: 2,
      compatibleCPUs: ['Intel Xeon Silver 4314', 'Intel Xeon Gold 6248R', '3rd Gen Intel Xeon Scalable'],
      compatibleMemory: ['32GB DDR4-3200', '64GB DDR4-3200', '128GB DDR4-3200'],
      compatibleGPUs: ['NVIDIA RTX A6000', 'NVIDIA Tesla V100', 'NVIDIA A100'],
      maxPowerConsumption: 800
    },
    'HPE ProLiant DL385 Gen11': {
      maxCPU: 2,
      maxMemory: 6144,
      maxGPU: 6,
      compatibleCPUs: ['AMD EPYC 9004 Series', 'AMD EPYC 9005 Series', 'AMD EPYC Genoa'],
      compatibleMemory: ['32GB DDR5-4800', '64GB DDR5-4800', '128GB DDR5-4800'],
      compatibleGPUs: ['NVIDIA H100', 'NVIDIA A100', 'NVIDIA RTX A6000', 'NVIDIA L40S'],
      maxPowerConsumption: 1000
    },
    'Dell PowerEdge R750': {
      maxCPU: 2,
      maxMemory: 8192,
      maxGPU: 4,
      compatibleCPUs: ['Intel Xeon Gold 6248R', 'Intel Xeon Platinum 8480+', '3rd Gen Intel Xeon Scalable'],
      compatibleMemory: ['32GB DDR4-3200', '64GB DDR4-3200', '128GB DDR4-3200'],
      compatibleGPUs: ['NVIDIA RTX A6000', 'NVIDIA Tesla V100', 'NVIDIA RTX 4090', 'NVIDIA A100'],
      maxPowerConsumption: 750
    },
    'Dell PowerEdge R760': {
      maxCPU: 2,
      maxMemory: 16384,
      maxGPU: 6,
      compatibleCPUs: ['Intel Xeon Gold 6448Y', 'Intel Xeon Platinum 8480+', '4th/5th Gen Intel Xeon Scalable'],
      compatibleMemory: ['32GB DDR5-4800', '64GB DDR5-4800', '128GB DDR5-4800'],
      compatibleGPUs: ['NVIDIA H100', 'NVIDIA A100', 'NVIDIA RTX A6000', 'NVIDIA L40S'],
      maxPowerConsumption: 800
    },
    'Dell PowerEdge XE8712': {
      maxCPU: 2,
      maxMemory: 2048,
      maxGPU: 4,
      compatibleCPUs: ['NVIDIA Grace CPU Superchip', 'ARM-based Grace CPU'],
      compatibleMemory: ['128GB HBM3e', '256GB HBM3e', '512GB HBM3e'],
      compatibleGPUs: ['NVIDIA B200 GPU', 'NVIDIA GB200 NVL4', 'NVIDIA Blackwell'],
      maxPowerConsumption: 2000
    }
  }), []);

  // 컴포넌트 스펙 정의 (기존 + 새로운 컴포넌트)
  const componentSpecs: ComponentSpecs = useMemo(() => ({
    // CPU
    'Intel Xeon Gold 6248R': { power: 150, cores: 24 },
    'Intel Xeon Gold 6258R': { power: 205, cores: 28 },
    'Intel Xeon Silver 4214R': { power: 100, cores: 12 },
    'Intel Xeon Silver 4314': { power: 75, cores: 16 },
    'Intel Xeon Gold 5118': { power: 105, cores: 12 },
    'Intel Xeon Scalable 1st/2nd Gen': { power: 140, cores: 20 },
    '3rd Gen Intel Xeon Scalable': { power: 165, cores: 24 },
    'Intel Xeon Platinum 8480+': { power: 350, cores: 56 },
    'Intel Xeon Gold 6448Y': { power: 225, cores: 32 },
    '4th/5th Gen Intel Xeon Scalable': { power: 270, cores: 40 },
    'AMD EPYC 9004 Series': { power: 200, cores: 96 },
    'AMD EPYC 9005 Series': { power: 400, cores: 128 },
    'AMD EPYC Genoa': { power: 360, cores: 96 },
    'NVIDIA Grace CPU Superchip': { power: 500, cores: 144 },
    'ARM-based Grace CPU': { power: 500, cores: 144 },
    // 메모리
    '32GB DDR4-2933': { power: 15, memory: 32 },
    '64GB DDR4-2933': { power: 20, memory: 64 },
    '128GB DDR4-2933': { power: 25, memory: 128 },
    '32GB DDR4-3200': { power: 18, memory: 32 },
    '64GB DDR4-3200': { power: 22, memory: 64 },
    '128GB DDR4-3200': { power: 27, memory: 128 },
    '32GB DDR5-4800': { power: 20, memory: 32 },
    '64GB DDR5-4800': { power: 25, memory: 64 },
    '128GB DDR5-4800': { power: 30, memory: 128 },
    '128GB HBM3e': { power: 30, memory: 128 },
    '256GB HBM3e': { power: 45, memory: 256 },
    '512GB HBM3e': { power: 60, memory: 512 },
    // GPU
    'NVIDIA RTX A6000': { power: 300, memory: 48 },
    'NVIDIA Tesla V100': { power: 250, memory: 32 },
    'NVIDIA RTX 4090': { power: 450, memory: 24 },
    'NVIDIA A100': { power: 400, memory: 80 },
    'NVIDIA H100': { power: 700, memory: 80 },
    'NVIDIA L40S': { power: 350, memory: 48 },
    'NVIDIA B200 GPU': { power: 1000, memory: 192 },
    'NVIDIA GB200 NVL4': { power: 1200, memory: 256 },
    'NVIDIA Blackwell': { power: 1000, memory: 192 }
  }), []);

  // 타입 가드 함수
  const isValidServerKey = (key: string): key is string => {
    return key in serverSpecs;
  };

  // 컴포넌트 추가 가능 여부 확인
  const canAddComponent = (componentType: ComponentType): boolean => {
    if (!selectedServer || !isValidServerKey(selectedServer)) return false;
    
    const spec = serverSpecs[selectedServer];
    const currentCount = configuredComponents[componentType].length;
    
    switch (componentType) {
      case 'cpu':
        return currentCount < spec.maxCPU;
      case 'gpu':
        return currentCount < spec.maxGPU;
      case 'memory':
        return true; // 메모리는 용량 제한만 확인
      default:
        return false;
    }
  };

  // 서버 선택 시 호환 가능한 컴포넌트 업데이트
  useEffect(() => {
    if (selectedServer && isValidServerKey(selectedServer)) {
      const spec = serverSpecs[selectedServer];
      setAvailableComponents({
        cpu: spec.compatibleCPUs,
        memory: spec.compatibleMemory,
        gpu: spec.compatibleGPUs
      });
      setShowCanvas(true);
      setConfiguredComponents({ cpu: [], memory: [], gpu: [] });
      setErrors([]);
    }
  }, [selectedServer, serverSpecs]);

  // 유효성 검사
  useEffect(() => {
    if (!selectedServer || !isValidServerKey(selectedServer)) return;
    
    const newErrors: string[] = [];
    const spec = serverSpecs[selectedServer];
    
    // 전력 소비량 검사
    const totalPower = [...configuredComponents.cpu, ...configuredComponents.memory, ...configuredComponents.gpu]
      .reduce((sum, component) => sum + (componentSpecs[component]?.power || 0), 0);
    
    if (totalPower > spec.maxPowerConsumption) {
      newErrors.push(`전력 소비량이 최대값(${spec.maxPowerConsumption}W)을 초과했습니다.`);
    }
    
    // 메모리 용량 검사
    const totalMemory = configuredComponents.memory
      .reduce((sum, memory) => sum + (componentSpecs[memory]?.memory || 0), 0);
    
    if (totalMemory > spec.maxMemory) {
      newErrors.push(`메모리 용량이 최대값(${spec.maxMemory}GB)을 초과했습니다.`);
    }
    
    setErrors(newErrors);
  }, [configuredComponents, selectedServer, serverSpecs, componentSpecs]);

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, componentType: ComponentType, componentName: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ componentType, componentName }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { componentType, componentName } = data as { componentType: ComponentType; componentName: string };
      
      if (canAddComponent(componentType)) {
        setConfiguredComponents(prev => ({
          ...prev,
          [componentType]: [...prev[componentType], componentName]
        }));
      }
    } catch (error) {
      console.error('드롭 처리 중 오류:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 컴포넌트 제거
  const removeComponent = (componentType: ComponentType, index: number) => {
    setConfiguredComponents(prev => ({
      ...prev,
      [componentType]: prev[componentType].filter((_, i) => i !== index)
    }));
  };

  // 계산된 값들
  const totalPower = [...configuredComponents.cpu, ...configuredComponents.memory, ...configuredComponents.gpu]
    .reduce((sum, component) => sum + (componentSpecs[component]?.power || 0), 0);
  
  const totalMemory = configuredComponents.memory
    .reduce((sum, memory) => sum + (componentSpecs[memory]?.memory || 0), 0);
  
  const totalCores = configuredComponents.cpu
    .reduce((sum, cpu) => sum + (componentSpecs[cpu]?.cores || 0), 0);

  const maxPower = selectedServer && isValidServerKey(selectedServer) 
    ? serverSpecs[selectedServer].maxPowerConsumption 
    : 0;

  // 클립보드 복사 함수
  const exportToPDF = () => {
    if (!selectedServer) {
      alert('서버를 먼저 선택해주세요.');
      return;
    }
    
    const hasComponents = configuredComponents.cpu.length > 0 || 
                         configuredComponents.gpu.length > 0 || 
                         configuredComponents.memory.length > 0;
    
    if (!hasComponents) {
      alert('최소 하나 이상의 컴포넌트를 추가해주세요.');
      return;
    }
    
    try {
      // 구성 내용을 텍스트로 생성
      const content = `                                서버 구성 사양서
=========================================

선택된 서버: ${selectedServer}
생성일시: ${new Date().toLocaleString('ko-KR')}

=========================================
                                포함된 컴포넌트
=========================================

${configuredComponents.cpu.length > 0 ? `CPU (${configuredComponents.cpu.length}개):
${configuredComponents.cpu.map((cpu, index) => 
  `${index+1}. ${cpu} (${componentSpecs[cpu]?.cores}코어, ${componentSpecs[cpu]?.power}W)`
).join('\n')}

` : ''}${configuredComponents.gpu.length > 0 ? `GPU (${configuredComponents.gpu.length}개):
${configuredComponents.gpu.map((gpu, index) => 
  `${index+1}. ${gpu} (${componentSpecs[gpu]?.memory}GB VRAM, ${componentSpecs[gpu]?.power}W)`
).join('\n')}

` : ''}${configuredComponents.memory.length > 0 ? `메모리 (${configuredComponents.memory.length}개):
${configuredComponents.memory.map((memory, index) => 
  `${index+1}. ${memory} (${componentSpecs[memory]?.memory}GB, ${componentSpecs[memory]?.power}W)`
).join('\n')}

` : ''}=========================================
                                시스템 성능 요약
=========================================

총 메모리 용량: ${totalMemory}GB
총 CPU 코어 수: ${totalCores}개
총 전력 소비: ${totalPower}W
최대 전력 허용: ${maxPower}W
전력 사용률: ${((totalPower / maxPower) * 100).toFixed(1)}%

${errors.length > 0 ? `=========================================
                                주의사항
=========================================
${errors.map((error, index) => `${index + 1}. ${error}`).join('\n')}

` : ''}=========================================
          Powered by Serveria Server Configurator
=========================================`;
      
      // 클립보드에 복사
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(content).then(() => {
          alert('서버 구성 사양서가 복사되었습니다! 📋\n\n원하는 곳에 붙여넣기(Ctrl+V)하세요.');
        }).catch(() => {
          fallbackCopyToClipboard(content);
        });
      } else {
        fallbackCopyToClipboard(content);
      }
      
    } catch (error) {
      alert('복사 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 클립보드 복사 대체 방법
  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('서버 구성 정보가 클립보드에 복사되었습니다!\n\n메모장이나 워드에 붙여넣기(Ctrl+V)하여 저장하세요.');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      alert('클립보드 복사에 실패했습니다. 아래 내용을 직접 복사해주세요:\n\n' + text.substring(0, 200) + '...');
    }
    
    document.body.removeChild(textArea);
  };

  // HP 서버와 Dell 서버를 분리하여 렌더링
  const hpServers = Object.keys(serverSpecs).filter(server => server.startsWith('HPE'));
  const dellServers = Object.keys(serverSpecs).filter(server => server.startsWith('Dell'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">서버 구성하기</h1>
          <p className="text-slate-300">드래그 & 드롭으로 전문적인 서버를 구성해보세요</p>
        </div>

        {/* 서버 선택 - 2행으로 배치 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Server className="mr-2" />
            서버 모델 선택
          </h2>
          
          {/* HP 서버 행 */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white mb-3">HP Enterprise 서버</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hpServers.map((server) => (
                <button
                  key={server}
                  onClick={() => setSelectedServer(server)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedServer === server
                      ? 'border-blue-400 bg-blue-500/20 text-white'
                      : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium text-sm">{server}</div>
                  <div className="text-xs opacity-75 mt-1">
                    최대 {serverSpecs[server].maxPowerConsumption}W
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dell 서버 행 */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Dell 서버</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dellServers.map((server) => (
                <button
                  key={server}
                  onClick={() => setSelectedServer(server)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedServer === server
                      ? 'border-blue-400 bg-blue-500/20 text-white'
                      : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium text-sm">{server}</div>
                  <div className="text-xs opacity-75 mt-1">
                    최대 {serverSpecs[server].maxPowerConsumption}W
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {showCanvas && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 사용 가능한 컴포넌트 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">사용 가능한 컴포넌트</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Cpu className="mr-2 w-4 h-4" />
                    CPU
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableComponents.cpu.map((cpu, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'cpu', cpu)}
                        className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30 cursor-move hover:bg-blue-500/30 transition-colors"
                      >
                        <div className="text-white text-sm">{cpu}</div>
                        <div className="text-blue-300 text-xs">
                          {componentSpecs[cpu]?.cores}코어, {componentSpecs[cpu]?.power}W
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Monitor className="mr-2 w-4 h-4" />
                    GPU
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableComponents.gpu.map((gpu, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'gpu', gpu)}
                        className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30 cursor-move hover:bg-purple-500/30 transition-colors"
                      >
                        <div className="text-white text-sm">{gpu}</div>
                        <div className="text-purple-300 text-xs">
                          {componentSpecs[gpu]?.memory}GB VRAM, {componentSpecs[gpu]?.power}W
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <HardDrive className="mr-2 w-4 h-4" />
                    메모리
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableComponents.memory.map((memory, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'memory', memory)}
                        className="p-3 bg-green-500/20 rounded-lg border border-green-400/30 cursor-move hover:bg-green-500/30 transition-colors"
                      >
                        <div className="text-white text-sm">{memory}</div>
                        <div className="text-green-300 text-xs">
                          {componentSpecs[memory]?.memory}GB, {componentSpecs[memory]?.power}W
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 구성된 서버 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">서버 구성</h3>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="min-h-96 p-4 border-2 border-dashed border-slate-500 rounded-lg"
              >
                {configuredComponents.cpu.length === 0 && 
                 configuredComponents.gpu.length === 0 && 
                 configuredComponents.memory.length === 0 ? (
                  <div className="text-center text-slate-400 mt-20">
                    여기에 컴포넌트를 드래그하여 추가하세요
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* CPU 섹션 */}
                    {configuredComponents.cpu.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium mb-2">CPU</h4>
                        <div className="space-y-2">
                          {configuredComponents.cpu.map((cpu, index) => (
                            <div
                              key={index}
                              className="p-3 bg-blue-600/30 rounded-lg border border-blue-400/50 flex justify-between items-center"
                            >
                              <div>
                                <div className="text-white text-sm">{cpu}</div>
                                <div className="text-blue-300 text-xs">
                                  {componentSpecs[cpu]?.cores}코어, {componentSpecs[cpu]?.power}W
                                </div>
                              </div>
                              <button
                                onClick={() => removeComponent('cpu', index)}
                                className="text-red-400 hover:text-red-300 ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* GPU 섹션 */}
                    {configuredComponents.gpu.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium mb-2">GPU</h4>
                        <div className="space-y-2">
                          {configuredComponents.gpu.map((gpu, index) => (
                            <div
                              key={index}
                              className="p-3 bg-purple-600/30 rounded-lg border border-purple-400/50 flex justify-between items-center"
                            >
                              <div>
                                <div className="text-white text-sm">{gpu}</div>
                                <div className="text-purple-300 text-xs">
                                  {componentSpecs[gpu]?.memory}GB VRAM, {componentSpecs[gpu]?.power}W
                                </div>
                              </div>
                              <button
                                onClick={() => removeComponent('gpu', index)}
                                className="text-red-400 hover:text-red-300 ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

{/* 메모리 섹션 완성 */}
                    {configuredComponents.memory.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium mb-2">메모리</h4>
                        <div className="space-y-2">
                          {configuredComponents.memory.map((memory, index) => (
                            <div
                              key={index}
                              className="p-3 bg-green-600/30 rounded-lg border border-green-400/50 flex justify-between items-center"
                            >
                              <div>
                                <div className="text-white text-sm">{memory}</div>
                                <div className="text-green-300 text-xs">
                                  {componentSpecs[memory]?.memory}GB, {componentSpecs[memory]?.power}W
                                </div>
                              </div>
                              <button
                                onClick={() => removeComponent('memory', index)}
                                className="text-red-400 hover:text-red-300 ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 시스템 정보 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">시스템 정보</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-slate-300 text-sm mb-1">총 메모리</div>
                  <div className="text-white text-xl font-semibold">{totalMemory}GB</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-slate-300 text-sm mb-1">총 CPU 코어</div>
                  <div className="text-white text-xl font-semibold">{totalCores}코어</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-slate-300 text-sm mb-1">전력 소비량</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-xl font-semibold">{totalPower}W</span>
                    <span className="text-slate-400">/ {maxPower}W</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        totalPower > maxPower ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((totalPower / maxPower) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* 오류 표시 */}
                {errors.length > 0 && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <div className="flex items-center text-red-400 mb-2">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span className="font-medium">경고</span>
                    </div>
                    <div className="space-y-1">
                      {errors.map((error, index) => (
                        <div key={index} className="text-red-300 text-sm">
                          • {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 사양서 복사 버튼 */}
                <button
                  onClick={exportToPDF}
                  disabled={configuredComponents.cpu.length === 0 && 
                           configuredComponents.gpu.length === 0 && 
                           configuredComponents.memory.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  사양서 복사
                </button>
                
                {/* 디버그 정보 */}
                <div className="text-xs text-slate-400 mt-2">
                  서버: {selectedServer || '선택안됨'} | 
                  CPU: {configuredComponents.cpu.length} | 
                  GPU: {configuredComponents.gpu.length} | 
                  메모리: {configuredComponents.memory.length}
                </div>
              </div>
            </div>
          </div>
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
  const [showLegalModal, setShowLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    if (currentMode === 'homepage') {
      const handleScroll = () => {
        const sections = ['hero', 'features', 'how-it-works', 'pricing', 'testimonials'];
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
            }
          }
        });

        setShowScrollTop(window.scrollY > 400);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentMode]);

  const scrollToSection = (sectionId: string) => {
    if (currentMode === 'homepage') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToBuilder = () => {
    setCurrentMode('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToHomepage = () => {
    setCurrentMode('homepage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

// 개인정보 보호정책 페이지 표시
if (showLegalModal === 'privacy') {
  return <PrivacyPolicy onBack={() => setShowLegalModal(null)} />;
}

// 이용약관 페이지 표시  
if (showLegalModal === 'terms') {
  return <TermsOfService onBack={() => setShowLegalModal(null)} />;
}

  // 쿠키 정책 페이지 표시
if (showCookiePolicy) {
  return <CookiePolicy onBack={() => setShowCookiePolicy(false)} />;
}
  
  
  if (currentMode === 'builder') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">       
        {/* Builder Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">Serveria</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={switchToHomepage}
                  className="flex items-center text-slate-300 hover:text-white transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  홈으로
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Builder Content */}
        <div className="pt-20">
          <ServerConfigurator />
        </div>
      </div>
    );
  }

// Homepage 렌더링
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={scrollToTop}>
              <Server className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Serveria</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'hero', label: '홈' },
                { id: 'features', label: '기능' },
                { id: 'how-it-works', label: '사용법' },
                { id: 'pricing', label: '요금제' },
                { id: 'testimonials', label: '고객사례' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-colors duration-200 ${
                    activeSection === item.id 
                      ? 'text-blue-400 font-medium' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-slate-300 hover:text-white transition-colors duration-200">
                로그인
              </button>
              <button 
                onClick={switchToBuilder}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                무료 체험
              </button>
            </div>

            <button 
              className="md:hidden text-white transition-transform duration-200 hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 mt-4">
                {[
                  { id: 'hero', label: '홈' },
                  { id: 'features', label: '기능' },
                  { id: 'how-it-works', label: '사용법' },
                  { id: 'pricing', label: '요금제' },
                  { id: 'testimonials', label: '고객사례' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-slate-300 hover:text-white transition-colors text-left duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                  <button className="text-slate-300 hover:text-white transition-colors text-left duration-200">
                    로그인
                  </button>
                  <button 
                    onClick={switchToBuilder}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    무료 체험
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              서버 구성이 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                이렇게 쉬워도
              </span> <br />
              되나요?
            </h1>
            <p className="text-xl md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              드래그 & 드롭만으로 전문적인 서버 사양서를 완성하세요<br />
              복잡한 호환성 계산은 Serveria가 알아서 처리합니다
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={switchToBuilder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-blue-500/25"
            >
              지금 바로 체험해보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <PlayCircle className="mr-2 h-5 w-5" />
              데모 영상 보기
            </button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-white font-medium flex items-center">
                    <Server className="mr-2 h-4 w-4" />
                    서버 선택
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30 transform hover:scale-105 transition-transform cursor-pointer">
                      <div className="text-white text-sm">Dell PowerEdge R750</div>
                      <div className="text-blue-300 text-xs">최대 750W</div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 transform hover:scale-105 transition-transform cursor-pointer">
                      <div className="text-slate-300 text-sm">HPE ProLiant DL380</div>
                      <div className="text-slate-400 text-xs">최대 800W</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-medium">구성 요소</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30 flex items-center transform hover:scale-105 transition-transform cursor-pointer">
                      <Cpu className="mr-2 h-4 w-4 text-purple-300" />
                      <div>
                        <div className="text-white text-sm">Intel Xeon Gold</div>
                        <div className="text-purple-300 text-xs">24코어, 150W</div>
                      </div>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30 flex items-center transform hover:scale-105 transition-transform cursor-pointer">
                      <HardDrive className="mr-2 h-4 w-4 text-green-300" />
                      <div>
                        <div className="text-white text-sm">64GB DDR4</div>
                        <div className="text-green-300 text-xs">22W</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-medium">실시간 계산</h3>
                  <div className="space-y-2">
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <div className="text-slate-300 text-sm">총 전력</div>
                      <div className="text-white text-lg font-semibold">172W / 750W</div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{width: '23%'}}></div>
                      </div>
                    </div>
                    <button 
                      onClick={switchToBuilder}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-all duration-200 flex items-center justify-center hover:shadow-lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      사양서 생성
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              왜 Serveria를 선택해야 할까요?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              기존 3시간 작업을 5분으로 단축시키는 혁신적인 서버 구성 도구
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "간편한 드래그 & 드롭",
                description: "서버와 부품을 끌어다 놓기만 하면 끝! 복잡한 설정 없이 직관적으로 구성할 수 있습니다.",
                color: "blue-400"
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "실시간 호환성 체크",
                description: "호환되지 않는 조합은 미리 알려드려요. 실수 없는 완벽한 서버 구성을 보장합니다.",
                color: "green-400"
              },
              {
                icon: <Download className="h-8 w-8" />,
                title: "자동 사양서 생성",
                description: "PDF와 세금계산서를 자동으로 생성합니다. 기업 구매부서가 필요한 모든 서류가 준비됩니다.",
                color: "yellow-400" 
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "시간 절약",
                description: "기존 3시간 걸리던 작업을 5분으로 단축. 더 중요한 업무에 집중할 수 있습니다.",
                color: "blue-400"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "팀 협업 지원",
                description: "팀원들과 구성을 공유하고 협업하세요. 버전 관리와 승인 프로세스를 지원합니다.",
                color: "green-400"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "B2B 특화 기능",
                description: "기업 고객을 위한 세금계산서 자동 발행, API 연동, 대량 구성 처리를 지원합니다.",
                color: "red-400"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group">
                <div className={`text-${feature.color} mb-4 transform group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-300`}>
                {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
     <section id="how-it-works" className="pt-32 pb-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              3단계로 완성하는 서버 구성
            </h2>
            <p className="text-xl text-slate-300">
              복잡한 서버 구성도 이제 누구나 쉽게
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "01",
                title: "서버 선택",
                description: "HP, Dell 등 원하는 서버 모델을 선택하세요",
                icon: <Server className="h-12 w-12" />
              },
              {
                step: "02", 
                title: "부품 구성",
                description: "CPU, GPU, 메모리를 드래그해서 추가하세요",
                icon: <Cpu className="h-12 w-12" />
              },
              {
                step: "03",
                title: "사양서 생성",
                description: "완성된 구성을 PDF로 다운로드하세요",
                icon: <Download className="h-12 w-12" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-6 transition-all duration-300 hover:bg-white/15 hover:shadow-xl transform hover:-translate-y-2">
                  <div className="text-6xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">{step.step}</div>
                  <div className="text-purple-300 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                </div>
                
                {index < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 w-8 h-8 items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                <ArrowRight className="h-5 w-5 text-blue-400" />
                </div>
                
                 )}
                 </div>
            ))}
          </div>

              
          <div className="text-center">
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
      <section id="pricing" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              규모에 맞는 플랜을 선택하세요
            </h2>
            <p className="text-xl text-slate-300">
              모든 플랜에 14일 무료 체험 포함
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "스타터",
                price: "50,000",
                description: "개인 개발자 및 소규모 팀",
                features: [
                  "월 구성 10회",
                  "저장 가능 구성 3개", 
                  "기본 서버 6개",
                  "팀 멤버 1명",
                  "이메일 지원"
                ],
                highlighted: false
              },
              {
                name: "비즈니스",
                price: "150,000", 
                description: "중소기업 IT팀",
                features: [
                  "월 구성 50회",
                  "무제한 저장",
                  "모든 서버 12개",
                  "팀 멤버 5명",
                  "우선 기술 지원",
                  "API 접근"
                ],
                highlighted: true
              },
              {
                name: "엔터프라이즈",
                price: "400,000",
                description: "대기업 및 데이터센터",
                features: [
                  "무제한 구성",
                  "무제한 저장",
                  "커스텀 서버",
                  "무제한 팀원",
                  "전화 지원",
                  "AI 추천",
                  "전담 매니저"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-8 border transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.highlighted 
                    ? 'bg-blue-600/20 border-blue-400 scale-105 shadow-xl shadow-blue-500/20' 
                    : 'bg-white/10 border-white/20 hover:bg-white/15 hover:shadow-xl'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    인기 플랜
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}<span className="text-lg text-slate-300">원</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={switchToBuilder}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  14일 무료체험
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Testimonials 섹션 */}
      <section id="testimonials" className="pt-32 pb-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            고객들의 이야기
            </h2>
            <p className="text-xl text-slate-300">
              실제 사용 고객들이 경험한 Serveria의 가치
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
              신용카드 등록 없이 14일 무료 체험하세요.
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
      <footer className="bg-black/40 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Server className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">Serveria</span>
              </div>
              <p className="text-slate-400 mb-4">
                전문적인 서버 구성 도구
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-slate-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">contact@serveria.co.kr</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">02-1234-5678</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">제품</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={switchToBuilder} className="hover:text-white transition-colors text-left">서버 구성 도구</button></li>
                <li><a href="#" onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">요금제</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API 문서</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">사용 가이드</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">기술 지원</a></li>
              </ul>
            </div>

     <div>
  <h4 className="text-white font-semibold mb-4">법적 고지</h4>
  <ul className="space-y-2 text-slate-400">
    <li>
      <button 
        onClick={() => setShowLegalModal('privacy')} 
        className="hover:text-white transition-colors text-left"
      >
        개인정보 보호정책
      </button>
    </li>
    <li>
      <button 
        onClick={() => setShowLegalModal('terms')} 
        className="hover:text-white transition-colors text-left"
      >
        이용약관
      </button>
    </li>
    <li><a href="#" className="hover:text-white transition-colors">쿠키 정책</a></li>
  </ul>
</div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 Serveria. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="맨 위로 이동"
        >
          <ArrowUp className="h-6 w-6 mx-auto" />
        </button>
      )}
    </div>
  );
};

export default ServeriaApp;
