import type { ExperienceEntry } from './types'

export const experienceKo: ExperienceEntry[] = [
  {
    title: '글다 부천 관광 홍보 애플리케이션',
    dateLabel: '25.10 - 11',
    category: '인프라 / 자동화',
    role: '팀 리드, 기획, 백엔드 리드, 인프라·배포 자동화 오너십 총괄',
    summary:
      'AWS 기반 인프라와 Jenkins + AWX 배포 파이프라인을 설계하고, 수동 릴리스 절차를 자동화해 관광 앱 운영을 안정화했습니다.',
    techStack: ['AWS', 'Jenkins', 'AWX', 'Docker', 'Nginx', 'Redis', 'Prometheus', 'Grafana'],
  },
  {
    title: '소득 분위 기반 복지 추천 애플리케이션',
    dateLabel: '25.06 - 08',
    category: '앱 / AI',
    role: 'PM, 기획, 백엔드 개발, 배포 환경 구축, AI 챗봇 개발',
    summary:
      '소득 분위 계산과 복지 추천을 위한 사용자 입력 기반 플로우를 설계하고, 배포 환경 구축과 챗봇 기능을 함께 구현했습니다.',
    techStack: ['Spring Boot 3.5', 'Java 17', 'OpenAI-bom:1.0', 'Redis', 'AWS'],
  },
  {
    title: 'Jenkins 기반 CI/CD 파이프라인 구축',
    dateLabel: '25.06 - 08',
    category: 'CI/CD',
    role: '배포 자동화 및 다중 서비스 릴리스 안정화',
    summary:
      'Jenkins와 Docker Compose로 다중 서비스 배포를 자동화하고, 헬스체크와 롤백 플로우로 운영 안정성을 개선했습니다.',
    techStack: ['Jenkins', 'Docker Compose', 'Spring Boot', 'Redis', 'PostgreSQL', 'Nginx'],
  },
  {
    title: 'CATXI JWT FilterChain 무중단 토큰 재발급 아키텍처',
    dateLabel: '25.05 - 12',
    category: '인증',
    role: '인증 아키텍처 개선',
    summary:
      '만료 토큰 처리를 필터 체인 내부에서 재설계해 컨트롤러 진입 전에 처리하고, 재발급에 드는 네트워크 비용과 지연을 줄였습니다.',
    techStack: ['Spring Security', 'JWT', 'Redis', 'OAuth2'],
  },
  {
    title: 'CATXI 캠퍼스 카풀 애플리케이션',
    category: '백엔드',
    role: '백엔드 리드, 인증·인가 아키텍처',
    summary:
      '캠퍼스 카풀 애플리케이션의 인증·인가 흐름 설계와 백엔드 아키텍처를 담당했습니다.',
    techStack: ['Spring Boot 3.3', 'Java 17', 'MySQL 8.0', 'OAuth2', 'Redis', 'AWS'],
  },
]
