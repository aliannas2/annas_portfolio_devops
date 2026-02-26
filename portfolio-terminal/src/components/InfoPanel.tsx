import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  flex: 0 0 450px;
  background-color: #1e1e1e;
  border-left: 1px solid #333;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  color: #e0e0e0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  overflow-y: auto;
  box-shadow: -5px 0 15px rgba(0,0,0,0.2);

  @media (max-width: 1024px) {
    flex: 0 0 300px;
  }

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    border-left: none;
    border-top: 1px solid #333;
    padding: 20px;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #00ff00;
  margin: 0 0 10px 0;
  font-family: 'Courier New', Courier, monospace;
`;

const Subtitle = styled.h2`
  font-size: 1.1rem;
  color: #888;
  margin: 0;
  font-weight: 500;
`;

const ContentBlock = styled.div`
  margin-bottom: 25px;
  line-height: 1.6;

  p {
    margin: 0 0 15px 0;
    font-size: 0.95rem;
  }
`;

const Highlight = styled.span`
  color: #00ccff;
  font-family: 'Courier New', Courier, monospace;
`;



const InfoPanel: React.FC = () => {
  return (
    <PanelContainer>
      <Header>
        <Title>System Authorized</Title>
        <Subtitle>Welcome to the Cloud Portfolio</Subtitle>
      </Header>

      <ContentBlock>
        <p>
          I'm <strong>Annas Ali</strong>, a Senior DevOps Engineer specializing in scalable AWS architectures, CI/CD orchestration, and infrastructure automation.
        </p>
        <p>
          This interactive terminal is designed to showcase my technical environment.
          Use the left sidebar or type <Highlight>help</Highlight> in the console to navigate through my experience, projects, and system architectures.
        </p>
        <p>
          Beyond infrastructure, my passions lie in optimizing performance, enhancing security postures, and building tools that empower developers to ship faster. I hold active certifications in AWS and Kubernetes.
        </p>
      </ContentBlock>

      <ContentBlock>
        <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px', marginTop: '30px' }}>Capabilities Overview:</h3>
        <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem', color: '#ccc', lineHeight: '2' }}>
          <li>🚀 <strong>Cloud Orchestration</strong>: EKS, ECS Fargate, Lambda</li>
          <li>🏗️ <strong>Infrastructure as Code</strong>: Terraform, CloudFormation</li>
          <li>⚙️ <strong>CI/CD Pipelines</strong>: Jenkins, CodePipeline, ArgoCD</li>
          <li>🛡️ <strong>Security & Compliance</strong>: IAM Identity Center, Stackrox</li>
          <li>📊 <strong>Observability</strong>: Datadog, CloudWatch, New Relic</li>
        </ul>
      </ContentBlock>

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #333', fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
        <p>System Online. Terminal Ready.</p>
      </div>
    </PanelContainer>
  );
};

export default InfoPanel;
