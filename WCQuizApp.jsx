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
  "Tournament Timeline": [
    { q: "When does the FIFA World Cup 2026 tournament begin?", opts: ["June 8, 2026", "June 11, 2026", "June 15, 2026", "June 20, 2026"], ans: 1 },
    { q: "When is the FIFA World Cup 2026 final scheduled?", opts: ["July 10, 2026", "July 14, 2026", "July 19, 2026", "July 25, 2026"], ans: 2 },
    { q: "How many groups will the tournament have?", opts: ["8", "10", "12", "16"], ans: 2 },
    { q: "How many host cities are planned for the tournament?", opts: ["10", "12", "14", "16"], ans: 3 },
    { q: "How many matches are planned in total?", opts: ["80", "96", "104", "120"], ans: 2 },
    { q: "Which country is NOT a host nation?", opts: ["USA", "Canada", "Mexico", "Brazil"], ans: 3 },
    { q: "How many teams will take part?", opts: ["32", "40", "48", "56"], ans: 2 },
    { q: "Which stage comes right after the group stage?", opts: ["Round of 32", "Semi-finals", "Final", "Third-place play-off"], ans: 0 },
    { q: "Which of these is a host city for the tournament?", opts: ["Buenos Aires", "Toronto", "Lisbon", "Seoul"], ans: 1 },
    { q: "What is the official tournament title?", opts: ["FIFA World Cup 2026", "World Cup 2026", "FIFA 2026", "World Championship 2026"], ans: 0 },
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
const CAT_ICONS = { "WC 2026": "🏆", "History": "📜", "Teams & Players": "⚽", "Tournament Timeline": "🗓️", "Rules & Records": "📋" };
const CAT_DESC = {
  "WC 2026": "Current tournament facts",
  "History": "Classic World Cup moments",
  "Teams & Players": "Stars & nations",
  "Tournament Timeline": "Key dates and schedule",
  "Rules & Records": "Laws of the game",
};

const TIMER_MAX = 15;
const GOLD = "#F5C518";
const MATCH_SCHEDULE = [
  { label: "First Stage Group A", status: "FT", confirmed: true, countryA: "Mexico", codeA: "MEX", isoA: "mx", countryB: "South Africa", codeB: "RSA", isoB: "za", date: "12 Jun 2026", time: "FT", result: "2-0", venue: "Mexico City Stadium (Mexico City)", kickoffAt: null },
  { label: "First Stage Group B", status: "FT", confirmed: true, countryA: "Canada", codeA: "CAN", isoA: "ca", countryB: "Bosnia and Herzegovina", codeB: "BIH", isoB: "ba", date: "13 Jun 2026", time: "FT", result: "1-1", venue: "Toronto Stadium (Toronto)", kickoffAt: null },
  { label: "First Stage Group D", status: "FT", confirmed: true, countryA: "USA", codeA: "USA", isoA: "us", countryB: "Paraguay", codeB: "PAR", isoB: "py", date: "13 Jun 2026", time: "FT", result: "4-1", venue: "Los Angeles Stadium (Los Angeles)", kickoffAt: null },
  { label: "First Stage Group J", status: "FT", confirmed: true, countryA: "Argentina", codeA: "ARG", isoA: "ar", countryB: "Algeria", codeB: "ALG", isoB: "dz", date: "17 Jun 2026", time: "FT", result: "3-0", venue: "Kansas City Stadium (Kansas City)", kickoffAt: null },
  { label: "First Stage Group D", status: "FT", confirmed: true, countryA: "Turkiye", codeA: "TUR", isoA: "tr", countryB: "USA", codeB: "USA", isoB: "us", date: "26 Jun 2026", time: "FT", result: "3-2", venue: "Los Angeles Stadium (Los Angeles)", kickoffAt: null },
  { label: "First Stage Group I", status: "Upcoming", confirmed: true, countryA: "Senegal", codeA: "SEN", isoA: "sn", countryB: "Iraq", codeB: "IRQ", isoB: "iq", date: "27 Jun 2026", time: "00:30", result: null, venue: "Toronto Stadium (Toronto)", kickoffAt: "2026-06-27T00:30:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: true, countryA: "South Africa", codeA: "RSA", isoA: "za", countryB: "Canada", codeB: "CAN", isoB: "ca", date: "29 Jun 2026", time: "00:30", result: null, venue: "Los Angeles Stadium (Los Angeles)", kickoffAt: "2026-06-29T00:30:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: true, countryA: "Brazil", codeA: "BRA", isoA: "br", countryB: "Japan", codeB: "JPN", isoB: "jp", date: "29 Jun 2026", time: "22:30", result: null, venue: "Houston Stadium (Houston)", kickoffAt: "2026-06-29T22:30:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: false, countryA: "Germany", codeA: "GER", isoA: "de", countryB: "3ABCDF", codeB: "3ABCDF", isoB: null, date: "30 Jun 2026", time: "02:00", result: null, venue: "Boston Stadium (Boston)", kickoffAt: "2026-06-30T02:00:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: true, countryA: "Netherlands", codeA: "NED", isoA: "nl", countryB: "Morocco", codeB: "MAR", isoB: "ma", date: "30 Jun 2026", time: "06:30", result: null, venue: "Monterrey Stadium (Monterrey)", kickoffAt: "2026-06-30T06:30:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: false, countryA: "Mexico", codeA: "MEX", isoA: "mx", countryB: "3CEFHI", codeB: "3CEFHI", isoB: null, date: "01 Jul 2026", time: "06:30", result: null, venue: "Mexico City Stadium (Mexico City)", kickoffAt: "2026-07-01T06:30:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: true, countryA: "USA", codeA: "USA", isoA: "us", countryB: "Bosnia and Herzegovina", codeB: "BIH", isoB: "ba", date: "02 Jul 2026", time: "05:30", result: null, venue: "San Francisco Bay Area Stadium", kickoffAt: "2026-07-02T05:30:00" },
  { label: "Round of 32", status: "Upcoming", confirmed: false, countryA: "Argentina", codeA: "ARG", isoA: "ar", countryB: "2H", codeB: "2H", isoB: null, date: "04 Jul 2026", time: "03:30", result: null, venue: "Miami Stadium (Miami)", kickoffAt: "2026-07-04T03:30:00" },
];
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
const SUPPORT_LINK = "mailto:contact.wcquizportal@gmail.com?subject=Sponsor%20WC%202026%20Quiz%20Portal";
const OBFUSCATED_UPI_ID = "aWNlYWdlMjAwMUBva2ljaWNp";
const DECODED_UPI_ID = (() => {
  try { return atob(OBFUSCATED_UPI_ID); } catch { return "iceage2001@okicici"; }
})();
const UPI_QUERY = `pa=${encodeURIComponent(DECODED_UPI_ID)}&pn=${encodeURIComponent("WC 2026 Quiz Portal")}&tn=${encodeURIComponent("Support via UPI")}&cu=INR`;
const UPI_DONATE_LINK = `upi://pay?${UPI_QUERY}`;
const UPI_APPS = [
  { label: "Google Pay", packageName: "com.google.android.apps.nbu.paisa.user" },
  { label: "PhonePe", packageName: "com.phonepe.app" },
  { label: "Paytm", packageName: "net.one97.paytm" },
];

function buildUpiIntentUrl(packageName) {
  return `intent://pay?${UPI_QUERY}#Intent;scheme=upi;package=${packageName};end`;
}
const AFFILIATE_LINK = "https://www.amazon.in/s?k=world+cup+jersey&tag=yourtag-21";
const HAS_AFFILIATE_LINK = !AFFILIATE_LINK.includes("tag=yourtag-21");
const HAS_UPI_DONATE = DECODED_UPI_ID.includes("@") && DECODED_UPI_ID.length > 4;

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function TeamBadge({ iso, code, name }) {
  const [imgError, setImgError] = useState(!iso);
  const flagUrl = iso ? `https://flagcdn.com/w20/${iso}.png` : "";

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 8px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 0 12px rgba(0,0,0,0.18)",
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1,
      whiteSpace: "nowrap",
    }}>
      {!imgError ? (
        <img
          src={flagUrl}
          alt={`${name} flag`}
          width="24"
          height="16"
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ borderRadius: 3, objectFit: "cover", border: "1px solid rgba(255,255,255,0.35)", boxShadow: "0 0 8px rgba(0,0,0,0.28)" }}
        />
      ) : (
        <span style={{
          minWidth: 24,
          textAlign: "center",
          fontSize: 11,
          padding: "2px 4px",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.35)",
          background: "rgba(255,255,255,0.08)",
        }}>
          {code.slice(0, 2)}
        </span>
      )}
      <span style={{ color: "#f2e289", fontSize: 11 }}>{code}</span>
      <span style={{ color: "#eef7f1" }}>{name}</span>
    </span>
  );
}

function CountdownBanner({ compact = false }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextMatch, setNextMatch] = useState(MATCH_SCHEDULE.find((m) => m.status === "Upcoming" && m.confirmed) || MATCH_SCHEDULE[0]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const confirmedUpcoming = MATCH_SCHEDULE
        .filter((match) => match.status === "Upcoming" && match.confirmed && match.kickoffAt)
        .sort((a, b) => new Date(a.kickoffAt) - new Date(b.kickoffAt));

      const upcoming = confirmedUpcoming.find((match) => new Date(match.kickoffAt) > now) || confirmedUpcoming[0] || MATCH_SCHEDULE[0];
      setNextMatch(upcoming);

      if (!upcoming.kickoffAt) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const diff = Math.max(0, new Date(upcoming.kickoffAt) - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      marginBottom: 14,
      border: "1px solid rgba(245,197,24,0.2)",
      borderRadius: 14,
      background: "linear-gradient(135deg, rgba(245,197,24,0.16), rgba(255,255,255,0.05))",
      boxShadow: "0 0 24px rgba(245,197,24,0.16)",
      padding: 12,
    }}>
      <div style={{ fontSize: compact ? 10 : 12, color: GOLD, fontWeight: 800, marginBottom: compact ? 6 : 8, letterSpacing: 1.1, textTransform: "uppercase" }}>
        Next Confirmed Match Countdown
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: compact ? 4 : 8, flexWrap: "wrap", marginBottom: compact ? 6 : 8 }}>
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} style={{ flex: 1, minWidth: compact ? 46 : 70, textAlign: "center", background: "rgba(7,28,18,0.7)", borderRadius: 10, padding: compact ? "6px 4px" : "8px 6px" }}>
            <div style={{ fontSize: compact ? 13 : 16, fontWeight: 800, color: GOLD }}>{String(item.value).padStart(2, "0")}</div>
            <div style={{ fontSize: compact ? 8 : 10, color: "#b9c9be", textTransform: "uppercase" }}>{item.label}</div>
          </div>
        ))}
      </div>
      <div style={{ color: "#f8f9fa", fontSize: compact ? 12 : 13, fontWeight: 700 }}>{nextMatch.label}</div>
      <div style={{ color: "#f8f9fa", fontSize: compact ? 12 : 13, fontWeight: 700, marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        <TeamBadge iso={nextMatch.isoA} code={nextMatch.codeA} name={nextMatch.countryA} />
        <span style={{
          padding: "4px 9px",
          borderRadius: 999,
          border: "1px solid rgba(245,197,24,0.35)",
          background: "rgba(245,197,24,0.12)",
          color: GOLD,
          fontSize: 11,
          letterSpacing: 0.7,
        }}>VS</span>
        <TeamBadge iso={nextMatch.isoB} code={nextMatch.codeB} name={nextMatch.countryB} />
      </div>
      <div style={{ color: "#b9c9be", fontSize: compact ? 11 : 12, marginTop: 3 }}>{nextMatch.date} · {nextMatch.time} · {nextMatch.venue}</div>
    </div>
  );
}

function ScheduleTable() {
  return (
    <div style={{
      marginBottom: 14,
      border: "1px solid rgba(245,197,24,0.2)",
      borderRadius: 8,
      background: "rgba(255,255,255,0.04)",
      boxShadow: "0 0 24px rgba(0,0,0,0.16)",
      padding: 12,
    }}>
      <div style={{ fontSize: 12, color: GOLD, fontWeight: 800, marginBottom: 8, letterSpacing: 1.1, textTransform: "uppercase" }}>
        Full Match Schedule
      </div>
      <div style={{ display: "grid", gap: 8, maxHeight: 280, overflowY: "auto", overflowX: "auto", paddingRight: 4 }}>
        {MATCH_SCHEDULE.map((item, idx) => (
          <div key={`${item.label}-${idx}`} style={{
            display: "grid",
            gridTemplateColumns: "100px minmax(360px, 1fr) 95px 130px",
            gap: 8,
            alignItems: "center",
            minWidth: 700,
            borderBottom: idx < MATCH_SCHEDULE.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            paddingBottom: idx < MATCH_SCHEDULE.length - 1 ? 8 : 0,
          }}>
            <div style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>{item.date}</div>
            <div style={{ color: "#f8f9fa", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              <span style={{
                padding: "3px 8px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 11,
                color: "#d8e9df",
              }}>{item.label}</span>
                <TeamBadge iso={item.isoA} code={item.codeA} name={item.countryA} />
                <span style={{
                  padding: "3px 8px",
                  borderRadius: 999,
                  border: "1px solid rgba(245,197,24,0.35)",
                  background: "rgba(245,197,24,0.12)",
                  color: GOLD,
                  fontSize: 10,
                  letterSpacing: 0.7,
                }}>VS</span>
                <TeamBadge iso={item.isoB} code={item.codeB} name={item.countryB} />
            </div>
            <div style={{ color: "#b9c9be", fontSize: 12, textAlign: "right" }}>{item.result ? `FT ${item.result}` : item.time}</div>
            <div style={{ color: "#88a395", fontSize: 11, textAlign: "right", whiteSpace: "nowrap" }}>{item.venue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const supportLabel = "Support via UPI";
  const sponsorLabel = "Advertise / Sponsor";
  const [upiMessage, setUpiMessage] = useState("");
  const isAndroid = /Android/i.test(navigator.userAgent || "");

  const openUpiApp = (packageName) => {
    if (!HAS_UPI_DONATE) {
      setUpiMessage("UPI is not configured yet.");
      return;
    }
    try {
      window.location.href = buildUpiIntentUrl(packageName);
    } catch {
      setUpiMessage("Could not open selected UPI app. Please try another app option.");
    }
  };

  const handleDonateClick = (event) => {
    event.preventDefault();
    if (!HAS_UPI_DONATE) {
      window.location.href = SUPPORT_LINK;
      return;
    }

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");

    try {
      setUpiMessage("Trying to open your UPI app...");
      window.location.href = UPI_DONATE_LINK;

      // On desktop or unsupported browsers, deep links usually do nothing.
      setTimeout(async () => {
        if (!isMobile && document.visibilityState === "visible") {
          try {
            await navigator.clipboard.writeText(DECODED_UPI_ID);
            setUpiMessage("UPI app not found in this browser. UPI ID copied. Paste it in any UPI app to pay.");
          } catch {
            setUpiMessage(`UPI app not found in this browser. Use this UPI ID in your app: ${DECODED_UPI_ID}`);
          }
        } else if (isMobile && isAndroid) {
          setUpiMessage("If it does not open automatically, use Open with: Google Pay / PhonePe / Paytm buttons below.");
        }
      }, 1200);
    } catch {
      setUpiMessage(`Could not open UPI app. Use this UPI ID in your payment app: ${DECODED_UPI_ID}`);
    }
  };

  return (
    <div style={{
      marginTop: 14,
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 12,
      padding: 12,
    }}>
      <div style={{ fontSize: 12, color: "#bbb", marginBottom: 10 }}>Support this portal</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <a href={UPI_DONATE_LINK} onClick={handleDonateClick} style={{
          display: "block",
          textDecoration: "none",
          textAlign: "center",
          padding: "11px 10px",
          borderRadius: 10,
          border: "1px solid rgba(34,197,94,0.35)",
          color: "#86efac",
          fontSize: 13,
          fontWeight: 800,
          background: "rgba(34,197,94,0.08)",
        }}>
          {supportLabel}
        </a>
        <a href="/contact.html" style={{
          display: "block",
          textDecoration: "none",
          textAlign: "center",
          padding: "11px 10px",
          borderRadius: 10,
          border: "1px solid rgba(245,197,24,0.3)",
          color: GOLD,
          fontSize: 13,
          fontWeight: 800,
          background: "rgba(245,197,24,0.08)",
        }}>
          {sponsorLabel}
        </a>
      </div>
      {isAndroid && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: "#cbd5e1", marginBottom: 6 }}>Open with UPI app</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {UPI_APPS.map((app) => (
              <button
                key={app.packageName}
                type="button"
                onClick={() => openUpiApp(app.packageName)}
                style={{
                  padding: "8px 6px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#dbeafe",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {app.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {upiMessage && (
        <div style={{ marginTop: 10, fontSize: 11, color: "#cbd5e1", lineHeight: 1.4 }}>
          {upiMessage}
        </div>
      )}
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

const PLAYER_SPOTLIGHT = [
  {
    id: "player-messi",
    text: "Who is most likely to create the biggest tournament moment?",
    options: ["Lionel Messi", "Kylian Mbappe", "Jude Bellingham"],
  },
  {
    id: "player-keeper",
    text: "Which goalkeeper will keep the most clean sheets at this stage?",
    options: ["Alisson", "Martinez", "Courtois"],
  },
  {
    id: "player-boot",
    text: "Who is your early Golden Boot favorite?",
    options: ["Mbappe", "Haaland", "Vinicius Jr."],
  },
];

const GENERAL_FIFA_POLLS = [
  {
    id: "general-host",
    text: "Which host nation will go furthest in this World Cup?",
    options: ["USA", "Mexico", "Canada"],
  },
  {
    id: "general-surprise",
    text: "Which region will deliver the biggest surprise run?",
    options: ["Africa", "Asia", "South America"],
  },
  {
    id: "general-final",
    text: "Which final matchup would you most like to watch?",
    options: ["Argentina vs France", "Brazil vs England", "Spain vs Portugal"],
  },
];

function buildGeneratedCommunityQuestions() {
  const matchPolls = MATCH_SCHEDULE
    .filter((item) => item.status === "Upcoming" && item.confirmed)
    .slice(0, 4)
    .map((item, idx) => ({
      id: `match-${idx}-${item.codeA}-${item.codeB}`,
      text: `Pick result: ${item.countryA} vs ${item.countryB}`,
      topic: "FIFA Matches",
      status: "Pending Review",
      options: [item.countryA, "Draw", item.countryB],
      voteCounts: [0, 0, 0],
      createdAt: item.kickoffAt || new Date().toISOString(),
    }));

  const playerPolls = PLAYER_SPOTLIGHT.map((item) => ({
    id: item.id,
    text: item.text,
    topic: "Players",
    status: "Pending Review",
    options: item.options,
    voteCounts: [0, 0, 0],
    createdAt: new Date().toISOString(),
  }));

  const generalPolls = GENERAL_FIFA_POLLS.map((item) => ({
    id: item.id,
    text: item.text,
    topic: "General FIFA",
    status: "Pending Review",
    options: item.options,
    voteCounts: [0, 0, 0],
    createdAt: new Date().toISOString(),
  }));

  return [...matchPolls, ...playerPolls, ...generalPolls];
}

function loadCommunityQuestions() {
  const generated = buildGeneratedCommunityQuestions();

  try {
    const raw = window.localStorage?.getItem("wc_community_questions");
    if (!raw) return generated;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return generated;

    const votesById = new Map(
      parsed.map((item) => {
        const validCounts = Array.isArray(item.voteCounts) && item.voteCounts.length === 3
          ? item.voteCounts.map((n) => Number(n) || 0)
          : [Number(item.votes) || 0, 0, 0];
        return [item.id, validCounts];
      })
    );

    return generated.map((item) => ({ ...item, voteCounts: votesById.get(item.id) || [0, 0, 0] }));
  } catch {
    return generated;
  }
}

function persistCommunityQuestions(items) {
  try {
    window.localStorage?.setItem("wc_community_questions", JSON.stringify(items));
  } catch {}
}

function loadCommunityVotedMap() {
  try {
    const raw = window.localStorage?.getItem("wc_community_voted");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function persistCommunityVotedMap(votedMap) {
  try {
    window.localStorage?.setItem("wc_community_voted", JSON.stringify(votedMap));
  } catch {}
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function WCQuizApp() {
  const [screen, setScreen] = useState("home"); // home | category | quiz | result | community
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_MAX);
  const [answers, setAnswers] = useState([]);
  const [highScores, setHighScores] = useState({});
  const [communityQuestions, setCommunityQuestions] = useState([]);
  const [communityVoted, setCommunityVoted] = useState({});
  const timerRef = useRef(null);

  // Load high scores for web deploy + optional storage adapter
  useEffect(() => {
    (async () => {
      const saved = await loadHighScoresFromAnySource();
      if (saved) setHighScores(saved);
    })();

    setCommunityQuestions(loadCommunityQuestions());
    setCommunityVoted(loadCommunityVotedMap());
  }, []);

  const voteCommunityQuestion = useCallback((id, optionIndex) => {
    if (communityVoted[id] !== undefined) return;

    setCommunityQuestions(prev => {
      const next = prev.map((item) => {
        if (item.id !== id) return item;
        const updatedCounts = [...item.voteCounts];
        updatedCounts[optionIndex] = (updatedCounts[optionIndex] || 0) + 1;
        return { ...item, voteCounts: updatedCounts };
      });
      persistCommunityQuestions(next);
      return next;
    });

    setCommunityVoted(prev => {
      const next = { ...prev, [id]: optionIndex };
      persistCommunityVotedMap(next);
      return next;
    });
  }, [communityVoted]);

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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: GOLD, letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>
              WC 2026 Quiz
            </div>
            <div style={{ color: "#888", fontSize: 12 }}>
              FIFA World Cup · Jun 11 – Jul 19, 2026
            </div>
            <div style={{ color: "#bbb", fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>
              10 questions · 15 sec each · Time bonus points
            </div>
          </div>
          <div style={{ width: 180 }}>
            <CountdownBanner compact />
          </div>
        </div>

        <div style={{ textAlign: "center", paddingBottom: 16 }}>
          <button onClick={() => setScreen("category")} style={{
            background: GOLD, color: GREEN_DARK, border: "none",
            borderRadius: 50, padding: "15px 44px", fontSize: 17,
            fontWeight: 900, cursor: "pointer", letterSpacing: 1,
            boxShadow: `0 0 32px ${GOLD}66`, marginBottom: 10,
          }}>
            KICK OFF ⚽
          </button>
          <button onClick={() => setScreen("community")} style={{
            marginLeft: 10,
            background: "transparent", color: "#cdebd8", border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: 50, padding: "12px 18px", fontSize: 13,
            fontWeight: 700, cursor: "pointer",
          }}>
            Community Questions
          </button>
        </div>

        <ScheduleTable />

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

  // ── COMMUNITY ───────────────────────────────────────────────────────────────
  if (screen === "community") {
    const sortedItems = [...communityQuestions].sort((a, b) => {
      const votesA = (a.voteCounts || []).reduce((sum, n) => sum + n, 0);
      const votesB = (b.voteCounts || []).reduce((sum, n) => sum + n, 0);
      return votesB - votesA;
    });

    return (
      <div style={wrapStyle}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <button
            onClick={() => setScreen("home")}
            style={{ background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer", marginBottom: 12, padding: 0 }}
          >
            ← Back
          </button>

          <div style={{ ...card({ marginBottom: 12 }) }}>
            <h2 style={{ margin: 0, color: GOLD, fontSize: 22 }}>Community Questions</h2>
            <p style={{ color: "#9fb3a8", fontSize: 12, margin: "8px 0 0" }}>
              FIFA match, player, and general polls are generated automatically when the page loads. Users can vote only.
            </p>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {sortedItems.length === 0 && (
              <div style={{ ...card({ textAlign: "center", color: "#9fb3a8", fontSize: 13 }) }}>
                Polls are being prepared. Refresh in a moment.
              </div>
            )}

            {sortedItems.map((item) => (
              <div key={item.id} style={{ ...card({ padding: 14 }) }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <span style={{ color: GOLD, fontSize: 11, fontWeight: 700 }}>{item.topic}</span>
                  <span style={{
                    fontSize: 10,
                    color: "#cdebd8",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 999,
                    padding: "3px 8px",
                    background: "rgba(255,255,255,0.03)",
                  }}>
                    {item.status}
                  </span>
                </div>
                <div style={{ marginTop: 8, color: "#eef7f1", fontSize: 14, lineHeight: 1.5 }}>{item.text}</div>
                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
                  {(item.options || []).map((opt, optIndex) => {
                    const selectedIndex = communityVoted[item.id];
                    const isSelected = selectedIndex === optIndex;
                    const isLocked = selectedIndex !== undefined;
                    const optVotes = item.voteCounts?.[optIndex] || 0;
                    return (
                      <button
                        key={`${item.id}-${opt}`}
                        onClick={() => voteCommunityQuestion(item.id, optIndex)}
                        disabled={isLocked}
                        style={{
                          background: isSelected ? "rgba(245,197,24,0.2)" : "rgba(255,255,255,0.04)",
                          color: isSelected ? GOLD : "#e8f4ec",
                          border: isSelected ? "1px solid rgba(245,197,24,0.55)" : "1px solid rgba(255,255,255,0.18)",
                          borderRadius: 8,
                          padding: "8px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                          textAlign: "left",
                          cursor: isLocked ? "default" : "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{opt}</span>
                        <span style={{ color: "#9fb3a8", fontSize: 11 }}>{optVotes} vote(s)</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#9fb3a8" }}>
                    Total votes: {(item.voteCounts || []).reduce((sum, n) => sum + n, 0)}
                  </span>
                  <span style={{ fontSize: 11, color: communityVoted[item.id] !== undefined ? "#86efac" : "#9fb3a8" }}>
                    {communityVoted[item.id] !== undefined ? "Selection saved" : "Select 1 of 3"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
