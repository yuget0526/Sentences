export default function IpadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto aspect-[1449/1888.5] h-full pl-[1] relative">
      {/* <img
        src="/image/ipadmockup.svg"
        alt=""
        className="w-full h-full object-contain"
      /> */}
      <div
        className="absolute inset-0 flex items-center justify-center p-[19]"
        style={{ zIndex: 0 }}
      >
        <div className="w-full h-full rounded-md pl-[1]">{children}</div>
      </div>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-[url('/image/papernoise.webp')] bg-repeat opacity-[.16] pointer-events-none rounded-[6%]"
        style={{
          backgroundSize: "400px 400px",
          zIndex: 2,
        }}
      ></div>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-[url('/image/ipadmockup.svg')] pointer-events-none"
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}
