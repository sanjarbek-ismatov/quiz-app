/**
 * Icon mapper for subject icons
 * Converts icon names to react-icons components
 */

import { FiBookOpen, FiZap, FiAward, FiGlobe, FiTarget, FiInfo } from 'react-icons/fi'
import { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  book: FiBookOpen,
  zap: FiZap,
  award: FiAward,
  globe: FiGlobe,
  brain: FiInfo,
  target: FiTarget,
}

export function getIconComponent(iconName: string): IconType {
  return iconMap[iconName] || FiBookOpen
}
