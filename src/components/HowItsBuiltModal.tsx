import React, { useState, useEffect } from 'react';
import {
  BuiltComponentCard,
  ComponentIconType,
  SPACECRAFT_HARDWARE_COMPONENTS
} from '../data/howItsBuiltData';
import { SENTINEL_MISSIONS } from '../data/sentinelsData';
import {
  BatteryCharging,
  Box,
  Camera,
  Code2,
  Compass,
  Cpu,
  Database,
  Fan,
  Flame,
  Layers,
  Layout,
  Radio,
  Shield,
  Sparkles,
  Wrench,
  X
} from 'lucide-react';

interface HowItsBuiltModalProps {
  isOpen: boolean;
  initialMissionId?: string;
  onClose: () => void;
}

export const HowItsBuiltModal: React.FC<HowItsBuiltModalProps> = ({
  isOpen,
  initialMissionId = 'ingenuity-helicopter',
  onClose
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(initialMissionId);

  useEffect(() => {
    if (initialMissionId && SPACECRAFT_HARDWARE_COMPONENTS[initialMissionId]) {
      setSelectedMissionId(initialMissionId);
    }
  }, [initialMissionId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeBlueprint =
    SPACECRAFT_HARDWARE_COMPONENTS[selectedMissionId] ||
    SPACECRAFT_HARDWARE_COMPONENTS['ingenuity-helicopter'];

  const renderComponentIcon = (icon: ComponentIconType) => {
    switch (icon) {
      case 'antenna':
        return <Radio className="w-4 h-4 text-[#D2F366]" />;
      case 'power':
        return <BatteryCharging className="w-4 h-4 text-[#F5D061]" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-[#38BDF8]" />;
      case 'propulsion':
        return <Flame className="w-4 h-4 text-[#FB923C]" />;
      case 'chassis':
        return <Layers className="w-4 h-4 text-[#C084FC]" />;
      case 'computer':
        return <Cpu className="w-4 h-4 text-[#34D399]" />;
      case 'sensor':
        return <Compass className="w-4 h-4 text-[#60A5FA]" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-[#F472B6]" />;
      case 'wheels':
        return <Wrench className="w-4 h-4 text-[#A3E635]" />;
      case 'rotor':
        return <Fan className="w-4 h-4 text-[#D2F366]" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-[#38BDF8]" />;
      case 'layout':
        return <Layout className="w-4 h-4 text-[#C084FC]" />;
      case 'box3d':
        return <Box className="w-4 h-4 text-[#D2F366]" />;
      case 'database':
        return <Database className="w-4 h-4 text-[#34D399]" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-4 h-4 text-[#F5D061]" />;
    }
  };

  const renderCard = (card: BuiltComponentCard) => (
    <div
      key={card.id}
      className="group rounded-2xl bg-[#0A071E]/80 border border-purple-500/25 shadow-sm p-4 sm:p-5 transition-all flex flex-col justify-between text-slate-100 hover:border-purple-400"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-purple-950/50 border border-purple-500/40 shadow-sm flex items-center justify-center shrink-0">
              {renderComponentIcon(card.icon)}
            </div>
            <div className="min-w-0">
              <h4 className="font-display text-sm sm:text-base font-extrabold text-white truncate">
                {card.name}
              </h4>
              <span className="font-mono text-[11px] uppercase tracking-wider block truncate text-purple-400 font-bold">
                {card.partCategory}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">
          {card.oneLineExplanation}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#03050C]/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-its-built-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl cosmic-card backdrop-blur-2xl bg-[#0E0B22]/95 border border-purple-500/35 shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-6 sm:p-9 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-6 mb-7 border-b border-purple-500/20">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              <Wrench className="w-3.5 h-3.5 text-purple-400" />
              <span>SPACECRAFT FLIGHT HARDWARE ANATOMY</span>
            </div>
            <h2
              id="how-its-built-modal-title"
              className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white"
            >
              How It’s Built
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-2xl font-sans font-medium">
              Explore the actual flight hardware components, scientific instruments, and engineering subsystems inside each NASA space vehicle.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close How It's Built modal"
            className="w-10 h-10 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:text-white hover:bg-purple-900/50 flex items-center justify-center cursor-pointer shrink-0 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SPACECRAFT HARDWARE COMPONENTS */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400">
                SPACECRAFT FLIGHT HARDWARE ANATOMY
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mt-1">
                {activeBlueprint.missionName} — Key Hardware Components
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                {activeBlueprint.manufacturerSummary}
              </p>
            </div>

            <span className="font-mono text-xs font-bold text-cyan-300 shrink-0">
              {activeBlueprint.components.length} Core Flight Subsystems
            </span>
          </div>

          {/* Spacecraft Selector Pill Bar */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin"
            role="tablist"
            aria-label="Select a space vehicle to inspect how it is built"
          >
            {SENTINEL_MISSIONS.map((m) => {
              const isSelected = m.id === selectedMissionId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedMissionId(m.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'cosmic-btn-primary shadow-[0_0_16px_rgba(168,85,247,0.5)]'
                      : 'bg-[#0A071E]/80 border-purple-500/25 text-slate-300 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  <span>{m.indexNumber}</span> {m.name}
                </button>
              );
            })}
          </div>

          {/* Hardware Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {activeBlueprint.components.map((card) => renderCard(card))}
          </div>
        </div>
      </div>
    </div>
  );
};
