import "./QuoteCard.css";

function QuoteCard({ name, message, time }) {
	const date = new Date(time);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<article className="quote-card" aria-label={`Quote by ${name}`}>
			<blockquote className="quote-message">
				<p>{message}</p>
			</blockquote>
			<footer className="quote-footer">
				<cite className="quote-author">{name}</cite>
				<time className="quote-date" dateTime={time}>
					{formattedDate}
				</time>
			</footer>
		</article>
	);
}

export default QuoteCard;
