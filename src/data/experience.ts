import type { ExperienceEntry } from '../types/experience'

export const experience: ExperienceEntry[] = [
  {
    title: 'Geulda 부천시 관광 진흥 애플리케이션',
    dateLabel: '25.10 - 11',
    category: 'Infra / Automation',
    role: '팀 전체 리드, 기획, BE 파트장, 인프라 환경 및 배포 자동화 구축',
    summary:
      '관광 앱 운영을 위해 AWS 기반 인프라와 Jenkins + AWX 배포 파이프라인을 설계하고 수동 배포 절차를 자동화했습니다.',
    techStack: ['AWS', 'Jenkins', 'AWX', 'Docker', 'Nginx', 'Redis', 'Prometheus', 'Grafana'],
  },
  {
    title: 'OldYoung 수급 분위 기반 복지 혜택 추천 애플리케이션',
    dateLabel: '25.06 - 08',
    category: 'App / AI',
    role: 'PM, 디자인, 백엔드, 배포 환경 구축 및 AI 챗봇 개발',
    summary:
      '사용자 입력을 기반으로 수급 분위와 복지 혜택을 추천하는 흐름을 설계하고 배포 환경과 챗봇 기능 구현을 맡았습니다.',
    techStack: ['Spring Boot 3.5', 'Java 17', 'OpenAI-bom:1.0', 'Redis', 'AWS'],
  },
  {
    title: 'Jenkins 기반 CI/CD 파이프라인 구축',
    dateLabel: '25.06 - 08',
    category: 'CI/CD',
    role: '배포 자동화 및 멀티 서비스 배포 안정화',
    summary:
      'Jenkins와 Docker Compose를 활용해 멀티 서비스 배포를 자동화하고 health check와 롤백 흐름으로 운영 안정성을 높였습니다.',
    techStack: ['Jenkins', 'Docker Compose', 'Spring Boot', 'Redis', 'PostgreSQL', 'Nginx'],
  },
  {
    title: 'CATXI JWTFilterChain 내부 무중단 토큰 재발급 구조 도입',
    dateLabel: '25.05 - 12',
    category: 'Auth',
    role: '인증 구조 개선',
    summary:
      '만료 토큰이 컨트롤러까지 진입하던 흐름을 필터 체인 내부에서 재구성해 재발급 네트워크 비용과 지연을 줄였습니다.',
    techStack: ['Spring Security', 'JWT', 'Redis', 'OAuth2'],
  },
  {
    title: 'CATXI 택시 동승 애플리케이션',
    category: 'Backend',
    role: 'BE 파트장, 인증 및 인가 환경 구축',
    summary:
      '가톨릭대학교 학생 대상 택시 동승 앱에서 인증과 인가 흐름, 백엔드 구조를 담당했습니다.',
    techStack: ['Spring Boot 3.3', 'Java 17', 'MySQL 8.0', 'OAuth2', 'Redis', 'AWS'],
  },
]
