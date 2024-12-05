export default function RestaurantAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: "linear-gradient(to bottom, rgb(35 37 41 / 53%), rgb(0 0 0)), url('/images/restaurant-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>
            {children}
        </div>
    );
}