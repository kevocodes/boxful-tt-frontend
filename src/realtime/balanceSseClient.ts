import { fetchEventSource } from "@microsoft/fetch-event-source";

type Listener = () => void;

class BalanceSseClient {
  private ctrl: AbortController | null = null;
  private refCount = 0;
  private listeners = new Set<Listener>();
  private token: string | null = null;

  subscribe(token: string, onBalanceUpdated: Listener) {
    this.listeners.add(onBalanceUpdated);
    this.refCount++;

    // If there is already an active connection with the same token, do nothing
    if (this.ctrl && this.token === token) {
      return () => this.unsubscribe(onBalanceUpdated);
    }

    // If there is an active connection but the token has changed, restart
    if (this.ctrl && this.token !== token) {
      this.close();
    }

    this.token = token;
    this.open(token);

    return () => this.unsubscribe(onBalanceUpdated);
  }

  private unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
    this.refCount = Math.max(0, this.refCount - 1);

    if (this.refCount === 0) {
      this.close();
    }
  }

  private open(token: string) {
    this.ctrl = new AbortController();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/shipments/me/balance/stream`;

    fetchEventSource(url, {
      method: "GET",
      signal: this.ctrl.signal,
      headers: { Authorization: `Bearer ${token}` },

      onopen: async (res) => {
        if (!res.ok) throw new Error(`SSE failed: ${res.status}`);
      },

      onmessage: (msg) => {
        if (msg.event === "balance_updated") {
          // Notify all subscribers
          for (const l of this.listeners) l();
        }
      },

      onerror: (err) => {
        // fetch-event-source retries
        console.error("Balance SSE error:", err);
      },
    });
  }

  private close() {
    this.ctrl?.abort();
    this.ctrl = null;
    this.token = null;
  }
}

export const balanceSseClient = new BalanceSseClient();
