import "./QuoteCard.css";

function QuoteCard({ name, message, time }) {
	const date = new Date(time);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="quote-card">
			<p className="quote-message">"{message}"</p>
			<p className="quote-author">— {name}</p>
			<p className="quote-date">{formattedDate}</p>
		</div>
	);
}

export default QuoteCard;
