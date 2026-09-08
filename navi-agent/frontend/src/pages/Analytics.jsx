import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Analytics.scss";

// ── Minimal, Purpose-Built SVG Icons ─────────────────────────────────────────
function IconRoute({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function IconCheck({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconClock({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconFileText({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconAlertCircle({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function IconArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconRefresh({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function IconGraduationCap({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

// ── Date Formatting Helpers ──────────────────────────────────────────────────
function formatRelativeDate(isoStr) {
  if (!isoStr) return "—";
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return "—";
    
    const now = new Date();
    const diffSec = Math.floor((now - d) / 1000);
    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;
    if (diffSec < 86400 * 30) return `${Math.floor(diffSec / (86400 * 7))}w ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  } catch {
    return "—";
  }
}

// ── Time Range Options ───────────────────────────────────────────────────────
const RANGE_OPTIONS = [
  { id: "all", label: "All Time" },
  { id: "90d", label: "Last 90 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "7d", label: "Last 7 Days" },
];

export default function Analytics() {
  const navigate = useNavigate();
  const [range, setRange] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState(null);

  const fetchAnalytics = useCallback(async (selectedRange) => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://127.0.0.1:8001" : "");
      const res = await fetch(`${apiUrl}/api/admin/analytics?range=${selectedRange}`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("[Naavi Analytics Error]", err);
      setError(err.message || "Failed to load analytics data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(range);
  }, [range, fetchAnalytics]);

  // Derived metrics from real API response (zero mock fallbacks)
  const overview = data?.overview;
  const totalGenerated = overview?.total_generated ?? 0;
  const publishedCount = overview?.published_count ?? 0;
  const pendingCount = overview?.pending_count ?? 0;
  const draftCount = overview?.draft_count ?? 0;
  const publishRate = overview?.publish_rate ?? 0;
  const avgReviewTime = overview?.avg_review_time_formatted ?? "—";
  const thisWeekCount = overview?.this_week_count ?? 0;

  const funnel = data?.lifecycle_funnel || [];
  const categories = data?.categories || [];
  const monthlyTrend = data?.monthly_trend || [];
  const recentActivity = data?.recent_activity || [];

  // SVG Line/Area chart calculations for Monthly Trend
  const chartW = 580;
  const chartH = 190;
  const padX = 40;
  const padY = 24;
  const innerW = chartW - padX * 2;
  const innerH = chartH - padY * 2;

  const maxMonthlyVal = Math.max(
    ...monthlyTrend.map(m => Math.max(m.generated, m.published)),
    1
  );
  // Nice round ceiling for chart Y-axis
  const yCeil = Math.max(Math.ceil(maxMonthlyVal * 1.25), 4);

  const getCoordX = (i) => {
    if (monthlyTrend.length <= 1) return padX + innerW / 2;
    return padX + (i / (monthlyTrend.length - 1)) * innerW;
  };

  const getCoordY = (val) => {
    return chartH - padY - (val / yCeil) * innerH;
  };

  // Generate SVG paths
  const genPath = monthlyTrend.length > 0
    ? monthlyTrend.map((m, i) => `${i === 0 ? "M" : "L"} ${getCoordX(i)} ${getCoordY(m.generated)}`).join(" ")
    : "";

  const pubPath = monthlyTrend.length > 0
    ? monthlyTrend.map((m, i) => `${i === 0 ? "M" : "L"} ${getCoordX(i)} ${getCoordY(m.published)}`).join(" ")
    : "";

  const genArea = monthlyTrend.length > 0
    ? `${genPath} L ${getCoordX(monthlyTrend.length - 1)} ${chartH - padY} L ${getCoordX(0)} ${chartH - padY} Z`
    : "";

  const pubArea = monthlyTrend.length > 0
    ? `${pubPath} L ${getCoordX(monthlyTrend.length - 1)} ${chartH - padY} L ${getCoordX(0)} ${chartH - padY} Z`
    : "";

  // 3 Gridline intervals
  const yTicks = [
    Math.round(yCeil * 0.25),
    Math.round(yCeil * 0.5),
    Math.round(yCeil * 0.75),
    yCeil,
  ];

  return (
    <div className="naavi-analytics">
      {/* ── HEADER ── */}
      <header className="analytics-header">
        <div className="analytics-header__left">
          <span className="analytics-header__eyebrow">
            Platform Intelligence
          </span>
          <h1 className="analytics-header__title">Pathway Analytics</h1>
          <p className="analytics-header__sub">
            Real-time metrics on pathway generation volume, review throughput, category distribution, and platform activity.
          </p>
        </div>

        <div className="analytics-header__right">
          <div className="live-indicator" title="Connected to live database">
            <span className="live-dot" />
            <span>Live Data</span>
          </div>

          <div className="range-selector" role="tablist" aria-label="Date Range Filter">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`range-pill ${range === opt.id ? "active" : ""}`}
                onClick={() => setRange(opt.id)}
                disabled={loading && range === opt.id}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── ERROR STATE ── */}
      {error && !loading && (
        <div className="analytics-error-banner">
          <div className="error-content">
            <IconAlertCircle size={20} />
            <div>
              <strong>Unable to load analytics data</strong>
              <p>{error}</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-retry"
            onClick={() => fetchAnalytics(range)}
          >
            <IconRefresh size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* ── LOADING SKELETON STATE ── */}
      {loading && !data && (
        <div className="analytics-skeleton-wrapper">
          <div className="skeleton-kpis">
            {[1, 2, 3, 4, 5].map((k) => (
              <div key={k} className="skeleton-kpi shimmer" />
            ))}
          </div>
          <div className="skeleton-grid">
            <div className="skeleton-panel shimmer" style={{ height: 380 }} />
            <div className="skeleton-panel shimmer" style={{ height: 380 }} />
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      {data && (
        <main className="analytics-content">
          {/* ── REFINED OVERVIEW STRIP (Calm, Minimal, Non-Rainbow) ── */}
          <section className="overview-strip" aria-label="Platform Overview">
            <div className="overview-metric">
              <span className="metric-label">Total Pathways</span>
              <div className="metric-value-row">
                <span className="metric-number">{totalGenerated}</span>
                <span className="metric-badge metric-badge--emerald">
                  {publishRate}% published
                </span>
              </div>
              <span className="metric-caption">
                {thisWeekCount > 0 ? `+${thisWeekCount} this week` : "Total generated in selected range"}
              </span>
            </div>

            <div className="overview-divider" />

            <div className="overview-metric">
              <span className="metric-label">Published</span>
              <div className="metric-value-row">
                <span className="metric-number">{publishedCount}</span>
                <span className="status-indicator-dot dot--published" />
              </div>
              <span className="metric-caption">Live student-facing roadmaps</span>
            </div>

            <div className="overview-divider" />

            <div
              className="overview-metric overview-metric--interactive"
              onClick={() => navigate("/admin-review")}
              title="Click to view pending review queue"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/admin-review")}
            >
              <span className="metric-label">Pending Review</span>
              <div className="metric-value-row">
                <span className="metric-number">{pendingCount}</span>
                <span className="status-indicator-dot dot--pending" />
              </div>
              <span className="metric-link">
                <span>View Queue</span>
                <IconArrowRight size={12} />
              </span>
            </div>

            <div className="overview-divider" />

            <div className="overview-metric">
              <span className="metric-label">Drafts</span>
              <div className="metric-value-row">
                <span className="metric-number">{draftCount}</span>
                <span className="status-indicator-dot dot--draft" />
              </div>
              <span className="metric-caption">Unsubmitted working drafts</span>
            </div>

            <div className="overview-divider" />

            <div className="overview-metric">
              <span className="metric-label">Avg Review Turnaround</span>
              <div className="metric-value-row">
                <span className="metric-number">{avgReviewTime}</span>
              </div>
              <span className="metric-caption">Created → Published turnaround</span>
            </div>
          </section>

          {/* ── LIFECYCLE PROGRESSION (Generated → Under Review → Published) ── */}
          <section className="progression-section">
            <div className="section-head">
              <div>
                <h2 className="section-title">Pathway Lifecycle Pipeline</h2>
                <p className="section-sub">
                  Engine generation throughput and verification progression.
                </p>
              </div>
            </div>

            <div className="funnel-track">
              {funnel.map((step, idx) => (
                <div key={step.stage} className="funnel-step">
                  <div className="funnel-step__header">
                    <span className="funnel-step__stage">{step.stage}</span>
                    <span className="funnel-step__count">{step.count}</span>
                  </div>
                  <div className="funnel-bar-wrap">
                    <div
                      className={`funnel-bar funnel-bar--${idx}`}
                      style={{ width: `${totalGenerated > 0 ? (step.count / totalGenerated) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="funnel-step__footer">
                    <span className="funnel-step__pct">
                      {totalGenerated > 0 ? Math.round((step.count / totalGenerated) * 100) : 0}%
                    </span>
                    <span className="funnel-step__desc">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TWO-COLUMN DATA ARCHITECTURE ── */}
          <div className="analytics-grid">
            {/* ── LEFT COLUMN: Engine Volume & Category Performance ── */}
            <div className="grid-left-col">
              {/* Monthly Volume Chart */}
              <div className="analytics-card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">Pathway Generation & Publishing Volume</h3>
                    <p className="card-sub">Actual pathways created and published by month</p>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-indicator legend-indicator--gen" />
                      <span>Generated</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-indicator legend-indicator--pub" />
                      <span>Published</span>
                    </div>
                  </div>
                </div>

                <div className="chart-container">
                  {totalGenerated === 0 ? (
                    <div className="chart-empty-state">
                      <p>No pathway records generated in this time range.</p>
                    </div>
                  ) : (
                    <div className="svg-chart-wrap">
                      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="trend-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradGen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="gradPub" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Y-axis grid lines */}
                        {yTicks.map((tickVal) => (
                          <g key={tickVal}>
                            <line
                              x1={padX}
                              y1={getCoordY(tickVal)}
                              x2={chartW - padX}
                              y2={getCoordY(tickVal)}
                              className="chart-gridline"
                            />
                            <text
                              x={padX - 8}
                              y={getCoordY(tickVal) + 4}
                              textAnchor="end"
                              className="chart-axis-label"
                            >
                              {tickVal}
                            </text>
                          </g>
                        ))}

                        {/* Base zero axis */}
                        <line
                          x1={padX}
                          y1={chartH - padY}
                          x2={chartW - padX}
                          y2={chartH - padY}
                          className="chart-axis-baseline"
                        />

                        {/* Month labels */}
                        {monthlyTrend.map((m, i) => (
                          <text
                            key={m.name}
                            x={getCoordX(i)}
                            y={chartH - 6}
                            textAnchor="middle"
                            className="chart-axis-label"
                          >
                            {m.name}
                          </text>
                        ))}

                        {/* Area fills */}
                        {genArea && <path d={genArea} fill="url(#gradGen)" />}
                        {pubArea && <path d={pubArea} fill="url(#gradPub)" />}

                        {/* Lines */}
                        {genPath && <path d={genPath} className="chart-line chart-line--gen" />}
                        {pubPath && <path d={pubPath} className="chart-line chart-line--pub" />}

                        {/* Hover vertical guide line */}
                        {hoveredMonthIdx !== null && (
                          <line
                            x1={getCoordX(hoveredMonthIdx)}
                            y1={padY}
                            x2={getCoordX(hoveredMonthIdx)}
                            y2={chartH - padY}
                            className="chart-hover-guide"
                          />
                        )}

                        {/* Interactive Data Dots */}
                        {monthlyTrend.map((m, i) => (
                          <g key={i}>
                            <circle
                              cx={getCoordX(i)}
                              cy={getCoordY(m.generated)}
                              r={hoveredMonthIdx === i ? 5.5 : 3.5}
                              className="chart-dot chart-dot--gen"
                              onMouseEnter={() => setHoveredMonthIdx(i)}
                              onMouseLeave={() => setHoveredMonthIdx(null)}
                            />
                            <circle
                              cx={getCoordX(i)}
                              cy={getCoordY(m.published)}
                              r={hoveredMonthIdx === i ? 5.5 : 3.5}
                              className="chart-dot chart-dot--pub"
                              onMouseEnter={() => setHoveredMonthIdx(i)}
                              onMouseLeave={() => setHoveredMonthIdx(null)}
                            />
                          </g>
                        ))}
                      </svg>

                      {/* Tooltip */}
                      {hoveredMonthIdx !== null && monthlyTrend[hoveredMonthIdx] && (
                        <div
                          className="chart-tooltip"
                          style={{
                            left: `${(getCoordX(hoveredMonthIdx) / chartW) * 100}%`,
                          }}
                        >
                          <span className="tooltip-title">
                            {monthlyTrend[hoveredMonthIdx].name} {monthlyTrend[hoveredMonthIdx].year}
                          </span>
                          <div className="tooltip-row tooltip-row--gen">
                            <span>Generated</span>
                            <strong>{monthlyTrend[hoveredMonthIdx].generated}</strong>
                          </div>
                          <div className="tooltip-row tooltip-row--pub">
                            <span>Published</span>
                            <strong>{monthlyTrend[hoveredMonthIdx].published}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Category Performance */}
              <div className="analytics-card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">Category Distribution</h3>
                    <p className="card-sub">
                      Distribution across the 4 core platform categories based on active database records
                    </p>
                  </div>
                </div>

                <div className="categories-list">
                  {categories.map((cat) => (
                    <div key={cat.key} className="category-row">
                      <div className="category-row__meta">
                        <div className="category-row__name-block">
                          <span
                            className="category-indicator-dot"
                            style={{ background: cat.color }}
                          />
                          <span className="category-label">{cat.label}</span>
                        </div>
                        <div className="category-row__count-block">
                          <span className="category-count">{cat.count}</span>
                          <span className="category-pct">{cat.pct}%</span>
                        </div>
                      </div>

                      <div className="category-track">
                        <div
                          className="category-fill"
                          style={{
                            width: `${cat.pct}%`,
                            background: cat.color,
                          }}
                        />
                      </div>

                      <p className="category-desc">{cat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Actionable Recent Pathway Activity ── */}
            <div className="grid-right-col">
              <div className="analytics-card analytics-card--feed">
                <div className="card-header">
                  <div className="card-header__title-group">
                    <h3 className="card-title">Recent Pathway Activity</h3>
                    <span className="activity-count-badge">
                      {recentActivity.length} pathways
                    </span>
                  </div>
                  <button
                    type="button"
                    className="feed-link-btn"
                    onClick={() => navigate("/admin-review")}
                  >
                    <span>Review Queue</span>
                    <IconArrowRight size={13} />
                  </button>
                </div>

                <div className="activity-feed-list">
                  {recentActivity.length === 0 ? (
                    <div className="feed-empty-state">
                      <IconFileText size={32} />
                      <p>No recent pathway activity recorded for this period.</p>
                      <span className="empty-sub">
                        Pathways generated by students will automatically appear here.
                      </span>
                    </div>
                  ) : (
                    recentActivity.map((item) => (
                      <article
                        key={item.id}
                        className="activity-card"
                        onClick={() => navigate(`/admin-review/${item.id}`)}
                        role="button"
                        tabIndex={0}
                        title="Click to review and curate this pathway"
                        onKeyDown={(e) => e.key === "Enter" && navigate(`/admin-review/${item.id}`)}
                      >
                        <div className="activity-card__top">
                          <div className="activity-card__avatar">
                            {(item.student_name || "S")[0].toUpperCase()}
                          </div>
                          <div className="activity-card__meta">
                            <span className="activity-student-name">
                              {item.student_name}
                            </span>
                            <span className="activity-time">
                              {formatRelativeDate(item.created_at)}
                            </span>
                          </div>
                          <span className={`status-badge status-badge--${item.status === "published" ? "published" : "pending"}`}>
                            {item.status_label}
                          </span>
                        </div>

                        <div className="activity-card__goal">
                          <strong>Goal:</strong> {item.target_goal}
                        </div>

                        <div className="activity-card__current">
                          <span>From:</span> {item.current_position}
                        </div>

                        <div className="activity-card__footer">
                          <span className="category-tag">
                            <IconGraduationCap size={13} />
                            <span>{item.category_label}</span>
                          </span>

                          <div className="activity-card__action">
                            <span className="step-count">{item.steps_count} steps</span>
                            <span className="btn-inspect">
                              Inspect <IconArrowRight size={11} />
                            </span>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}