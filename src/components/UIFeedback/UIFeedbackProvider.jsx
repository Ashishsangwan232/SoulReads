import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import './ui-feedback.css';

const UIFeedbackContext = createContext();

let idCounter = 0;

export const UIFeedbackProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null); // { message, resolve }
  const timeoutsRef = useRef({});

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timeoutsRef.current[id]);
    delete timeoutsRef.current[id];
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    timeoutsRef.current[id] = setTimeout(() => dismissToast(id), duration);
    return id;
  }, [dismissToast]);

  // Lets non-React / deeply-nested code trigger a toast without needing a
  // direct import of this context (e.g. window.dispatchEvent(new CustomEvent(
  // 'app:toast', { detail: { message, type } }))).
  React.useEffect(() => {
    const handler = (e) => showToast(e.detail?.message, e.detail?.type);
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, [showToast]);

  // Promise-based replacement for window.confirm(). Renders an accessible
  // modal instead of a blocking native dialog.
  const confirm = useCallback((message, { confirmLabel = 'Confirm', cancelLabel = 'Cancel' } = {}) => {
    return new Promise((resolve) => {
      setConfirmState({ message, confirmLabel, cancelLabel, resolve });
    });
  }, []);

  const handleConfirmResolve = (result) => {
    confirmState?.resolve(result);
    setConfirmState(null);
  };

  const value = useMemo(() => ({ showToast, confirm }), [showToast, confirm]);

  return (
    <UIFeedbackContext.Provider value={value}>
      {children}

      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.message}</span>
            <button
              type="button"
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(t.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {confirmState && (
        <div className="confirm-overlay" role="presentation" onClick={() => handleConfirmResolve(false)}>
          <div
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-label={confirmState.message}
            onClick={(e) => e.stopPropagation()}
          >
            <p>{confirmState.message}</p>
            <div className="confirm-actions">
              <button type="button" className="confirm-cancel" onClick={() => handleConfirmResolve(false)}>
                {confirmState.cancelLabel}
              </button>
              <button type="button" className="confirm-ok" onClick={() => handleConfirmResolve(true)} autoFocus>
                {confirmState.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </UIFeedbackContext.Provider>
  );
};

export const useUIFeedback = () => useContext(UIFeedbackContext);
