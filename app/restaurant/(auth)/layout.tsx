export default function RestaurantAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen max-h-screen box-border flow-root overflow-y-auto"
      style={{
        background:
          "linear-gradient(to bottom, rgb(35 37 41 / 53%), rgb(0 0 0)), url('/images/restaurant-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-center items-center p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
