export function InputUrl(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { value, onChange, placeholder, className, ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full border border-gray-300 rounded-full p-2 focus:outline-none placeholder-secondary-background text-on-newspaper pl-4 pr-4 focus:ring-2 focus:ring-on-surface ${
        className ?? ""
      } truncate`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    />
  );
}
