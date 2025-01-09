"use client";
import { RestaurantContext } from "@/lib/contexts/restaurant";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { slug } = useContext(RestaurantContext);

  useEffect(() => {
    router.push(`/restaurant/${slug}/settings/account`);
  }, [slug, router]);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
