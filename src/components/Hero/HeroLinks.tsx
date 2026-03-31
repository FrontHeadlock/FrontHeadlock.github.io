import { FileText, Github, Link as LinkIcon, Mail, NotebookPen } from 'lucide-react'
import type { ProfileLink } from '../../types/profile'
import { IconLinkButton } from '../shared/IconLinkButton'

type HeroLinksProps = {
  links: ProfileLink[]
}

function resolveIcon(label: string) {
  if (label === 'GitHub') return <Github size={18} />
  if (label === 'Blog') return <NotebookPen size={18} />
  if (label === 'Email') return <Mail size={18} />
  if (label === 'LinkedIn') return <LinkIcon size={18} />
  return <FileText size={18} />
}

export function HeroLinks({ links }: HeroLinksProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <IconLinkButton
          key={link.label}
          href={link.href}
          icon={resolveIcon(link.label)}
          label={link.label}
          value={link.value}
          disabled={link.kind === 'disabled'}
        />
      ))}
    </div>
  )
}
