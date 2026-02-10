export default function EdgeVignette() {
  const size = 200;
  const bg = "#FCFCFD";

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: size,
          background: `linear-gradient(to bottom, ${bg}, transparent)`,
        }}
      />
      {/* Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: size,
          background: `linear-gradient(to top, ${bg}, transparent)`,
        }}
      />
      {/* Left */}
      <div
        className="absolute top-0 bottom-0 left-0"
        style={{
          width: size,
          background: `linear-gradient(to right, ${bg}, transparent)`,
        }}
      />
      {/* Right */}
      <div
        className="absolute top-0 bottom-0 right-0"
        style={{
          width: size,
          background: `linear-gradient(to left, ${bg}, transparent)`,
        }}
      />
    </div>
  );
}
