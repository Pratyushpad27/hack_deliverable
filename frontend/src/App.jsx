import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import "./App.css";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [period, setPeriod] = useState("all");

	const fetchQuotes = async () => {
		const res = await fetch(`/api/quotes?period=${period}`);
		const data = await res.json();
		setQuotes(data);
	};

	useEffect(() => {
		fetchQuotes();
	}, [period]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("message", message);

		const res = await fetch("/api/quote", {
			method: "POST",
			body: formData,
		});

		const newQuote = await res.json();
		setQuotes((prev) => [...prev, newQuote]);
		setName("");
		setMessage("");
	};

	return (
		<div className="app">
			<header className="header">
				<img src="/quotebook.svg" alt="Quotebook logo" className="logo" />
				<h1>Hack at UCI Tech Deliverable</h1>
			</header>

			<section className="form-section">
				<h2>Submit a Quote</h2>
				<form onSubmit={handleSubmit} className="quote-form">
					<label htmlFor="input-name">Name</label>
					<input
						type="text"
						id="input-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Who said it?"
						required
					/>
					<label htmlFor="input-message">Quote</label>
					<input
						type="text"
						id="input-message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="What did they say?"
						required
					/>
					<button type="submit">Submit</button>
				</form>
			</section>

			<section className="quotes-section">
				<div className="quotes-header">
					<h2>Previous Quotes</h2>
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

				<div className="quotes-list">
					{quotes.length === 0 ? (
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
		</div>
	);
}

export default App;
