import type { ExperienceEntry } from './types'

// Order = screen order: oldest to newest, with open-source contributions and awards grouped at the end.
export const experienceEn: ExperienceEntry[] = [
  {
    title: 'B.S. in Computer and Information Engineering',
    organization: 'The Catholic University of Korea',
    dateLabel: '2020.03 – 2026.02',
    category: 'Education',
    role: 'Completed the major; joined team projects on the backend and infrastructure side',
    summary:
      'Majored in computer and information engineering while taking the backend and infrastructure roles in team projects: authentication and authorization for a campus ride-sharing app, and AWS infrastructure and deployment automation for a tourism stamp app.',
    highlights: [
      { text: 'AWS infrastructure and Jenkins, AWX, and Blue/Green deployment automation for Geulda as team lead and dev lead (2025.10 – 2025.11)' },
      { text: 'Designed the Kakao OAuth2, JWT, and Redis auth lifecycle and in-filter token reissue on the CATXI backend (2025.05 – 2025.12)' },
    ],
    relatedProjects: ['geulda', 'catxi'],
    techStack: ['Java', 'Spring Boot', 'Python', 'Linux', 'AWS'],
  },
  {
    title: 'Military Service',
    dateLabel: '2022.01 – 2023.10',
    category: 'Military',
    role: 'Service completed',
    summary: 'Served from January 2022 to October 2023.',
    techStack: [],
  },
  {
    title: 'GDGoC CUK, TECH Team Organizer',
    organization: 'Google Developer Groups on Campus CUK',
    dateLabel: '2024.03 – 2025.12',
    category: 'Community',
    role: 'Planned and ran cloud, Java backend, and deep learning study groups',
    summary:
      'Refined the study curriculum each cohort and supported member learning while a 10-person study group grew into a 90-member campus-wide club.',
    techStack: [],
  },
  {
    title: 'University MakeUs Challenge, Server Part',
    organization: 'UMC CUK (app development club across 22 universities)',
    dateLabel: '2024.09 – 2025.11',
    category: 'Community',
    role: 'Server part, Spring Boot backend development',
    summary:
      'Learned REST API design and server structure through the backend study, then joined two web application projects as a server developer, owning backend logic and APIs.',
    highlights: [
      { text: 'momogum backend: user profile, follow, S3 image upload, and feed lookup APIs (2025.01 – 02)' },
      { text: 'BodyBuddy backend: main page and customization page APIs, and the avatar-to-skin relationship (2025.01 – 02)' },
    ],
    techStack: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'AWS S3'],
  },
  {
    title: 'Korea Oracle Work Experience Program — OldYoung Welfare Recommendation Service',
    organization: 'Oracle Korea',
    dateLabel: '2025.06 – 2025.08',
    category: 'Work Experience',
    role: 'Lead and dev lead of a four-person team; owned architecture, deployment, and the AI chatbot',
    summary:
      'Split Spring Boot (API and business logic) from Flask (AI processing), bundled them with Docker Compose, and automated build and deploy with Jenkins. Built a welfare recommendation chatbot combining user income data with Redis multi-turn memory.',
    techStack: ['Spring Boot', 'Spring AI', 'Flask', 'Docker Compose', 'Jenkins', 'Redis', 'AWS EC2'],
  },
  {
    title: 'Hyundai AutoEver Mobility SW School, Cloud Track',
    organization: 'Hyundai AutoEver',
    dateLabel: '2025.12 – 2026.05',
    category: 'Training',
    role: 'Completed; backend developer on the ParkFlow team project',
    summary:
      'Practiced the full flow from code change to deployment: Linux, networking, access control, Docker, Kubernetes, and Jenkins and ArgoCD CI/CD. In the ParkFlow team project, split a parking service into microservices on Kubernetes and moved inter-service calls to gRPC to cut latency.',
    highlights: [
      { text: 'Split Django services by role with a central orchestrator managing the call flow' },
      { text: 'Moved inter-service calls from REST to gRPC, cutting call latency by about 30%' },
      { text: 'Kept consistency and isolated failures in the distributed setup with Saga compensating transactions and circuit breakers' },
      { text: 'Kept 69 tests and over 80% coverage with TDD; synced cluster state with Git through ArgoCD GitOps' },
    ],
    link: 'https://github.com/k8s-Parkflow/park_python',
    techStack: ['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'ArgoCD', 'Django', 'gRPC', 'MariaDB'],
  },
  {
    title: 'Infrastructure Operations for Automotive SoC Development',
    organization: 'Telechips, DevOps Team',
    dateLabel: '2026.05 – Present',
    category: 'Full-time',
    role: "Manager, running the research lab's development infrastructure and the closed-network SoC development servers",
    summary:
      'Provide KVM bare-metal, an OpenStack private cloud, and ONTAP storage to researchers, and manage accounts, permissions, and SDK access with OpenLDAP and Gerrit. Recurring operations were automated with Ansible and an AI agent.',
    highlights: [
      { text: 'Automated repetitive ITSM requests with an AI agent, cutting average daily handling time from 3 hours to 30 minutes' },
      { text: 'Built ONTAP capacity monitoring and reclaimed idle thick volumes, improving volume utilization by about 15%' },
      { text: 'Standardized license and tool deployment to about 80 development servers with four-stage Ansible playbooks' },
      { text: 'Collected server and storage metrics with Prometheus and Grafana, and built per-account usage lookup on the ONTAP API' },
      { text: 'Took part in the ISO 27001 audit, TISAX preparation documents, and government-project hardware procurement' },
    ],
    relatedProjects: ['agentic-ops', 'ontap-monitoring', 'ansible-deploy'],
    techStack: [
      'Linux (Ubuntu·Rocky·Oracle)',
      'KVM',
      'OpenStack',
      'NetApp ONTAP',
      'Ansible',
      'Prometheus',
      'Grafana',
      'Fluent Bit',
      'OpenLDAP',
      'Gerrit',
      'Jenkins',
      'Python',
      'LangChain',
      'vLLM',
    ],
  },
  {
    title: 'Open Source Contribution Academy, OpenStack Track',
    organization: 'NIPA (National IT Industry Promotion Agency)',
    dateLabel: '2026.04 – 2026.06',
    category: 'Training',
    role: 'Mentee; practiced the python-openstackclient contribution process',
    summary:
      'Studied the structure and APIs of core OpenStack services such as Nova and Cinder, the same platform I operate at work, down to the code, and learned the contribution process through Gerrit changes, Zuul CI, and core reviewer approval. Behaviors met in operations could now be traced in the code, and the change submitted after the course was merged.',
    techStack: ['OpenStack', 'Python', 'Gerrit', 'Zuul', 'DevStack', 'tox'],
  },
  {
    title: 'GenAI on EKS — Inference Infrastructure Training',
    organization: 'AWS workshop (OSSAI)',
    dateLabel: '2026.07 – 2026.09',
    category: 'Training',
    role: 'Participant, hands-on labs',
    summary:
      'Served Qwen 3 and DeepSeek R1 with vLLM, unified them with Bedrock Claude behind one LiteLLM gateway, tracked tokens and cost in Langfuse, and deployed LangGraph and MCP agents on EKS. Learned that operating an agent after deployment, watching latency, cost, and quality, matters more than building it.',
    techStack: ['Amazon EKS', 'vLLM', 'LiteLLM', 'Langfuse', 'LangGraph', 'MCP', 'Karpenter'],
  },
  {
    title: 'Open-source Contributions — Reading the Tools I Use Down to the Code',
    organization:
      'jenkinsci/docker · openstack/python-openstackclient · Yeachan-Heo/oh-my-claudecode · Yeachan-Heo/gajae-code · openchoreo/openchoreo · devfloor9/engineering-playbook',
    dateLabel: '2026.02 – Present',
    category: 'Open Source',
    role: 'Issue reports, PRs and changes, and review follow-up',
    summary:
      'Started with the official Jenkins Docker image I had used since university, then moved on to the OpenStack client I operate at work, two agent tools I use daily, Jenkins backend docs, and an AWS engineering playbook. Five merged and one issue report, each matching its public record one-to-one.',
    highlights: [
      {
        text: 'jenkinsci/docker: reported a retry function whose backoff comment did not match its behavior in issue #2266, and after discussion with the maintainer the unused-code removal PR #2268 was merged (2026.02)',
        href: 'https://github.com/jenkinsci/docker/pull/2268',
      },
      {
        text: 'oh-my-claudecode: reported a deadlock where the ultragoal guard blocked every tool call in issues #3506 and #3513, and PR #3514 fixing the contract mismatch between the handoff text and the guard was merged (2026.07)',
        href: 'https://github.com/Yeachan-Heo/oh-my-claudecode/pull/3514',
      },
      {
        text: 'python-openstackclient: confirmed that a v2 functional test leaving a cinder service disabled had been permanently skipped since Xena, and change 997058 removing it was merged (2026.08)',
        href: 'https://review.opendev.org/c/openstack/python-openstackclient/+/997058',
      },
      {
        text: 'gajae-code: reported in issue #4727 that user steering stayed queued until a subagent await ended, and PR #4728 making only the wait tool react to steering was merged (2026.08)',
        href: 'https://github.com/Yeachan-Heo/gajae-code/pull/4728',
      },
      {
        text: 'openchoreo: reported in issue #4880, with code evidence, that README and CONTRIBUTING disagreed on Jenkins backend configuration; the maintainer confirmed it would be fixed (2026.08)',
        href: 'https://github.com/openchoreo/openchoreo/issues/4880',
      },
      {
        text: 'engineering-playbook (AWS architecture playbook): PR #35 translating the EKS VPC CNI deep-dive doc to English following the existing English doc conventions was merged (2026.09)',
        href: 'https://github.com/devfloor9/engineering-playbook/pull/35',
      },
    ],
    techStack: ['Shell', 'Python', 'TypeScript', 'Docker', 'Gerrit', 'Markdown'],
  },
  {
    title: 'Awards',
    organization: 'The Catholic University of Korea · GDGoC CUK',
    dateLabel: '2024.06 – 2025.11',
    category: 'Awards',
    role: 'Team lead, PM, and dev lead at the competition; dataset collection and preprocessing at the hackathon',
    summary:
      "Won the grand prize at the campus major competency competition with Geulda's AWS infrastructure and Blue/Green deployment automation, and the grand prize at the GDGoC CUK hackathon with an early dementia-detection AI model project.",
    highlights: [
      {
        text: 'Grand prize, major competency competition (2025.11.24): as team lead, PM, and dev lead, owned AWS infrastructure and Jenkins and AWX deployment automation, automating a six-step manual deployment and cutting deployment time from 30 minutes to under 10',
      },
      {
        text: 'Grand prize, GDGoC CUK hackathon (2024.06.30): on the UN SDG theme of elderly dementia prevention, owned dataset collection, preprocessing, and data quality criteria for an early dementia-detection AI model',
      },
    ],
    relatedProjects: ['geulda'],
    techStack: ['AWS', 'Jenkins', 'Ansible AWX', 'Python'],
  },
]
