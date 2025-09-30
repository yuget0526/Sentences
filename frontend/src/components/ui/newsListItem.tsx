import { useRouter } from "next/navigation";

export function NewsListItem(props: {
  title: string;
  url: string;
  summary?: string;
  lastupdate?: string;
}) {
  const { title, url, summary, lastupdate } = props;
  const router = useRouter();
  const handleClick = () => {
    router.push(`/news?url=${encodeURIComponent(url)}`);
  };
  return (
    <li className="mb-2">
      <button
        type="button"
        className="block w-full text-left p-2 rounded-xl hover:bg-secondary-foreground transition"
        onClick={handleClick}
      >
        <div className="font-bold text-on-newspaper mb-1">{title}</div>
        {summary && <div className="text-sm text-gray-600 mb-1">{summary}</div>}
        {lastupdate && (
          <div className="text-xs text-gray-400">{lastupdate}</div>
        )}
      </button>
    </li>
  );
}
