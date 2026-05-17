import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
  color: #cccccc;
  font-family: 'Courier New', Courier, monospace;
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
`;

const LogLine = styled.div<{ $type?: 'info' | 'success' | 'warning' | 'error' }>`
  line-height: 1.5;
  color: ${props =>
        props.$type === 'success' ? '#00ff00' :
            props.$type === 'warning' ? '#ffff00' :
                props.$type === 'error' ? '#ff0000' :
                    '#cccccc'};
`;

const ProgressBar = styled.div<{ $width: number }>`
  height: 10px;
  background-color: #333;
  width: 300px;
  margin: 10px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$width}%;
    background-color: #00ff00;
    transition: width 0.2s;
  }
`;

interface DeploySimulationProps {
    onComplete: () => void;
}

const DeploySimulation: React.FC<DeploySimulationProps> = ({ onComplete }) => {
    const [logs, setLogs] = useState<{ msg: string, type?: 'info' | 'success' | 'warning' | 'error' }[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const steps = [
        { msg: "Initializing Terraform backend...", delay: 500 },
        { msg: "Acquiring state lock. This may take a few moments...", delay: 1000 },
        { msg: "Terraform initialized in an empty directory!", type: 'success', delay: 800 },
        { msg: "Refreshing Terraform state in-memory prior to plan...", delay: 1200 },
        { msg: "aws_s3_bucket.frontend: Refreshing state... [id=annas-portfolio-web]", delay: 300 },
        { msg: "aws_dynamodb_table.data: Refreshing state... [id=ResumeData]", delay: 300 },
        { msg: "aws_lambda_function.api: Refreshing state... [id=portfolio-backend]", delay: 300 },
        { msg: "Plan: 0 to add, 1 to change, 0 to destroy.", delay: 800 },
        { msg: "Do you want to perform these actions? yes", type: 'warning', delay: 1000 },
        { msg: "aws_lambda_function.api: Modifying...", delay: 500 },
        { msg: "aws_lambda_function.api: Modifications complete after 2s [id=portfolio-backend]", type: 'success', delay: 2000 },
        { msg: "Apply complete! Resources: 0 added, 1 changed, 0 destroyed.", type: 'success', delay: 500 },
        { msg: "Outputs:", delay: 200 },
        { msg: "api_endpoint = \"https://udbvzcwkp5.execute-api.us-east-1.amazonaws.com\"", type: 'success', delay: 200 },
        { msg: "cloudfront_id = \"E35...\"", type: 'success', delay: 200 },
        { msg: "Deployment Successful.", type: 'success', delay: 1000 },
    ];

    useEffect(() => {
        let currentStep = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        const runStep = () => {
            if (currentStep >= steps.length) {
                setTimeout(onComplete, 2000); // Close after 2 seconds
                return;
            }

            const step = steps[currentStep];
            setLogs(prev => [...prev, { msg: step.msg, type: step.type as any }]);
            setProgress((currentStep / steps.length) * 100);

            timeoutId = setTimeout(() => {
                currentStep++;
                runStep();
            }, step.delay);
        };

        runStep();

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <Container>
            <h2>Deployment Simulation (Terraform)</h2>
            <ProgressBar $width={progress} />
            <br />
            {logs.map((log, i) => (
                <LogLine key={i} $type={log.type}>
                    {log.type === 'success' ? '+ ' : log.type === 'warning' ? '! ' : '> '}
                    {log.msg}
                </LogLine>
            ))}
            <div ref={bottomRef} />
        </Container>
    );
};

export default DeploySimulation;
