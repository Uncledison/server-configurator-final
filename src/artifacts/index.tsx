import { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, Server, Cpu, HardDrive, Monitor, Download } from 'lucide-react';

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
    // 기존 CPU
    'Intel Xeon Gold 6248R': { power: 150, cores: 24 },
    'Intel Xeon Gold 6258R': { power: 205, cores: 28 },
    'Intel Xeon Silver 4214R': { power: 100, cores: 12 },
    // 새로운 CPU
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
    // 기존 메모리
    '32GB DDR4-2933': { power: 15, memory: 32 },
    '64GB DDR4-2933': { power: 20, memory: 64 },
    '128GB DDR4-2933': { power: 25, memory: 128 },
    // 새로운 메모리
    '32GB DDR4-3200': { power: 18, memory: 32 },
    '64GB DDR4-3200': { power: 22, memory: 64 },
    '128GB DDR4-3200': { power: 27, memory: 128 },
    '32GB DDR5-4800': { power: 20, memory: 32 },
    '64GB DDR5-4800': { power: 25, memory: 64 },
    '128GB DDR5-4800': { power: 30, memory: 128 },
    '128GB HBM3e': { power: 30, memory: 128 },
    '256GB HBM3e': { power: 45, memory: 256 },
    '512GB HBM3e': { power: 60, memory: 512 },
    // 기존 GPU
    'NVIDIA RTX A6000': { power: 300, memory: 48 },
    'NVIDIA Tesla V100': { power: 250, memory: 32 },
    'NVIDIA RTX 4090': { power: 450, memory: 24 },
    'NVIDIA A100': { power: 400, memory: 80 },
    // 새로운 GPU
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
  `${index}. ${cpu} (${componentSpecs[cpu]?.cores}코어, ${componentSpecs[cpu]?.power}W)`
).join('\n')}

` : ''}${configuredComponents.gpu.length > 0 ? `GPU (${configuredComponents.gpu.length}개):
${configuredComponents.gpu.map((gpu, index) => 
  `${index}. ${gpu} (${componentSpecs[gpu]?.memory}GB VRAM, ${componentSpecs[gpu]?.power}W)`
).join('\n')}

` : ''}${configuredComponents.memory.length > 0 ? `메모리 (${configuredComponents.memory.length}개):
${configuredComponents.memory.map((memory, index) => 
  `${index}. ${memory} (${componentSpecs[memory]?.memory}GB, ${componentSpecs[memory]?.power}W)`
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
          <img src="/logo.png" alt="서버 구성 시스템" className="mx-auto h-16" />
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

                    {/* 메모리 섹션 */}
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

export default ServerConfigurator;
