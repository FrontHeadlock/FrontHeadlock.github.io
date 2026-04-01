import { AnimatePresence, motion } from 'framer-motion'

type SkipButtonProps = {
  visible: boolean
  onClick: () => void
  label?: string
}

export function SkipButton({ visible, onClick, label = '[ ACCESS ]' }: SkipButtonProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          className="onboarding-skip"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClick}
        >
          {label}
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
