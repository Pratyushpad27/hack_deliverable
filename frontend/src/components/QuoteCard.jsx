import "./QuoteCard.css";

function QuoteCard({ name, message, time }) {
	const date = new Date(time);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<article className="quote-card">
			<p className="quote-message">{message}</p>
			<div className="quote-footer">
				<span className="quote-author">— {name}</span>
				<time className="quote-date" dateTime={time}>
					{formattedDate}
				</time>
			</div>
		</article>
	);
}

export default QuoteCard;
