export default function ConversationView({ transcript }) {
  return (
    <div className="space-y-3 text-lg" dir="ltr">
      {transcript.map((msg, index) => (<p key={index}>{msg.line}</p>))}
    </div>
  );
}