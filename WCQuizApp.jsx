import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Question Bank ────────────────────────────────────────────────────────────
const ALL_QUESTIONS = {
  "WC 2026": [
    { q: "Which countries are co-hosting FIFA World Cup 2026?", opts: ["USA only", "USA, Canada & Mexico", "USA & Canada", "USA & Brazil"], ans: 1 },
    { q: "How many teams are competing in FIFA World Cup 2026?", opts: ["32", "36", "48", "64"], ans: 2 },
    { q: "Which city hosted the FIFA World Cup 2026 opening match?", opts: ["Los Angeles", "New York", "Mexico City", "Toronto"], ans: 2 },
    { q: "When did FIFA World Cup 2026 kick off?", opts: ["June 1", "June 8", "June 11", "June 15"], ans: 2 },
    { q: "Where is the FIFA World Cup 2026 final being held?", opts: ["Rose Bowl, LA", "MetLife Stadium, New York", "Azteca, Mexico City", "SoFi Stadium, LA"], ans: 1 },
    { q: "How many matches will be played in total in WC 2026?", opts: ["64", "80", "96", "104"], ans: 3 },
    { q: "Which country won the most recent World Cup (2022)?", opts: ["France", "Brazil", "Argentina", "Germany"], ans: 2 },
    { q: "Who won the Golden Boot at the 2022 World Cup?", opts: ["Lionel Messi", "Kylian Mbappé", "Giroud", "Ronaldo"], ans: 1 },
    { q: "How many stadiums are used across all three WC 2026 host nations?", opts: ["10", "12", "16", "20"], ans: 2 },
    { q: "Which African nation made the semifinals at the 2022 World Cup?", opts: ["Senegal", "Ghana", "Nigeria", "Morocco"], ans: 3 },
  ],
  "History": [
    { q: "Which country has won the most FIFA World Cups?", opts: ["Germany", "Argentina", "Italy", "Brazil"], ans: 3 },
    { q: "Who is the all-time top scorer in World Cup history with 16 goals?", opts: ["Pelé", "Ronaldo (Brazil)", "Miroslav Klose", "Just Fontaine"], ans: 2 },
    { q: "In which year was the first FIFA World Cup held?", opts: ["1924", "1928", "1930", "1934"], ans: 2 },
    { q: "Which country won the inaugural FIFA World Cup in 1930?", opts: ["Brazil", "Argentina", "Uruguay", "Italy"], ans: 2 },
    { q: "Where was the 2018 FIFA World Cup held?", opts: ["Brazil", "Germany", "France", "Russia"], ans: 3 },
    { q: "Who won the 2018 FIFA World Cup?", opts: ["Croatia", "France", "Belgium", "England"], ans: 1 },
    { q: "How many times has Italy won the World Cup?", opts: ["2", "3", "4", "5"], ans: 2 },
    { q: "Who scored the famous 'Hand of God' goal in 1986?", opts: ["Pelé", "Diego Maradona", "Ronaldo", "Zidane"], ans: 1 },
    { q: "Which team has NEVER missed a single FIFA World Cup?", opts: ["Germany", "Argentina", "Italy", "Brazil"], ans: 3 },
    { q: "Which nation hosted the 2014 World Cup?", opts: ["Argentina", "Brazil", "Colombia", "Chile"], ans: 1 },
  ],
  "Teams & Players": [
    { q: "Which team is nicknamed 'The Samba Boys'?", opts: ["Argentina", "Portugal", "Brazil", "Colombia"], ans: 2 },
    { q: "Who won the Golden Ball (best player) at the 2022 World Cup?", opts: ["Kylian Mbappé", "Luka Modrić", "Lionel Messi", "Neymar"], ans: 2 },
    { q: "Who scored a hat-trick in the 2022 World Cup final?", opts: ["Lionel Messi", "Kylian Mbappé", "Giroud", "Griezmann"], ans: 1 },
    { q: "Which country does Cristiano Ronaldo represent?", opts: ["Spain", "Brazil", "Portugal", "France"], ans: 2 },
    { q: "How many times has Germany won the World Cup?", opts: ["3", "4", "5", "6"], ans: 1 },
    { q: "Which team won the 2010 World Cup in South Africa?", opts: ["Brazil", "Netherlands", "Germany", "Spain"], ans: 3 },
    { q: "What shirt number does Lionel Messi famously wear?", opts: ["7", "9", "10", "11"], ans: 2 },
    { q: "Which country does Kylian Mbappé represent?", opts: ["Belgium", "Ivory Coast", "Senegal", "France"], ans: 3 },
    { q: "Which club is Lionel Messi associated with as of 2026?", opts: ["Barcelona", "PSG", "Inter Miami", "Al-Hilal"], ans: 2 },
    { q: "Which team knocked Brazil out of the 2022 World Cup quarterfinals?", opts: ["Argentina", "Croatia", "France", "Netherlands"], ans: 1 },
  ],
  "Rules & Records": [
    { q: "How many players does each team field in a standard football match?", opts: ["9", "10", "11", "12"], ans: 2 },
    { q: "What color card results in immediate dismissal from the match?", opts: ["Yellow", "Orange", "Red", "Black"], ans: 2 },
    { q: "How long is extra time in a World Cup knockout match?", opts: ["2×10 mins", "2×15 mins", "1×30 mins", "2×20 mins"], ans: 1 },
    { q: "What does VAR stand for?", opts: ["Video Action Review", "Virtual Assistant Referee", "Video Assistant Referee", "Visual Analysis Review"], ans: 2 },
    { q: "How many substitutions can a team make in WC 2026?", opts: ["3", "4", "5", "6"], ans: 2 },
    { q: "What is the distance of the penalty spot from the goal line?", opts: ["10 yards", "11 yards", "12 yards", "13 yards"], ans: 2 },
    { q: "What is the minimum circumference of a match football?", opts: ["64 cm", "66 cm", "68 cm", "70 cm"], ans: 2 },
    { q: "Most goals scored in a single WC tournament by one player?", opts: ["13 (Fontaine, 1958)", "10 (Müller, 1970)", "9 (Ronaldo, 2002)", "8 (Mbappé, 2022)"], ans: 0 },
    { q: "How many yellow cards does a player need to be suspended for one match at WC?", opts: ["1", "2", "3", "4"], ans: 1 },
    { q: "In a penalty shootout, how many kicks does each team start with?", opts: ["3", "4", "5", "6"], ans: 2 },
  ],
};

const CATEGORIES = Object.keys(ALL_QUESTIONS);
const CAT_ICONS = { "WC 2026": "🏆", "History": "📜", "Teams & Players": "⚽", "Rules & Records": "📋" };
const CAT_DESC = {
  "WC 2026": "Current tournament facts",
  "History": "Classic World Cup moments",
  "Teams & Players": "Stars & nations",
  "Rules & Records": "Laws of the game",
};

const TIMER_MAX = 15;
const GOLD = "#F5C518";
const GREEN_DARK = "#0A3D2B";
const CARD_BG = "rgba(255,255,255,0.07)";
const CARD_BORDER = "rgba(245,197,24,0.2)";
const ADSENSE_CLIENT = "ca-pub-5972873196464435";
const AD_SLOTS = {
  leaderboard: "5709897332", // WC Quiz Leaderboard
  small: "5122403115", // small_placement
};
const GUIDE_LINKS = [
  { href: "/wc-2026-format.html", label: "WC 2026 Format Explained" },
  { href: "/host-cities-guide.html", label: "Host Cities and Stadium Guide" },
  { href: "/teams-to-watch-2026.html", label: "Top Teams to Watch in 2026" },
  { href: "/first-time-fan-guide.html", label: "First-Time Fan Survival Guide" },
  { href: "/about.html", label: "About This Portal" },
  { href: "/faq.html", label: "FAQ and Editorial Policy" },
];
const SUPPORT_LINK = "https://buy.stripe.com/test_support_link"; // Replace with Razorpay/Stripe/BuyMeACoffee
const AFFILIATE_LINK = "https://www.amazon.in/s?k=world+cup+jersey&tag=yourtag-21"; // Replace with your affiliate URL

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ─── Ad Banner ───────────────────────────────────────────────────────────────
function AdBanner({ size = "leaderboard" }) {
  const isLarge = size === "leaderboard";
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;
    if (!window.adsbygoogle || !ADSENSE_CLIENT) return;
    try {
      window.adsbygoogle.push({});
    } catch {}
  }, [size]);

  if (!ADSENSE_CLIENT) {
    return (
      <div style={{
        width: "100%", background: "rgba(255,255,255,0.04)",
        borderRadius: 8, padding: isLarge ? "12px" : "8px",
        textAlign: "center", fontSize: 11, color: "#666",
        border: "1px dashed #333", marginBottom: isLarge ? 20 : 0,
        marginTop: isLarge ? 0 : 16,
      }}>
        Enable AdSense client ID to show live ads.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", marginBottom: isLarge ? 20 : 0, marginTop: isLarge ? 0 : 16 }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: isLarge ? 90 : 50 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={isLarge ? AD_SLOTS.leaderboard : AD_SLOTS.small}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

function RevenueBlock() {
  return (
    <div style={{
      marginTop: 14,
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 12,
      padding: 12,
    }}>
      <div style={{ fontSize: 12, color: "#bbb", marginBottom: 10 }}>More ways to support this portal</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <a href={AFFILIATE_LINK} target="_blank" rel="noreferrer" style={{
          textDecoration: "none", textAlign: "center", padding: "10px 8px",
          borderRadius: 10, border: "1px solid rgba(245,197,24,0.3)", color: GOLD, fontSize: 12, fontWeight: 700,
        }}>
          Shop Football Deals
        </a>
        <a href={SUPPORT_LINK} target="_blank" rel="noreferrer" style={{
          textDecoration: "none", textAlign: "center", padding: "10px 8px",
          borderRadius: 10, border: "1px solid rgba(34,197,94,0.35)", color: "#86efac", fontSize: 12, fontWeight: 700,
        }}>
          Support This Quiz
        </a>
      </div>
    </div>
  );
}

function loadSavedHighScores() {
  try {
    const localRaw = window.localStorage?.getItem("wc_highscores");
    if (localRaw) return JSON.parse(localRaw);
  } catch {}

  return null;
}

async function loadHighScoresFromAnySource() {
  const local = loadSavedHighScores();
  if (local) return local;
  try {
    const res = await window.storage?.get("wc_highscores");
    if (res?.value) return JSON.parse(res.value);
  } catch {}
  return {};
}

function persistHighScores(updated) {
  try {
    window.localStorage?.setItem("wc_highscores", JSON.stringify(updated));
  } catch {}

  window.storage?.set?.("wc_highscores", JSON.stringify(updated)).catch?.(() => {});
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function WCQuizApp() {
  const [screen, setScreen] = useState("home"); // home | category | quiz | result
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_MAX);
  const [answers, setAnswers] = useState([]);
  const [highScores, setHighScores] = useState({});
  const timerRef = useRef(null);

  // Load high scores for web deploy + optional storage adapter
  useEffect(() => {
    (async () => {
      const saved = await loadHighScoresFromAnySource();
      if (saved) setHighScores(saved);
    })();
  }, []);

  const startQuiz = (cat) => {
    setCategory(cat);
    setQuestions(shuffle(ALL_QUESTIONS[cat]));
    setQIndex(0); setSelected(null); setScore(0);
    setAnswers([]); setTimeLeft(TIMER_MAX);
    setScreen("quiz");
  };

  const goToResult = useCallback((finalScore, finalAnswers, cat) => {
    setScreen("result");
    setHighScores(prev => {
      const updated = { ...prev, [cat]: Math.max(finalScore, prev[cat] || 0) };
      persistHighScores(updated);
      return updated;
    });
  }, []);

  useEffect(() => {
    const catParam = new URLSearchParams(window.location.search).get("cat");
    if (catParam && ALL_QUESTIONS[catParam]) {
      startQuiz(catParam);
    }
  }, []);

  const handleAnswer = useCallback((idx, currentScore, currentAnswers) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    const correct = idx === questions[qIndex].ans;
    const pts = correct ? Math.max(10, timeLeft * 10) : 0;
    const newScore = currentScore + pts;
    const newAnswers = [...currentAnswers, { correct, q: questions[qIndex].q, ans: questions[qIndex].opts[questions[qIndex].ans] }];
    setScore(newScore);
    setAnswers(newAnswers);

    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        goToResult(newScore, newAnswers, category);
      } else {
        setQIndex(i => i + 1);
        setSelected(null);
        setTimeLeft(TIMER_MAX);
      }
    }, 1300);
  }, [selected, questions, qIndex, timeLeft, category, goToResult]);

  // Timer
  useEffect(() => {
    if (screen !== "quiz" || selected !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(-1, score, answers);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, qIndex, selected]);

  const correct = answers.filter(a => a.correct).length;
  const grade = correct >= 9 ? "World Class! 🌟" : correct >= 7 ? "Pro Level 🏅" : correct >= 5 ? "Amateur ⚽" : "Keep Practicing 📚";
  const pct = Math.round((correct / Math.max(questions.length, 1)) * 100);
  const timerColor = timeLeft > 8 ? "#22c55e" : timeLeft > 4 ? "#f59e0b" : "#ef4444";
  const timerPct = (timeLeft / TIMER_MAX) * 100;

  const shareScore = useCallback(async () => {
    const safeCategory = category || "WC 2026";
    const shareUrl = `${window.location.origin}${window.location.pathname}?cat=${encodeURIComponent(safeCategory)}`;
    const text = `I scored ${score} points (${pct}% accuracy) in WC 2026 Quiz - ${safeCategory}. Can you beat me?`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "WC 2026 Quiz", text, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      alert("Share link copied to clipboard.");
    } catch {
      alert("Could not share automatically. You can copy this URL: " + shareUrl);
    }
  }, [category, score, pct]);

  const wrapStyle = {
    background: `linear-gradient(160deg, ${GREEN_DARK} 0%, #0F2D1E 60%, #071C12 100%)`,
    minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#F8F9FA", padding: 20,
    display: "flex", flexDirection: "column", alignItems: "center",
  };
  const card = (extra = {}) => ({
    background: CARD_BG, borderRadius: 16,
    border: `1px solid ${CARD_BORDER}`, padding: 20, ...extra,
  });

  // ── HOME ────────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={wrapStyle}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <AdBanner size="leaderboard" />

        <div style={{ textAlign: "center", paddingBottom: 8 }}>
          <div style={{ fontSize: 64, lineHeight: 1 }}>🏆</div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: GOLD, letterSpacing: 3, margin: "8px 0 4px", textTransform: "uppercase" }}>
            WC 2026 Quiz
          </h1>
          <p style={{ color: "#888", fontSize: 13, margin: "0 0 6px" }}>
            FIFA World Cup · Jun 11 – Jul 19, 2026
          </p>
          <p style={{ color: "#bbb", fontSize: 15, margin: "0 0 28px", lineHeight: 1.6 }}>
            10 questions · 15 sec each · Time bonus points<br />
            How high can you score?
          </p>

          <button onClick={() => setScreen("category")} style={{
            background: GOLD, color: GREEN_DARK, border: "none",
            borderRadius: 50, padding: "15px 44px", fontSize: 17,
            fontWeight: 900, cursor: "pointer", letterSpacing: 1,
            boxShadow: `0 0 32px ${GOLD}66`, marginBottom: 32,
          }}>
            KICK OFF ⚽
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {CATEGORIES.map(cat => (
            <div key={cat} onClick={() => startQuiz(cat)} style={{
              ...card({ padding: 16, cursor: "pointer", transition: "border-color 0.2s" }),
              position: "relative",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
              onMouseLeave={e => e.currentTarget.style.borderColor = CARD_BORDER}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{CAT_ICONS[cat]}</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{cat}</div>
              <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{CAT_DESC[cat]}</div>
              {highScores[cat] > 0 && (
                <div style={{ position: "absolute", top: 8, right: 10, color: GOLD, fontSize: 10, fontWeight: 700 }}>
                  🏅 {highScores[cat]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ ...card({ marginTop: 14, padding: 14 }) }}>
          <div style={{ fontSize: 13, color: GOLD, fontWeight: 700, marginBottom: 8 }}>World Cup Guides</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
            {GUIDE_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "#cdebd8",
                  fontSize: 13,
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "9px 10px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <RevenueBlock />

        <AdBanner size="small" />
      </div>
    </div>
  );

  // ── CATEGORY ────────────────────────────────────────────────────────────────
  if (screen === "category") return (
    <div style={wrapStyle}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer", marginBottom: 16, padding: 0 }}>← Back</button>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: GOLD, margin: "0 0 4px" }}>Choose Category</h2>
        <p style={{ color: "#888", fontSize: 13, margin: "0 0 20px" }}>10 questions · 15 seconds each · Time bonus</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CATEGORIES.map(cat => (
            <div key={cat} onClick={() => startQuiz(cat)} style={{
              ...card({ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "border-color 0.2s" }),
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
              onMouseLeave={e => e.currentTarget.style.borderColor = CARD_BORDER}
            >
              <div style={{ fontSize: 32 }}>{CAT_ICONS[cat]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{cat}</div>
                <div style={{ color: "#888", fontSize: 13 }}>{CAT_DESC[cat]}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                {highScores[cat] > 0 && <div style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>Best: {highScores[cat]}</div>}
                <div style={{ color: GOLD, fontSize: 22 }}>›</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── QUIZ ────────────────────────────────────────────────────────────────────
  if (screen === "quiz" && questions.length > 0) {
    const q = questions[qIndex];
    return (
      <div style={wrapStyle}>
        <div style={{ width: "100%", maxWidth: 480 }}>

          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={() => { clearInterval(timerRef.current); setScreen("home"); }}
              style={{ background: "none", border: "none", color: "#666", fontSize: 18, cursor: "pointer", padding: 0 }}>✕</button>
            <div style={{ display: "flex", gap: 5 }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: i < qIndex ? "#22c55e" : i === qIndex ? GOLD : "rgba(255,255,255,0.18)",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <div style={{ color: GOLD, fontWeight: 800, fontSize: 16 }}>{score} <span style={{ fontWeight: 400, fontSize: 12, color: "#888" }}>pts</span></div>
          </div>

          {/* Category + progress */}
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{
              background: "rgba(245,197,24,0.12)", border: `1px solid ${GOLD}33`,
              borderRadius: 20, padding: "4px 14px", fontSize: 12, color: GOLD,
            }}>
              {CAT_ICONS[category]} {category} · Q{qIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Timer bar */}
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 5, marginBottom: 18, overflow: "hidden" }}>
            <div style={{ width: `${timerPct}%`, height: "100%", background: timerColor, transition: "width 1s linear, background 0.3s" }} />
          </div>

          {/* Question */}
          <div style={{ ...card({ marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 12, minHeight: 90 }) }}>
            <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.55, margin: 0, flex: 1 }}>{q.q}</p>
            <span style={{ color: timerColor, fontWeight: 900, fontSize: 22, minWidth: 26, textAlign: "right" }}>{timeLeft}</span>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.opts.map((opt, i) => {
              const isCorrect = i === q.ans;
              const isSelected = i === selected;
              const revealed = selected !== null;
              let bg2 = "rgba(255,255,255,0.07)";
              let borderC = "rgba(255,255,255,0.13)";
              if (revealed) {
                if (isCorrect) { bg2 = "rgba(34,197,94,0.18)"; borderC = "#22c55e"; }
                else if (isSelected) { bg2 = "rgba(239,68,68,0.18)"; borderC = "#ef4444"; }
              }
              return (
                <button key={i} onClick={() => handleAnswer(i, score, answers)} disabled={revealed}
                  style={{
                    background: bg2, border: `1px solid ${borderC}`, borderRadius: 12,
                    padding: "14px 16px", color: "#F8F9FA", cursor: revealed ? "default" : "pointer",
                    textAlign: "left", fontSize: 14, fontWeight: 500,
                    display: "flex", alignItems: "center", gap: 12, transition: "all 0.25s",
                  }}>
                  <span style={{
                    background: "rgba(255,255,255,0.1)", borderRadius: "50%",
                    width: 28, height: 28, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {revealed && isCorrect && <span>✅</span>}
                  {revealed && isSelected && !isCorrect && <span>❌</span>}
                </button>
              );
            })}
          </div>

          <AdBanner size="small" />
        </div>
      </div>
    );
  }

  // ── RESULT ──────────────────────────────────────────────────────────────────
  if (screen === "result") {
    const isNewHigh = score > 0 && score >= (highScores[category] || 0);
    const emoji = correct >= 8 ? "🏆" : correct >= 6 ? "⚽" : correct >= 4 ? "👍" : "📚";

    return (
      <div style={{ ...wrapStyle, justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>

          <div style={{ fontSize: 56, marginBottom: 8 }}>{emoji}</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: GOLD, margin: "0 0 4px" }}>{grade}</h2>
          <p style={{ color: "#888", fontSize: 13, margin: "0 0 20px" }}>{CAT_ICONS[category]} {category}</p>

          {/* Score card */}
          <div style={{ ...card({ marginBottom: 16 }) }}>
            <div style={{ fontSize: 54, fontWeight: 900, color: GOLD, lineHeight: 1 }}>{score}</div>
            <div style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>points earned</div>
            <div style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
              <div><div style={{ fontSize: 24, fontWeight: 800, color: "#22c55e" }}>{correct}</div><div style={{ color: "#888", fontSize: 12 }}>Correct</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>{questions.length - correct}</div><div style={{ color: "#888", fontSize: 12 }}>Wrong</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 800 }}>{pct}%</div><div style={{ color: "#888", fontSize: 12 }}>Accuracy</div></div>
            </div>
          </div>

          {isNewHigh && (
            <div style={{ color: GOLD, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🎉 New Personal Best!</div>
          )}

          {/* Answer trail */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
            {answers.map((a, i) => (
              <div key={i} title={`Q${i + 1}: ${a.q}`} style={{
                width: 32, height: 32, borderRadius: "50%", fontSize: 14,
                background: a.correct ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                border: `2px solid ${a.correct ? "#22c55e" : "#ef4444"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {a.correct ? "✓" : "✗"}
              </div>
            ))}
          </div>

          {/* Wrong answers review */}
          {answers.filter(a => !a.correct).length > 0 && (
            <div style={{ ...card({ marginBottom: 20, textAlign: "left" }) }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: GOLD, marginBottom: 10 }}>📝 Missed Answers</div>
              {answers.filter(a => !a.correct).map((a, i) => (
                <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < answers.filter(x => !x.correct).length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ fontSize: 12, color: "#bbb", marginBottom: 4 }}>{a.q}</div>
                  <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>✅ {a.ans}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => startQuiz(category)} style={{
              background: GOLD, color: GREEN_DARK, border: "none",
              borderRadius: 50, padding: "13px 30px", fontSize: 15, fontWeight: 900, cursor: "pointer",
            }}>
              Play Again
            </button>
            <button onClick={shareScore} style={{
              background: "#1d4ed8", color: "#fff", border: "none",
              borderRadius: 50, padding: "13px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}>
              Share Score
            </button>
            <button onClick={() => setScreen("category")} style={{
              background: "transparent", color: GOLD, border: `2px solid ${GOLD}`,
              borderRadius: 50, padding: "13px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}>
              Change Category
            </button>
          </div>

          <RevenueBlock />

          <button onClick={() => setScreen("home")} style={{
            background: "none", border: "none", color: "#666", fontSize: 13,
            cursor: "pointer", marginTop: 12, textDecoration: "underline",
          }}>
            Back to Home
          </button>

          <AdBanner size="small" />
        </div>
      </div>
    );
  }

  return null;
}
