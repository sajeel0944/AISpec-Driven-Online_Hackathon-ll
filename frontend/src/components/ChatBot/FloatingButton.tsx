import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function FloatingButton({
  isOpen,
  onToggle,
  hasNewMessage,
}: {
  isOpen: boolean;
  onToggle: () => void;
  hasNewMessage: boolean;
}) {
  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center group cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, #061f4b 0%, #0a2a63 50%, #144d88 100%)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 0.8 : 1,
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <Sparkles className="w-6 h-6 text-white" />
              {hasNewMessage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#061f4b]"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Notification Badge */}
      {!isOpen && hasNewMessage && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-20 right-5 z-40 px-2 py-1 bg-red-500 text-white text-xs rounded-full"
        >
          New
        </motion.div>
      )}
    </>
  );
}