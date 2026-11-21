type CountdownStore = {
  getSnapshot: () => number;
  subscribe: (listener: () => void) => () => void;
};

export function createCountdownStore(initialSeconds: number): CountdownStore {
  let startedAt: number | null = null;
  let timer: ReturnType<typeof window.setInterval> | undefined;
  const listeners = new Set<() => void>();

  function getSnapshot() {
    if (startedAt === null) {
      return initialSeconds;
    }

    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    return Math.max(0, initialSeconds - elapsedSeconds);
  }

  function stopTimer() {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  }

  function notify() {
    const secondsRemaining = getSnapshot();
    listeners.forEach((listener) => listener());

    if (secondsRemaining === 0) {
      stopTimer();
    }
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);

    if (startedAt === null) {
      startedAt = Date.now();
    }

    if (timer === undefined && getSnapshot() > 0) {
      timer = window.setInterval(notify, 1000);
    }

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        stopTimer();
      }
    };
  }

  return { getSnapshot, subscribe };
}

export function formatCountdown(seconds: number) {
  return `00:${String(seconds).padStart(2, "0")}`;
}
