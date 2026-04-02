import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'geulda',
    title: 'Geulda',
    subtitle: 'Bucheon Tourism Stamp Application',
    summary: 'A project that reduced operations time through AWS infrastructure design and Jenkins + AWX deployment automation',
    focus: 'Automated six manual deployment steps and standardized multi-server release procedures',
    techStack: ['AWS', 'Jenkins', 'AWX', 'Docker', 'Nginx', 'Redis', 'Prometheus', 'Grafana'],
    overview:
      'A stamp-based tourism promotion app for Bucheon. I led planning and backend delivery while building the infrastructure foundation and deployment automation pipeline.',
    role: 'Overall team lead, planner, backend lead, and owner of infrastructure and deployment automation',
    problem: [
      'Manual and fragmented deployment steps caused release inconsistency across servers and increased operational overhead.',
      'In a Public/Private Subnet setup, access paths and deployment ownership were not clearly defined.',
    ],
    approach: [
      'Designed a Public/Private Subnet architecture using Bastion Host, NAT Gateway, and ALB.',
      'Combined Jenkins and AWX to standardize multi-server deployment and environment variable handling.',
      'Integrated Prometheus and Grafana observability to reduce post-deployment verification time.',
    ],
    outcomes: [
      'Reduced deployment time from 30 minutes to under 10 minutes',
      'Automated a six-step manual deployment process',
      'Standardized multi-server deployment procedure',
    ],
    learnings: [
      'Stable deployment automation starts with clear execution ownership and access paths, not only build scripts.',
      'Automation creates real operational gains only when observability is built into the same workflow.',
    ],
    architectureNotes: [
      'Internet -> ALB -> Nginx / App',
      'Private Subnet deployment path controlled through Bastion Host and NAT Gateway',
      'Jenkins -> AWX -> Multi Server Deploy',
    ],
    troubleshooting: [
      {
        title: 'Jenkins DinD Memory Pressure Mitigation',
        problem: 'Running build and deployment on a single Jenkins node caused memory exhaustion and pipeline interruptions.',
        analysis:
          'Build containers and cache accumulated on the controller node, overloading it and propagating failures across CI/CD.',
        action:
          'Separated Jenkins Controller and Agent responsibilities, moved agents to isolated Docker-in-Docker execution, and delegated deployment responsibility to AWX.',
        result:
          'Controller memory stabilized, and the structural risk of build failures stopping the full release flow was significantly reduced.',
      },
    ],
  },
  {
    slug: 'oldyoung',
    title: 'OldYoung',
    subtitle: 'Income-Decile Welfare Recommendation Application',
    summary: 'A project covering welfare recommendation flow, deployment setup, and AI chatbot integration',
    focus: 'Designed a flow that lets users quickly discover welfare information from simple inputs',
    techStack: ['Spring Boot 3.5', 'Java 17', 'OpenAI-bom:1.0', 'Redis', 'AWS'],
    overview:
      'A RAG-based app that recommends elderly welfare benefits by income decile. I handled PM, design, backend development, deployment setup, and AI chatbot implementation.',
    role: 'PM, design, backend engineering, deployment setup, and AI chatbot development',
    problem: [
      'Users needed a simple input-first entry flow because direct welfare exploration was difficult.',
      'If recommendation and lookup flows diverged, chatbot responses and benefit exploration could become disconnected.',
    ],
    approach: [
      'Designed a simple path: user input -> income decile calculation -> relevant benefit results.',
      'Unified chatbot response and benefit lookup on the same input-driven information structure.',
      'Built deployment environment in parallel to reduce validation and demo preparation time.',
    ],
    outcomes: [
      'Implemented recommendation flow connecting user input to income decile and matching benefits',
      'Delivered elderly welfare facility lookup and chatbot response within one unified user flow',
    ],
    learnings: [
      'In recommendation products, a clear input experience often matters more than model sophistication.',
      'Aligning planning, design, backend, and deployment together accelerates both user flow quality and operational readiness.',
    ],
    troubleshooting: [
      {
        title: 'Preventing Split Between Recommendation and Lookup Flows',
        problem: 'When welfare recommendation and detailed lookup appeared as separate flows, users struggled to connect outcomes.',
        analysis:
          'When input data was interpreted differently across stages, recommendation rationale and lookup results appeared in mismatched contexts.',
        action:
          'Aligned the information model so income-decile calculation, benefit lookup, and chatbot response all shared the same input-driven flow.',
        result:
          'Built a consistent end-to-end user context from input to final result interpretation.',
      },
    ],
  },
  {
    slug: 'kubernetes-parking',
    title: 'Kubernetes',
    subtitle: 'Parking Management Service',
    summary: 'Improved service architecture for real operations by addressing both latency and failure isolation',
    focus: 'Reduced latency by about 30% while preserving consistency and failure boundaries',
    techStack: ['Django', 'Kubernetes', 'Saga Pattern', 'Circuit Breaker'],
    overview:
      'In a Kubernetes-based parking service, I redesigned inter-service structure to preserve consistency and isolate failures in a production-ready form.',
    role: 'Service architecture improvement and operational stability',
    problem: [
      'Inter-service latency and cascading failure risks were harming operational stability.',
      'The architecture needed to satisfy both consistency requirements and fault isolation.',
    ],
    approach: [
      'Combined Saga Pattern and Circuit Breaker to separate service responsibility and failure boundaries.',
      'Reorganized deployment and service connection patterns for reliable Kubernetes operations.',
    ],
    outcomes: ['Reduced inter-service latency by about 30% compared to previous structure', 'Established an operationally stable service architecture'],
    learnings: [
      'Latency improvements are stronger when consistency and failure boundaries are designed first.',
      'Operational quality is revealed more clearly in failure scenarios than in happy-path flows.',
    ],
    troubleshooting: [
      {
        title: 'Separating Latency Zones from Failure Propagation',
        problem: 'Latency in one service spread into others and degraded overall response quality.',
        analysis:
          'Because call failures were not contained at service boundaries, wait times accumulated and consistency handling became more complex.',
        action:
          'Defined stricter failure boundaries and compensation flow design to localize high-latency zones.',
        result: 'Reduced inter-service latency by about 30% while maintaining operational stability.',
      },
    ],
  },
  {
    slug: 'catxi',
    title: 'CATXI',
    subtitle: 'JWT Authentication Architecture Improvement',
    summary: 'Reduced network round trips and auth latency through in-filter token reissue',
    focus: 'Network round trips 3 -> 1, auth latency 68ms -> 3ms',
    techStack: ['Spring Security', 'JWT', 'Redis', 'OAuth2', 'AWS'],
    overview:
      'Improved authentication architecture for a university ride-sharing application by redesigning expired-token handling and reissue flow at filter-chain level.',
    role: 'Backend lead, authentication and authorization architecture',
    problem: [
      'Expired AccessToken requests were reaching DispatcherServlet, increasing auth failure handling cost.',
      'A separate reissue API introduced unnecessary network round trips and authentication latency.',
    ],
    approach: [
      'Handled ExpiredJwtException directly inside JwtFilter so re-authentication runs before controller entry.',
      'Validated RefreshToken in Redis and returned newly issued tokens in response headers when valid.',
      'Reconstructed SecurityContext within filter chain so API flow continues without disruption.',
    ],
    outcomes: ['Reduced network round trips from 3 to 1', 'Reduced authentication latency from 68ms to 3ms'],
    learnings: [
      'For auth optimization, exception handling location often matters more than token storage selection.',
      'Completing token reissue within the same request path improves both performance and client simplicity.',
    ],
    troubleshooting: [
      {
        title: 'Handling Expired Tokens Inside Filter Chain',
        problem: 'Expired tokens reached controller level, splitting 401 response and token reissue into separate calls.',
        analysis:
          'Because reissue depended on a separate API, it caused three round trips, higher auth latency, and a more complex request flow.',
        action:
          'Detected expired tokens inside JwtFilterChain, validated RefreshToken, regenerated AccessToken/RefreshToken, and applied them to the same response immediately.',
        result: 'Authentication completed within a single request and auth latency dropped from 68ms to around 3ms.',
      },
    ],
  },
]
