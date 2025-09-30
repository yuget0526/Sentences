export default function Header() {
  return (
    <header
      className="text-center p-3 fixed top-0 left-0 right-0 h-fit"
      style={{ zIndex: "var(--zIndex-content)" }}
    >
      <h1 className="font-display text-6xl font-bold mb-4">Sentences</h1>
      <p className="text-secondary-foreground text-lg font-klee drop-shadow-background">
        英語ニュースから始める、楽しい英語学習体験を。
      </p>
    </header>
  );
}
