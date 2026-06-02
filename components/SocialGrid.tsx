import { profile } from '@/config/profile'
import { LinkedInIcon, WhatsAppIcon } from '@/components/BrandIcons'

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon, color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]/10' },
  { label: 'WhatsApp', href: profile.whatsapp, Icon: WhatsAppIcon, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10' },
]

export function SocialGrid() {
  return (
    <div className="mt-6 px-6">
      <div className="grid grid-cols-2 gap-3">
        {socials.map(({ label, href, Icon, color, bg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 rounded-2xl ${bg} p-4 transition-transform active:scale-95`}
          >
            <span className={color}>
              <Icon size={20} />
            </span>
            <span className="text-sm font-semibold text-primary">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
