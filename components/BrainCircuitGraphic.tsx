import React from 'react';

const BrainCircuitGraphic: React.FC = () => {
    return (
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md h-auto">
            <defs>
                <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgba(192, 132, 252, 1)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgba(96, 165, 250, 1)', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                 <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background glow elements */}
            <circle cx="200" cy="150" r="100" fill="rgba(96, 165, 250, 0.1)" filter="url(#glow)" />
            <circle cx="200" cy="150" r="130" fill="rgba(192, 132, 252, 0.05)" filter="url(#glow-soft)" />

            {/* Main Circuit Lines */}
            <g stroke="url(#brain-gradient)" strokeWidth="2" fill="none" filter="url(#glow)">
                {/* Brain Outline Shape */}
                <path d="M200,50 C120,50 100,150 120,200 C140,250 150,250 200,250 C250,250 260,250 280,200 C300,150 280,50 200,50 Z" strokeWidth="3" opacity="0.8"/>
                {/* Internal Circuits */}
                <path d="M200,52 Q150,80 140,150 T200,248" opacity="0.6"/>
                <path d="M200,52 Q250,80 260,150 T200,248" opacity="0.6"/>
                <path d="M130,90 Q170,110 200,100 Q230,90 270,90" />
                <path d="M125,120 Q160,140 200,150 Q240,160 275,180" />
                <path d="M120,200 Q150,180 200,190 Q250,200 280,200" />
                <path d="M160,55 Q180,80 200,70 Q220,60 240,55" />
                <path d="M170,245 Q185,220 200,230 Q215,240 230,245" />
            </g>

            {/* Circuit Nodes */}
            <g fill="white">
                 {/* Outer nodes */}
                 {[
                    { cx: 200, cy: 50 }, { cx: 145, cy: 70 }, { cx: 255, cy: 70 },
                    { cx: 120, cy: 110 }, { cx: 280, cy: 110 }, { cx: 110, cy: 160 },
                    { cx: 290, cy: 160 }, { cx: 120, cy: 200 }, { cx: 280, cy: 200 },
                    { cx: 150, cy: 230 }, { cx: 250, cy: 230 }, { cx: 200, cy: 250 }
                 ].map((p, i) => <circle key={`outer-${i}`} cx={p.cx} cy={p.cy} r="3" opacity="0.9" filter="url(#glow-soft)" />)}

                {/* Inner nodes */}
                 {[
                    { cx: 200, cy: 100 }, { cx: 200, cy: 150 }, { cx: 200, cy: 190 },
                    { cx: 160, cy: 130 }, { cx: 240, cy: 130 }, { cx: 170, cy: 170 }, { cx: 230, cy: 170 }
                 ].map((p, i) => <circle key={`inner-${i}`} cx={p.cx} cy={p.cy} r="2" opacity="0.7" />)}
            </g>
             <g stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.5" fill="none">
                <path d="M290,160 C350,160 360,100 380,80" />
                <path d="M290,160 C350,160 360,220 380,240" />
                <path d="M110,160 C50,160 40,100 20,80" />
                <path d="M110,160 C50,160 40,220 20,240" />
            </g>
        </svg>
    );
};

export default BrainCircuitGraphic;