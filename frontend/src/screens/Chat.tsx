// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Label } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, User, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "simple chat bot-1";
const SCREEN = "Chat";
// Screen accent override: the brand accent reads as blue on this screen.
const ACCENT = "#1d4ed8";
const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

const SEED = [
  { id: "m-1", wf: "i-2-0-0", role: "user", time: "10:41", text: "What's a good way to start learning React 19?" },
  { id: "m-2", wf: "i-2-0-1", role: "assistant", time: "10:41", text: "Start with the official docs, then build a small app using the new Actions and use() hook." },
  { id: "m-3", wf: "i-2-0-2", role: "user", time: "10:43", text: "Which of those two should I try first?" },
  { id: "m-4", wf: "i-2-0-3", role: "assistant", time: "10:43", text: "Try Actions first — they replace most manual form state handling, so you'll feel the benefit on the first form you rewrite. Keep use() for later, when you need to read a promise during render." },
];

const REPLIES = [
  "Rewrite one form with an Action before anything else: move the submit handler into <form action={fn}>, then read the pending flag from useActionState instead of your own boolean. That usually deletes three or four lines of state per form.",
  "use() reads a promise or a context during render, so it only pays off once a <Suspense> boundary sits above it. Build the Actions version first, then swap one data read over and compare.",
  "A two-week shape that works: days 1–3 on the docs, days 4–7 on a small app with two real forms, then one day on Suspense boundaries. Keep the app small enough that you actually finish it.",
  "Short version: make the change small, ship it, then measure. Tell me which step you want expanded and I'll go deeper on that one.",
];

const RATE_LIMIT = 5;
const COOLDOWN_SECONDS = 20;

export default function Screen() {
  const accent = ACCENT;
  const rule = `2px solid ${brand.primaryColor}`;
  const hair = `1px solid ${mix(brand.primaryColor, 16)}`;
  const accentRule = `2px solid ${accent}`;

  const [messages, setMessages] = React.useState(SEED);
  const [draft, setDraft] = React.useState("");
  const [stream, setStream] = React.useState(null);
  const [failure, setFailure] = React.useState(null);
  const [requestCount, setRequestCount] = React.useState(2);
  const [cooldown, setCooldown] = React.useState(0);
  const [sent, setSent] = React.useState(0);
  const [failUsed, setFailUsed] = React.useState(false);
  const [replyIndex, setReplyIndex] = React.useState(0);

  const listRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const reduced = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  React.useEffect(() => {
    if (!stream) return undefined;
    if (stream.shown >= stream.text.length) {
      const done = setTimeout(() => {
        setMessages((prev) => [...prev, { id: stream.id, role: "assistant", time: stream.time, text: stream.text }]);
        setStream(null);
      }, 200);
      return () => clearTimeout(done);
    }
    const step = reduced ? stream.text.length : 3;
    const tick = setTimeout(() => {
      setStream((s) => (s ? { ...s, shown: Math.min(s.text.length, s.shown + step) } : s));
    }, reduced ? 40 : 26);
    return () => clearTimeout(tick);
  }, [stream, reduced]);

  React.useEffect(() => {
    if (cooldown <= 0) return undefined;
    const tick = setTimeout(() => {
      setCooldown((c) => {
        if (c <= 1) {
          setRequestCount(0);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearTimeout(tick);
  }, [cooldown]);

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, stream]);

  const clock = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  const send = (text, isRetry) => {
    const body = text.trim();
    if (!body || stream) return;

    if (!isRetry && requestCount >= RATE_LIMIT) {
      setRequestCount((c) => c + 1);
      setCooldown(COOLDOWN_SECONDS);
      return;
    }

    const nextSent = sent + 1;
    const shouldFail = !isRetry && !failUsed && nextSent === 2;
    setSent(nextSent);
    setRequestCount((c) => c + 1);

    if (shouldFail) {
      setFailUsed(true);
      setFailure({ text: body });
      setDraft(body);
      return;
    }

    setFailure(null);
    const stamp = clock();
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", time: stamp, text: body }]);
    setDraft("");
    setStream({ id: `a-${Date.now()}`, time: stamp, text: REPLIES[replyIndex % REPLIES.length], shown: reduced ? REPLIES[replyIndex % REPLIES.length].length : 0 });
    setReplyIndex((i) => i + 1);
  };

  const startNew = () => {
    setMessages([]);
    setStream(null);
    setFailure(null);
    setDraft("");
    setSent(0);
    setFailUsed(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const throttled = cooldown > 0;
  const busy = Boolean(stream);
  const visible = messages.length + (stream ? 1 : 0);
  const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <div className="bg-white" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{`
        @keyframes wfIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes wfCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .wf-in { animation: wfIn 160ms ease-out both; }
        .wf-caret { animation: wfCaret 900ms steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wf-in, .wf-caret { animation: none !important; }
        }
      `}</style>

      {/* Row 1 */}
      <div className="grid grid-cols-12 items-end gap-4 pb-4" style={{ borderBottom: rule }}>
        <div className="col-span-12 sm:col-span-8" data-wf="b-0-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: brand.neutralColor }}>{PRODUCT}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight" style={{ fontFamily: brand.fontHeading }}>{SCREEN}</h1>
        </div>
        <div className="col-span-12 flex flex-col items-stretch gap-2 sm:col-span-4 sm:items-end">
          <button
            type="button"
            data-wf="b-0-1"
            onClick={startNew}
            className={`inline-flex h-11 items-center justify-center gap-2 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white ${focusRing}`}
            style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius, outlineColor: accent }}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New conversation
          </button>
        </div>
      </div>

      {/* Row 2 */}
      <p data-wf="b-1-0" className="max-w-[68ch] py-4 text-[13px] leading-relaxed" style={{ color: brand.neutralColor }}>
        Free to use — no account or sign-up needed. This conversation is anonymous and kept only in your current browser session.
      </p>

      {/* Row 3 */}
      <section data-wf="b-2-0" aria-labelledby="conversation-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2">
          <h2 id="conversation-heading" className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: brand.fontHeading }}>Conversation</h2>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums" style={{ color: brand.neutralColor }}>
            {visible} {visible === 1 ? "message" : "messages"} · session only
          </p>
        </div>

        <div
          ref={listRef}
          tabIndex={0}
          role="log"
          aria-label="Conversation messages"
          aria-live="polite"
          className={`max-h-[46vh] min-h-[14rem] overflow-y-auto ${focusRing}`}
          style={{ borderTop: rule, borderBottom: rule, outlineColor: brand.primaryColor }}
        >
          {messages.length === 0 && !stream ? (
            <div className="px-3 py-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.14em]">Fresh conversation</p>
              <p className="mx-auto mt-2 max-w-[50ch] text-[13px] leading-relaxed" style={{ color: brand.neutralColor }}>
                Nothing sent yet. Ask anything in plain text — the assistant keeps the thread in mind until you clear it, and nothing is stored outside this browser session.
              </p>
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: mix(brand.primaryColor, 16) }}>
              {messages.map((m) => (
                <li
                  key={m.id}
                  data-wf={m.wf}
                  className="wf-in grid grid-cols-12 gap-x-3 gap-y-1 px-3 py-3"
                  style={{ borderBottom: hair, backgroundColor: m.role === "user" ? mix(brand.primaryColor, 4) : undefined }}
                >
                  <p className="col-span-12 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] sm:col-span-3" style={{ color: brand.neutralColor }}>
                    {m.role === "user" ? <User className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    <span style={{ color: brand.primaryColor }}>{m.role === "user" ? "You" : "Assistant"}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{m.time}</span>
                  </p>
                  <p className="col-span-12 max-w-[72ch] text-[13px] leading-relaxed sm:col-span-9">{m.text}</p>
                </li>
              ))}
              {stream ? (
                <li className="wf-in grid grid-cols-12 gap-x-3 gap-y-1 px-3 py-3" style={{ borderBottom: hair }}>
                  <p className="col-span-12 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] sm:col-span-3" style={{ color: brand.neutralColor }}>
                    <span style={{ color: brand.primaryColor }}>Assistant</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{stream.time}</span>
                  </p>
                  <p className="col-span-12 max-w-[72ch] text-[13px] leading-relaxed sm:col-span-9">
                    {stream.text.slice(0, stream.shown)}
                    <span className="wf-caret ml-0.5 inline-block h-[1em] w-[0.5ch] align-[-0.1em]" style={{ backgroundColor: brand.primaryColor }} aria-hidden="true" />
                  </p>
                </li>
              ) : null}
            </ul>
          )}
        </div>
      </section>

      {/* Row 4 */}
      <p
        data-wf="b-3-0"
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 py-3 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: busy ? brand.primaryColor : brand.neutralColor }}
      >
        {busy ? (
          <>
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Assistant is replying…
          </>
        ) : (
          <>
            <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Ready — last <span className="tabular-nums">{messages.length}</span> messages sent as context
          </>
        )}
      </p>

      {/* Row 5 */}
      {failure ? (
        <div
          data-wf="b-4-0"
          role="alert"
          className="wf-in mb-3 px-3 py-3"
          style={{ border: rule, borderLeft: accentRule, borderRadius: brand.radius }}
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: accent }} />
            <div className="min-w-0">
              <p className="text-[13px] font-bold">Couldn't reach the assistant. Please try sending your message again.</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: brand.neutralColor }}>
                POST /api/chat · error_code upstream_unavailable
              </p>
              <p className="mt-1 max-w-[60ch] text-[12px] leading-relaxed" style={{ color: brand.neutralColor }}>
                Your message is still in the box below — nothing was lost, and the rest of the conversation is untouched.
              </p>
              <button
                type="button"
                onClick={() => send(failure.text, true)}
                className={`mt-2 h-9 px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white ${focusRing}`}
                style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius, outlineColor: accent }}
              >
                Send again
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Row 6 */}
      {throttled ? (
        <div
          data-wf="b-5-0"
          role="alert"
          className="wf-in mb-3 px-3 py-3"
          style={{ border: rule, borderLeft: accentRule, borderRadius: brand.radius }}
        >
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: accent }} />
            <div>
              <p className="text-[13px] font-bold">You're sending messages too quickly. Please wait a moment and try again.</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] tabular-nums" style={{ color: brand.neutralColor }}>
                Throttled · {requestCount} requests this window · limit {RATE_LIMIT} per minute · sending re-opens in {cooldown}s
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Row 7 */}
      <div className="grid grid-cols-12 gap-3 pb-1">
        <form
          id="chat-composer"
          data-wf="b-6-0"
          aria-labelledby="composer-heading"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft, false);
          }}
          className="col-span-12 md:col-span-10"
        >
          <h2 id="composer-heading" className="sr-only">Send a message</h2>
          <Label htmlFor="chat-message" className="block text-[11px] font-bold uppercase tracking-[0.18em]">Message</Label>
          <textarea
            id="chat-message"
            data-wf="i-6-0-0"
            ref={inputRef}
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft, false);
              }
            }}
            disabled={throttled}
            aria-describedby="composer-hint"
            placeholder="Ask about anything — follow-ups included"
            className={`mt-1 w-full resize-none bg-white px-3 py-2 text-[13px] leading-relaxed outline-none disabled:opacity-50 ${focusRing}`}
            style={{ border: rule, borderRadius: brand.radius, outlineColor: accent }}
          />
          <p id="composer-hint" className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: brand.neutralColor }}>
            Enter sends · Shift + Enter adds a line · plain text only
          </p>
        </form>
        <div className="col-span-12 md:col-span-2 md:pt-[1.55rem]">
          <button
            type="submit"
            form="chat-composer"
            data-wf="b-6-1"
            disabled={busy || throttled || draft.trim().length === 0}
            className={`inline-flex h-11 w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition-opacity disabled:opacity-30 ${focusRing}`}
            style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius, outlineColor: accent }}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            {busy ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
