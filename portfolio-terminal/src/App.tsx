import React, { useState } from 'react';
import Terminal from 'react-console-emulator';

import BootSequence from './components/BootSequence';
import ArchitectureViewer from './components/ArchitectureViewer';
import Sidebar from './components/Sidebar';
import InfoPanel from './components/InfoPanel';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto;
    margin-left: 50px; /* Leave space for the collapsed absolute sidebar */
  }
`;

const TerminalWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  min-width: 0;

  @media (max-width: 768px) {
    height: 60vh;
    flex: none;
  }
`;


import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000'; // Replace with real API URL later

const apiCall = async (path: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}${path}`);
    return response.data;
  } catch (error) {
    return 'Error fetching data.';
  }
};



class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Terminal Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: 20 }}>
        <h1>Something went wrong with the Terminal.</h1>
        <pre>{this.state.error?.toString()}</pre>
      </div>;
    }

    return this.props.children;
  }
}

const StatusBar = () => (
  <div style={{
    backgroundColor: '#333',
    color: '#00ff00',
    padding: '5px 10px',
    fontFamily: 'Courier New',
    fontSize: '0.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #444',
    zIndex: 2000
  }}>
    <span>USER: annas@cloud</span>
    <span>REGION: us-east-1</span>
    <span>Latency: 24ms</span>
    <span>STATUS: ONLINE</span>
  </div>
);

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);

  const [showArch, setShowArch] = useState(false);
  const [archId, setArchId] = useState<string | undefined>(undefined);
  // const [showDeploy, setShowDeploy] = useState(false); // Removed
  const terminalRef = React.useRef<any>(null);

  const commands = {
    about: {
      description: 'About Annas',
      fn: async () => {
        try {
          const data = await apiCall('/resume?section=basics');
          const aboutData = data.data?.basics;
          if (aboutData) {
            return `
Name: ${aboutData.name}
Role: ${aboutData.label}
Email: ${aboutData.email}
Phone: ${aboutData.phone}
Location: ${aboutData.location}
Profiles:
${aboutData.profiles?.map((p: any) => `- ${p.network}: ${p.url}`).join('\n')}
            `.trim();
          }
        } catch (e) {
          console.error(e);
        }

        return `
Annas Ali
Senior DevOps Engineer | AWS Certified Professional
---------------------------------------------------
Location: Lahore, Pakistan
Contact: ali.annus02@gmail.com | +923018678867
Current: DevOps Engineer at Emumba
Profiles:
- LinkedIn: https://www.linkedin.com/in/annas-ali-71842a162/
- GitHub: https://github.com/aliannus2
      `.trim();
      }
    },
    skills: {
      description: 'List technical skills',
      fn: async () => {
        const data = await apiCall('/resume?section=skills');
        const skillsData = data.data?.skills;
        // In DB, skills might be a list of strings or list of objects?
        // JSON shows: "skills": [ "AWS ...", ... ] (Strings)
        if (Array.isArray(skillsData)) {
          return skillsData.map((s: any) => {
            if (typeof s === 'string') return `- ${s}`;
            return `- ${s.value || JSON.stringify(s)}`;
          }).join('\n');
        }
        return `
AWS Services: EC2, S3, RDS, DynamoDB, Lambda, API Gateway, SNS, SQS, Glue
CI/CD: Jenkins, AWS CodePipeline, GitHub Actions, ArgoCD
Networking: DNS, VPC, Load Balancers, VPN
Scripting: Python, Bash, Powershell, Ansible
IaC: Terraform, CloudFormation
Containerization: Docker, Kubernetes, ECS, Helm
Monitoring: Datadog, New Relic, CloudWatch
Databases: MSSQL, MySQL, DynamoDB, Redshift
Security: WAF, IAM, GuardDuty, KMS, Secrets Manager
      `.trim();
      }
    },
    experience: {
      description: 'Show experience',
      fn: async () => {
        try {
          const data = await apiCall('/resume?section=work');
          const expData = data.data?.work;
          if (Array.isArray(expData)) {
            return expData.map((job: any) => {
              return `
------------------------------------------------
${job.position} @ ${job.company}
${job.startDate} - ${job.endDate} | ${job.location}
------------------------------------------------
${job.summary ? `Summary: ${job.summary}\n` : ''}
Highlights:
${job.highlights ? job.highlights.map((h: string) => `- ${h}`).join('\n') : ''}
              `.trim();
            }).join('\n\n');
          }
        } catch (e) {
          return `Error fetching experience: ${e}`;
        }
        return "No experience data found.";
      }
    },
    projects: {
      description: 'Show key projects',
      fn: async () => {
        try {
          const data = await apiCall('/resume?section=projects');
          const projData = data.data?.projects;
          if (Array.isArray(projData)) {
            return projData.map((p: any) => {
              let output = `
[${p.name}]
${p.highlights ? p.highlights.map((h: string) => `- ${h}`).join('\n') : ''}
              `.trim();

              if (p.name.includes('Serverless Jenkins')) {
                output += '\n\n[INFO] Architecture Diagram Available: Type "architecture serverless-jenkins" to view.';
              }

              return output;
            }).join('\n\n');
          }
        } catch (e) {
          return `Error: ${e}`;
        }
      }
    },
    education: {
      description: 'Show education',
      fn: async () => {
        try {
          const data = await apiCall('/resume?section=education');
          const eduData = data.data?.education;
          if (Array.isArray(eduData)) {
            return eduData.map((e: any) => {
              return `${e.studyType} in ${e.area} @ ${e.institution}\n${e.startDate} - ${e.endDate}`;
            }).join('\n\n');
          }
        } catch (e) {
          return `Error: ${e}`;
        }
      }
    },
    certificates: {
      description: 'Show certifications',
      fn: async () => {
        try {
          const data = await apiCall('/resume?section=certificates');
          const certData = data.data?.certificates;
          if (Array.isArray(certData)) {
            return certData.map((c: any) => {
              return `- ${c.name} (${c.issuer}) - ${c.date || ''}`;
            }).join('\n');
          }
        } catch (e) {
          return `Error: ${e}`;
        }
      }
    },
    help: {
      description: 'List all available commands',
      fn: () => {
        return `
Available commands:
- about: Personal Information
- experience: Work History
- projects: Key Projects
- skills: Technical Skills
- education: Education History
- certificates: Certifications
- contact: Contact Info
- clear: Clear the terminal
        `.trim();
      }
    },
    contact: {
      description: 'Contact info',
      fn: () => {
        return 'Email: ali.annus02@gmail.com\nLinkedIn: linkedin.com/in/annas-ali-71842a162'
      }
    },
    clear: {
      description: 'Clear terminal',
      fn: () => {
        // @ts-ignore
        terminalRef.current?.clearStdout();
        return null;
      }
    },
    architecture: {
      description: 'View System Architecture (Usage: architecture [id])',
      fn: (...args: string[]) => {
        const id = args.length > 0 ? args[0] : undefined;
        setArchId(id);
        setShowArch(true);
        return 'Opening Architecture Diagram...';
      }
    }
  };

  if (booting) {
    return <BootSequence onComplete={() => setBooting(false)} />;
  }


  const handleCommand = (cmd: string) => {
    if (terminalRef.current) {
      // @ts-ignore - Accessing internal emulator methods
      const terminal = terminalRef.current;
      terminal.terminalInput.current.value = cmd;
      terminal.processCommand();
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex' }}>
        <Sidebar onCommand={handleCommand} />
        <ContentWrapper>
          <TerminalWrapper>
            {showArch && <ArchitectureViewer onClose={() => setShowArch(false)} initialId={archId} />}
            <ErrorBoundary>
              <Terminal
                ref={terminalRef}
                commands={commands}
                noDefaults
                welcomeMessage={'Welcome to Annas Ali\'s Portfolio. Type "help" to see available commands.'}
                promptLabel={'annas@cloud:~$'}
                style={{
                  backgroundColor: '#1a1a1a',
                  minHeight: '100%',
                  maxHeight: '100%',
                  overflow: 'auto',
                  fontFamily: 'Courier New'
                }}
                contentStyle={{ color: '#00ff00' }}
                promptLabelStyle={{ color: '#00ccff' }}
                inputTextStyle={{ color: '#ffffff' }}
              />
            </ErrorBoundary>
          </TerminalWrapper>
          <InfoPanel />
        </ContentWrapper>
      </div>
      {!showArch && <StatusBar />}
    </div>
  );
};

export default App;
