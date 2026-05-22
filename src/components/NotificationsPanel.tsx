interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ open, onClose }: NotificationsPanelProps) {
  if (!open) return null;

  return (
    <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-border bg-card p-4 shadow-2xl text-sm text-foreground">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold">Notifications</p>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition"
        >
          Close
        </button>
      </div>
      <div className="rounded-2xl bg-background/80 p-4 text-xs text-muted-foreground">
        You're all caught up. No new notifications yet.
      </div>
    </div>
  );
}

export default NotificationsPanel;
