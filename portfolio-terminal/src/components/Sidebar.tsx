import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: ${props => props.$isOpen ? '250px' : '50px'};
  background-color: #252526;
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$isOpen ? '250px' : '50px'};
    box-shadow: ${props => props.$isOpen ? '5px 0 15px rgba(0,0,0,0.5)' : 'none'};
    z-index: 1000;
  }
`;

const ToggleButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  &:hover { background: #444; }
`;

const CommandList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  overflow-y: auto;
`;

const CommandBtn = styled.button<{ $isOpen: boolean }>`
  background: #1e1e1e;
  color: #00ff00;
  border: 1px solid #333;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isOpen ? 'flex-start' : 'center'};
  gap: ${props => props.$isOpen ? '10px' : '0'};
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #2d2d2d;
    border-color: #00ff00;
    transform: ${props => props.$isOpen ? 'translateX(5px)' : 'none'};
  }

  span:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
  }
`;

interface SidebarProps {
  onCommand: (cmd: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCommand }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  // Close sidebar on mobile when a command is executed
  const handleCommandClick = (cmd: string) => {
    onCommand(cmd);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const commands = [
    { cmd: 'help', label: 'Help / Menu', icon: '?' },
    { cmd: 'about', label: 'About Me', icon: '👤' },
    { cmd: 'skills', label: 'Tech Skills', icon: '⚡' },
    { cmd: 'experience', label: 'Experience', icon: '💼' },
    { cmd: 'projects', label: 'Projects', icon: '🚀' },
    { cmd: 'architecture', label: 'System Arch', icon: '🏗️' },
    { cmd: 'contact', label: 'Contact', icon: '📧' },
    { cmd: 'clear', label: 'Clear Screen', icon: '🧹' },
  ];

  return (
    <SidebarContainer $isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '>' : '<'}
      </ToggleButton>

      <CommandList>
        {commands.map((item) => (
          <CommandBtn
            key={item.cmd}
            $isOpen={isOpen}
            onClick={() => handleCommandClick(item.cmd)}
            title={!isOpen ? item.label : ''}
          >
            <span>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </CommandBtn>
        ))}
      </CommandList>
    </SidebarContainer>
  );
};

export default Sidebar;
