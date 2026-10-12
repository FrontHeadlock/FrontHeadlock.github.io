import type { Project } from './types'

// Order = screen order: in-house projects from the current role first, then university projects.
// In-house entries carry no customer names, SoC project names, or internal identifiers.
export const projectsEn: Project[] = [
  {
    slug: 'agentic-ops',
    title: 'AI Agent Platform',
    kind: 'In-house',
    period: '2026',
    subtitle: 'Agent Platform for Repetitive ITSM Requests',
    summary: 'An AI agent platform that routes repetitive ITSM account and permission requests through classification, planning, approval, and dry-run',
    focus: 'AI judges, deterministic code executes. Daily repetitive work cut from 3 hours to 30 minutes',
    techStack: ['Python', 'LangChain', 'vLLM', 'Qwen3', 'Jira Service Management', 'Microsoft Teams', 'Gerrit', 'OpenLDAP'],
    overview:
      'While running in-house infrastructure, near-identical Gerrit permission and LDAP account requests arrived through ITSM every day and ate the time meant for infrastructure improvement. Starting with tasks that could be recovered if they failed, I served Qwen3 with vLLM on an idle server and had LangChain-based agents classify requests and draft plans.',
    role: 'Planning, design, implementation, and rollout into operations',
    problem: [
      "Account and permission requests were small but tied directly to researchers' work, so they needed immediate handling and took about 3 hours a day.",
      'The tasks change real operating accounts and permissions, so executing an LLM-made plan as-is could cause changes that are hard to undo.',
    ],
    approach: [
      'Analyzed requests by type and picked highly repetitive, recoverable tasks as the first automation targets.',
      'Designed a router agent that classifies each request and assigns it to a sub-agent, which drafts the execution plan.',
      'Limited AI to classification and planning and separated execution into deterministic code. Only tasks approved by the owner on a Teams plan card and passed through dry-run get executed.',
    ],
    outcomes: [
      'Cut daily repetitive work from about 3 hours to around 30 minutes',
      'Established an operating guardrail that never allows execution without approval and verification',
      'Reallocated the recovered time to infrastructure improvements',
    ],
    learnings: [
      'In AI projects, production guardrails have to be decided before the implementation itself.',
      'Handling requests faster does not improve the job; changing how they are handled is what frees time.',
    ],
    architectureNotes: [
      'ITSM request -> Router Agent (classify) -> Sub-Agent (plan draft)',
      'Plan card -> Teams approval -> dry-run -> deterministic executor (Gerrit / LDAP)',
      'Qwen3 served with vLLM on an idle in-house server',
    ],
    troubleshooting: [
      {
        title: 'Separating Non-deterministic Planning from Deterministic Execution',
        problem: 'Executing agent-made plans directly could wrongly change real accounts and permissions, and some of those changes were hard to reverse.',
        analysis: 'LLM output is not identical every time, and a small change in request wording could change its interpretation.',
        action: 'Limited the AI to classification and plan drafts and left execution to fixed code. Made owner approval on Teams and a dry-run right before execution mandatory.',
        result: 'Only approved and verified tasks were applied, keeping operations stable while daily handling time fell from 3 hours to 30 minutes.',
      },
    ],
  },
  {
    slug: 'ontap-monitoring',
    title: 'ONTAP',
    kind: 'In-house',
    period: '2026',
    teamSize: '2 people',
    subtitle: 'Storage Capacity Monitoring for the SoC Development Environment',
    summary: 'Exposed why user jobs stopped on non-expandable ONTAP storage through layered capacity metrics, and reclaimed idle volumes',
    focus: 'About 15% better volume utilization without expansion, moving from firefighting to early detection',
    techStack: ['NetApp ONTAP', 'NetApp Harvest', 'Prometheus', 'Grafana', 'Fluent Bit', 'ONTAP REST API', 'Python'],
    overview:
      'On ONTAP storage whose expansion was limited by hardware cost, individual volumes kept filling up and stopping user jobs even while the aggregate still had free space. With a colleague, I collected capacity metrics at the aggregate, volume, and qtree levels and tracked trends in Grafana to find the cause.',
    role: 'Built the monitoring system (team of two): metric design, collection setup, and the reclamation and resizing rules',
    problem: [
      'Volumes filled up and stopped jobs while the aggregate still had space, and deleting data did not return the space.',
      'With no view of which account used how much, expansion requests and allocation decisions had no basis.',
    ],
    approach: [
      'Collected capacity metrics at aggregate, volume, and qtree levels with NetApp Harvest and Prometheus, and visualized them in Grafana.',
      'Separated reserved capacity under space-guarantee from logical usage and actual footprint, and tracked snapshot reserve overflow and per-account quota trends alongside.',
      'Collected ONTAP EMS events with Fluent Bit so capacity changes and operational records at failure time appear on the same screen.',
      'Built per-account usage lookup on the ONTAP API and cleaned up concentrated usage first.',
    ],
    outcomes: [
      'About 15% better volume utilization versus the previous baseline by reclaiming idle thick volumes',
      'Set NVMe volume resizing rules that weigh deduplication ratio, logical and physical usage, and aggregate headroom together',
      'Kept the development environment running without expansion and used the metrics as the basis for server and storage allocation and hardware procurement decisions',
    ],
    learnings: [
      'Storage capacity problems only show their cause when the different numbers at each layer are viewed together.',
      'With metrics, operations shift from cleaning up failures to catching them first.',
    ],
    architectureNotes: [
      'ONTAP -> NetApp Harvest -> Prometheus -> Grafana (aggregate / volume / qtree / snapshot)',
      'ONTAP EMS -> Fluent Bit -> operational event log alongside capacity trends',
      'ONTAP REST API -> per-account usage lookup',
    ],
    troubleshooting: [
      {
        title: 'Volume Space Eaten by Snapshots',
        problem: 'Deleting data did not free volume space, and snapshots that overflowed their reserve ate into the data area and stopped jobs.',
        analysis: "Snapshots kept holding the pre-deletion blocks, and the overflow beyond the reserve was being taken from the volume's data area.",
        action: 'Monitored snapshot reserve, usage, and overflow together to catch shortage signs early, and identified and reclaimed idle thick volumes.',
        result: 'Job stoppages could now be traced to the volume and snapshot level, and volume utilization improved by about 15%.',
      },
    ],
  },
  {
    slug: 'ansible-deploy',
    title: 'Ansible',
    kind: 'In-house',
    period: '2026',
    subtitle: 'Four-stage Ansible Deployment for About 80 Development Servers',
    summary: 'Standardized license and tool installs that used to be done by hand per server into pre-check, staging, deploy, and rollback playbooks',
    focus: 'Deployment designed for failure: check before applying, roll out to a subset first, and keep a way back',
    techStack: ['Ansible', 'Linux (Ubuntu·Rocky·Oracle)', 'KVM', 'OpenStack', 'Shell'],
    overview:
      'Installing licenses and tools by hand on about 80 development servers left versions and settings drifting between servers and caused frequent mistakes. I organized every server into grouped inventories and rebuilt the deployment as four-stage playbooks.',
    role: 'Designed the deployment system, wrote the playbooks, and applied it in operations',
    problem: [
      'Manual installs left versions and settings differing per server, with no way to track how far a rollout had gone.',
      'Per-server shell scripts that failed midway stopped in a half-applied state with no way back.',
    ],
    approach: [
      'Organized every server into a grouped inventory so targets were explicit.',
      'Added a pre-check stage that verifies permissions, disk headroom, and reachability so failure causes are filtered out before deployment.',
      'Applied to a subset first in staging, expanded to all after confirmation, and added a rollback stage that restores the previous state on failure.',
      'Recorded per-host results so the rollout state is traceable.',
    ],
    outcomes: [
      'Standardized per-server manual deployment and reduced human error',
      'Established an idempotent base where repeating the same deployment yields the same result',
    ],
    learnings: ['Operational changes must be designed for failure; automation without checks, partial rollout, and rollback is just faster manual work.'],
    architectureNotes: [
      'Inventory (grouped) -> pre-check -> staging (subset) -> deploy (all) -> rollback (on failure)',
      'Per-host execution results recorded for rollout tracking',
    ],
    troubleshooting: [
      {
        title: 'From Shell Scripts to Ansible',
        problem: 'Per-server shell scripts moved on to the next server or stopped half-applied when they failed midway.',
        analysis: 'Scripts simply ran commands in order without verifying state, and failure handling differed per script.',
        action: 'Moved to state-declarative Ansible and split the work into pre-check, staging, deploy, and rollback playbooks.',
        result: 'Repeating the same playbook now gives the same result, and failed hosts can be found in the records and rolled back immediately.',
      },
    ],
  },
  {
    slug: 'geulda',
    title: 'Geulda',
    kind: 'University team project',
    period: '2025.10 – 2025.11',
    subtitle: 'Infrastructure and Deployment Automation for the Bucheon Tourism Stamp App',
    summary: 'A project that turned a six-step manual deployment into one flow through AWS infrastructure design and Jenkins + AWX automation',
    focus: 'ALB Blue/Green zero-downtime deployment. Deployment time from 30 minutes to under 10',
    techStack: ['AWS (VPC, ALB, NAT, EC2)', 'Jenkins', 'Docker', 'Ansible AWX', 'Spring Boot', 'MySQL', 'Redis'],
    overview:
      'A stamp app for promoting tourism in Bucheon. As team lead and dev lead I owned AWS infrastructure design and deployment automation, and the result won the grand prize at the campus major competency competition.',
    role: 'Team lead, PM, and dev lead; owned AWS infrastructure design and the Jenkins and AWX deployment pipeline',
    problem: [
      'The app servers had to stay off the public internet, but there was no boundary defining which of the app, Jenkins, and AWX servers to expose and which to hide.',
      'The problem with manual deployment was less its speed than the difficulty of reproducing the same steps every time. Image rollout to two app servers, environment variable injection, health checks, and traffic switching all depended on a person.',
    ],
    approach: [
      'Split two VPCs into public and private subnets, took inbound traffic only through the ALB, limited admin access to the bastion, and outbound traffic to the NAT gateway.',
      'Split Jenkins into master and agent, isolated builds in Docker-in-Docker, and handed deployment to Ansible AWX so per-server environment variables were managed centrally.',
      'Chained build, image creation, AWX template run, health check, and ALB target switch into one pipeline, with Discord notifications and rollback on failure.',
    ],
    outcomes: [
      'Reduced deployment time from 30 minutes to under 10',
      'Turned a six-step manual deployment into one automated flow',
      'Established ALB LeastConnection-based Blue/Green zero-downtime deployment',
      'Grand prize, campus major competency competition (2025.11)',
    ],
    learnings: [
      'Deployment automation starts not with build scripts but with deciding who runs what, where, and through which access path.',
      'Only when Blue/Green is tied to health checks does automation become an operable deployment procedure rather than a script run.',
    ],
    architectureNotes: [
      'Internet -> ALB -> App EC2 x2 (Private Subnet)',
      'Bastion -> private servers; NAT Gateway -> outbound only',
      'Jenkins Master -> Agent (DinD build) -> AWX template -> health check -> ALB target switch',
    ],
    troubleshooting: [
      {
        title: 'Jenkins Single-node Memory Exhaustion',
        problem: 'Running build and deployment on one Jenkins server caused repeated memory exhaustion that broke the pipeline.',
        analysis: 'Build containers and cache piled up on the controller node, and a single failure spread across the whole CI/CD flow.',
        action: 'Separated controller and agent, moved builds into isolated Docker-in-Docker, and handed deployment responsibility to AWX.',
        result: 'Controller memory stabilized, and the structural risk of a build failure blocking the entire release dropped.',
      },
    ],
  },
  {
    slug: 'catxi',
    title: 'CATXI',
    kind: 'University team project',
    period: '2025.05 – 2025.12',
    teamSize: '8 members (4 backend)',
    repoUrl: 'https://github.com/Team-Catxi/Catxi_BackEnd',
    subtitle: 'Authentication and Authorization Architecture for a Campus Ride-Sharing App',
    summary: 'A project that designed the authentication lifecycle with Kakao OAuth2, JWT, and Redis, and cut auth latency with in-filter token reissue',
    focus: 'Network round trips 3 to 1, auth latency 68ms to 3ms',
    techStack: ['Spring Boot 3.3', 'Java 17', 'Spring Security', 'OAuth2', 'JWT', 'Redis', 'MySQL 8.0', 'AWS'],
    overview:
      'A taxi ride-sharing app for Catholic University students. I owned the authentication and authorization layer on the backend, designing everything from Kakao login to token revocation, and improved auth performance after a first-come event launched.',
    role: 'Backend; designed and implemented the authentication and authorization layer (8 members, 4 backend)',
    problem: [
      'An expired AccessToken meant three round trips: 401, the reissue API, then the original request again, plus a RefreshToken lookup, which made the auth path slow.',
      'Just wiring up login could not carry the operating policies: reissue, logout, blocked users, and admin permissions.',
    ],
    approach: [
      'Unified user identification on email, kept the AccessToken in a header, and split the RefreshToken into an HttpOnly cookie and Redis (refresh:{email}).',
      'Caught ExpiredJwtException in JwtFilter, validated the RefreshToken with the email from the expired claims, returned new tokens in response headers, and rebuilt the SecurityContext for the same request.',
      'Added AccessToken blacklisting and RefreshToken deletion on logout, member status (ACTIVE/PENDING/INACTIVE) and user blacklist checks in the filter, and RefreshToken rotation.',
    ],
    outcomes: [
      'Reduced network round trips from 3 to 1',
      'Reduced authentication latency from 68ms to 3ms',
      'Lower frontend complexity, since the client no longer needs its own reissue logic',
    ],
    learnings: [
      'The auth performance gain came from moving where failure and recovery are owned, not from caching. Treating an expired token as a recoverable state rather than a failure was the key.',
      'Designing the token lifecycle and the user state model together from the start keeps maintenance cost down.',
    ],
    architectureNotes: [
      'Client -> JwtFilter -> (expired) email from claims -> Redis refresh:{email} validate -> rotate',
      'Authorization: Bearer {new} + X-Access-Token-Refreshed + Set-Cookie refresh; SecurityContext rebuilt in-chain',
      'Redis keys: refresh:{email}, blacklist:token:{accessToken}, blacklist:user:{userId}',
    ],
    troubleshooting: [
      {
        title: 'Handling Expired Tokens Inside the Filter Chain',
        problem: 'Expired tokens reached the controller, splitting the 401 response and token reissue into separate calls.',
        analysis: "Expiry was detected in the client's retry flow, not in the server filter.",
        action: 'Caught expiry inside JwtFilter, validated the RefreshToken, reissued both tokens, and returned them in the same response.',
        result: 'Authentication completed within a single request, and auth latency dropped from 68ms to about 3ms.',
      },
    ],
  },
]
