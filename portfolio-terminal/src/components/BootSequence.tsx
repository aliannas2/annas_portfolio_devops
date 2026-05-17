import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BootContainer = styled.div`
  background-color: #1a1a1a;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  padding: 20px;
  overflow: hidden;
`;

const Line = styled.div`
  margin-bottom: 5px;
`;

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);

    const bootLines = [
        "Initializing System...",
        "[OK] Loading Python Scripting Module...",
        "[OK] Verifying CI/CD Pipelines (Jenkins)...",
        "[OK] Connecting to Monitoring (Datadog/New Relic)...",
        "[OK] Checking AWS Credentials...",
        "[OK] Verifying Terraform State...",
        "System Ready. Welcome, User."
    ];

    useEffect(() => {
        let delay = 0;
        bootLines.forEach((line, index) => {
            delay += Math.random() * 500 + 200; // Random delay between 200-700ms
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootLines.length - 1) {
                    setTimeout(onComplete, 1000);
                }
            }, delay);
        });
    }, []);

    return (
        <BootContainer onClick={onComplete} style={{ cursor: 'pointer' }}>
            {lines.map((line, i) => (
                <Line key={i}>{line}</Line>
            ))}
            <Line>_</Line>
            <div style={{ position: 'absolute', bottom: 20, right: 20, fontSize: '0.8rem', opacity: 0.5 }}>
                [Click to Skip]
            </div>
        </BootContainer>
    );
};

export default BootSequence;
