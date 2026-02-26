import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import styled from 'styled-components';
import { architectures } from '../data/architectures';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: row;
  z-index: 1000;
  font-family: 'Courier New', Courier, monospace;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1e1e1e;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
  position: relative;
`;

const DiagramContainer = styled.div`
  flex: 1;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  position: relative;
  
  svg {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Title = styled.h2`
  color: #00ff00;
  margin: 0 0 10px 0;
  font-size: 1.5rem;
`;

const Description = styled.p`
  color: #ccc;
  margin: 0 0 20px 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: 1px solid #ff4444;
  color: #ff4444;
  padding: 8px 16px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  z-index: 10;
  background: rgba(0,0,0,0.5);

  &:hover {
    background: #ff4444;
    color: #fff;
  }
`;

const MenuButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#333' : 'transparent'};
  color: ${props => props.$active ? '#00ff00' : '#888'};
  border: 1px solid ${props => props.$active ? '#00ff00' : 'transparent'};
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 8px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

interface ArchitectureViewerProps {
  onClose: () => void;
  initialId?: string;
}

const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ onClose, initialId }) => {
  const [selectedId, setSelectedId] = useState(initialId || architectures[0].id);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const selectedArch = architectures.find(a => a.id === selectedId) || architectures[0];

  useEffect(() => {
    if (initialId) setSelectedId(initialId);
  }, [initialId]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Courier New',
      maxTextSize: 999999, // Allow large diagrams
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current && selectedArch) {
        mermaidRef.current.innerHTML = ''; // Clear previous
        const id = `mermaid-${selectedArch.id}-${Date.now()}`;
        try {
          const { svg } = await mermaid.render(id, selectedArch.mermaid);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering failed', error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = '<div style="color:red; pading:20px;">Error rendering diagram. Please check syntax.</div>';
          }
        }
      }
    };

    renderDiagram();
  }, [selectedId, selectedArch]);

  return (
    <Overlay>
      <Sidebar>
        <h3 style={{ color: '#fff', borderBottom: '1px solid #555', paddingBottom: '10px', marginTop: 0 }}>Architectures</h3>
        {architectures.map(arch => (
          <MenuButton
            key={arch.id}
            $active={arch.id === selectedId}
            onClick={() => setSelectedId(arch.id)}
          >
            {arch.title}
          </MenuButton>
        ))}
      </Sidebar>

      <MainContent>
        <CloseButton onClick={onClose}>[ CLOSE X ]</CloseButton>
        <Title>{selectedArch.title}</Title>
        <Description>{selectedArch.description}</Description>
        <DiagramContainer ref={mermaidRef} />
      </MainContent>
    </Overlay>
  );
};

export default ArchitectureViewer;
