import { useState } from "react";
import "./QuoteForm.css";

function QuoteForm({ onQuoteAdded, onError }) {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim() || !message.trim()) {
			onError("Name and quote cannot be empty.");
			return;
		}

		setSubmitting(true);

		try {
			const formData = new FormData();
			formData.append("name", name.trim());
			formData.append("message", message.trim());

			const res = await fetch("/api/quote", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				throw new Error(`Failed to submit quote (${res.status})`);
			}

			const newQuote = await res.json();
			onQuoteAdded(newQuote);
			setName("");
			setMessage("");
		} catch (err) {
			onError(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
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
				<textarea
					id="input-message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="What did they say?"
					rows={3}
					required
				/>
				<button type="submit" disabled={submitting}>
					{submitting ? "Submitting..." : "Submit"}
				</button>
			</form>
		</section>
	);
}

export default QuoteForm;
