import type { Profile } from './types'

export const profileEn: Profile = {
  name: 'KyuminPark',
  role: 'DevOps Engineer',
  affiliation: 'Telechips · Automotive SoC Development Infrastructure',
  heroSummary:
    'I am a DevOps engineer running the development infrastructure for automotive SoC teams, automating recurring operations and making resource state visible through metrics.',
  aboutSummary: [
    'I run development infrastructure for automotive SoC teams at Telechips: KVM bare-metal, an OpenStack private cloud, and ONTAP storage for researchers, with accounts, permissions, and SDK access managed through OpenLDAP and Gerrit.',
    'Recurring work gets moved into code: configuration deployment to about 80 servers now runs through four-stage Ansible playbooks, and repetitive ITSM requests go through an AI agent gated by approval and dry-run.',
    'I read the tools I use down to the code and contribute when something needs fixing: merged PRs in the official Jenkins Docker image and oh-my-claudecode, and a merged Gerrit change in the OpenStack client.',
  ],
  strengths: [
    'Resource visibility: built layered ONTAP capacity metrics and improved volume utilization by about 15% where expansion was blocked',
    'Change design that assumes failure, such as an Ansible pipeline split into pre-check, staging, deploy, and rollback',
    'Automation guardrails that separate AI judgment from deterministic execution and require human approval',
    'Open-source collaboration carried from issue report through review to merge (jenkinsci/docker, oh-my-claudecode)',
  ],
  metrics: [
    {
      label: 'Repetitive Ops',
      value: '3h -> 30m',
      detail: 'Automated repetitive ITSM requests with an approval- and dry-run-gated AI agent, cutting average daily handling time',
    },
    {
      label: 'Volume Utilization',
      value: '15%',
      detail: 'Collected layered ONTAP capacity metrics and reclaimed idle thick volumes, improving utilization without expansion',
    },
    {
      label: 'Deployment Time',
      value: '30m -> 10m',
      detail: 'Automated a six-step manual deployment with Jenkins, AWX, and ALB Blue/Green',
    },
    {
      label: 'Auth Latency',
      value: '68ms -> 3ms',
      detail: 'Reissued tokens inside the filter chain, reducing three network round trips to one',
    },
  ],
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/FrontHeadlock',
      value: '@FrontHeadlock',
      kind: 'link',
    },
    {
      label: 'Blog',
      href: 'https://frontheadlock.tistory.com/',
      value: 'frontheadlock.tistory.com',
      kind: 'link',
    },
    {
      label: 'Email',
      href: 'mailto:southvi1@naver.com',
      value: 'southvi1@naver.com',
      kind: 'email',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/kyumin19/?skipRedirect=true',
      value: 'linkedin.com/in/kyumin19',
      kind: 'link',
    },
  ],
  deliveryMeta: ['React SPA', 'Static delivery ready', 'Deployment path configurable'],
}
