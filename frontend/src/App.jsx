import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import QuoteForm from "./components/QuoteForm";
import "./App.css";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [period, setPeriod] = useState("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	useEffect(() => {
		const fetchQuotes = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/quotes?period=${period}`);
				if (!res.ok) {
					throw new Error(`Failed to fetch quotes (${res.status})`);
				}
				const data = await res.json();
				setQuotes(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchQuotes();
	}, [period]);

	const handleQuoteAdded = (newQuote) => {
		setQuotes((prev) => [...prev, newQuote]);
		setSuccessMsg("Quote added successfully!");
		setTimeout(() => setSuccessMsg(null), 3000);
	};

	return (
		<div className="app">
			<header className="header">
				<img src="/quotebook.svg" alt="Quotebook logo" className="logo" />
				<h1>Hack at UCI Tech Deliverable</h1>
				<p className="header-subtitle">Share and browse memorable quotes</p>
			</header>

			{error && (
				<div className="error-banner" role="alert">
					<p>{error}</p>
					<button onClick={() => setError(null)} aria-label="Dismiss error">
						&times;
					</button>
				</div>
			)}

			{successMsg && (
				<div className="success-banner" role="status">
					{successMsg}
				</div>
			)}

			<QuoteForm onQuoteAdded={handleQuoteAdded} onError={setError} />

			<section className="quotes-section">
				<div className="quotes-header">
					<h2>
						Previous Quotes
						{!loading && quotes.length > 0 && (
							<span className="quote-count">{quotes.length}</span>
						)}
					</h2>
					<select
						value={period}
						onChange={(e) => setPeriod(e.target.value)}
						className="period-select"
						aria-label="Filter quotes by time period"
					>
						<option value="all">All Time</option>
						<option value="year">Past Year</option>
						<option value="month">Past Month</option>
						<option value="week">Past Week</option>
					</select>
				</div>

				<div className="quotes-list" aria-live="polite">
					{loading ? (
						<p className="loading-text">Loading quotes...</p>
					) : quotes.length === 0 ? (
						<p className="no-quotes">No quotes found for this time period.</p>
					) : (
						quotes.map((q, i) => (
							<QuoteCard
								key={`${q.time}-${i}`}
								name={q.name}
								message={q.message}
								time={q.time}
							/>
						))
					)}
				</div>
			</section>

			<footer className="app-footer">
				<p>Built for Hack at UCI</p>
			</footer>
		</div>
	);
}

export default App;
