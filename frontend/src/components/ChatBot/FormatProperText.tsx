import { formatAIText } from "./aiTextFormatter";

const FormatProperText = ({ msg, textColor }: { msg: string; textColor?: string }) => {
    
  const formattedBlocks = formatAIText(msg);

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, i) =>
      urlRegex.test(part) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline break-all"
        >
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="space-y-2">
      {formattedBlocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3 key={`heading-${i}`} className="text-cyan-400 font-semibold">
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={`para-${i}`}
              className={`${textColor} whitespace-pre-wrap min-h-[1rem]`}
            >
              {renderTextWithLinks(block.text)}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`list-${i}`}
              className={`${textColor} list-disc ml-5 space-y-1`}
            >
              {block.items.map((item, idx) => (
                <li key={`item-${i}-${idx}`}>{renderTextWithLinks(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "task") {
          return (
            <div
              key={`task-${i}`}
              className="border border-cyan-500/20 rounded-xl p-3 bg-white/5"
            >
              <h4 className="font-semibold text-cyan-300 mb-2">
                {block.title}
              </h4>

              {block.fields.map((f, idx) => (
                <p key={`field-${i}-${idx}`} className={`text-sm ${textColor}`}>
                  <span className="font-medium">{f.label}:</span>{" "}
                  {renderTextWithLinks(f.value)}
                </p>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default FormatProperText;