import type { ExperienceEntry } from './types'

export const experience: ExperienceEntry[] = [
  {
    title: 'Geulda Bucheon Tourism Promotion Application',
    dateLabel: '25.10 - 11',
    category: 'Infra / Automation',
    role: 'Overall team lead, planner, backend lead, and owner of infrastructure and deployment automation',
    summary:
      'Designed AWS-based infrastructure and a Jenkins + AWX deployment pipeline, then automated manual release procedures for stable tourism app operations.',
    techStack: ['AWS', 'Jenkins', 'AWX', 'Docker', 'Nginx', 'Redis', 'Prometheus', 'Grafana'],
  },
  {
    title: 'OldYoung Welfare Recommendation App Based on Income Decile',
    dateLabel: '25.06 - 08',
    category: 'App / AI',
    role: 'PM, design, backend engineering, deployment setup, and AI chatbot development',
    summary:
      'Designed a user-input based flow for income-decile and welfare recommendation, while implementing deployment setup and chatbot features.',
    techStack: ['Spring Boot 3.5', 'Java 17', 'OpenAI-bom:1.0', 'Redis', 'AWS'],
  },
  {
    title: 'Jenkins-based CI/CD Pipeline Buildout',
    dateLabel: '25.06 - 08',
    category: 'CI/CD',
    role: 'Deployment automation and multi-service release stabilization',
    summary:
      'Automated multi-service deployments with Jenkins and Docker Compose, and improved operational stability with health checks and rollback flows.',
    techStack: ['Jenkins', 'Docker Compose', 'Spring Boot', 'Redis', 'PostgreSQL', 'Nginx'],
  },
  {
    title: 'CATXI JWT FilterChain No-Downtime Token Reissue Architecture',
    dateLabel: '25.05 - 12',
    category: 'Auth',
    role: 'Authentication architecture improvement',
    summary:
      'Reworked expired-token handling inside the filter chain before controller entry, reducing reissue network cost and latency.',
    techStack: ['Spring Security', 'JWT', 'Redis', 'OAuth2'],
  },
  {
    title: 'CATXI Taxi Ride-Sharing Application',
    category: 'Backend',
    role: 'Backend lead, authentication and authorization architecture',
    summary:
      'Owned authentication and authorization flow design and backend architecture for a campus ride-sharing app.',
    techStack: ['Spring Boot 3.3', 'Java 17', 'MySQL 8.0', 'OAuth2', 'Redis', 'AWS'],
  },
]
