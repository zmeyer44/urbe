'use client';

import useWindowSize from '@repo/design-system/hooks/use-window-size';
import { AnimatePresence, motion } from 'framer-motion';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Leaflet from './leaflet';
export { useModal } from './provider';

export default function Modal({
  children,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const desktopModalRef = useRef(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const { isMobile, isDesktop } = useWindowSize();

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && <Leaflet setShow={setShowModal}>{children}</Leaflet>}
          {isDesktop && (
            <>
              <motion.div
                ref={desktopModalRef}
                key="desktop-modal"
                className="fixed inset-0 isolate z-modal hidden min-h-screen items-center justify-center md:flex"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onMouseDown={(e) => {
                  if (desktopModalRef.current === e.target) {
                    setShowModal(false);
                  }
                }}
              >
                {children}
              </motion.div>
              {/* <FocusTrap
                focusTrapOptions={{
                  initialFocus: false,
                  allowOutsideClick: true,
                }}
              >
                <motion.div
                  ref={desktopModalRef}
                  key="desktop-modal"
                  className="z-modal fixed inset-0 isolate hidden min-h-screen items-center justify-center md:flex"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  onMouseDown={(e) => {
                    if (desktopModalRef.current === e.target) {
                      setShowModal(false);
                    }
                  }}
                >
                  {children}
                </motion.div>
              </FocusTrap> */}
              <motion.div
                key="desktop-backdrop"
                className="fixed inset-0 z-overlay bg-gray-100 bg-opacity-10 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
