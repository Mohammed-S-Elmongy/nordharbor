import { Suspense } from "react"; 
import Hero from "./_components/Hero";
import CategoryNavigation from "./_components/CategoryNavigation";
import FeaturedPhotos from "./_components/FeaturedPhotos";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <CategoryNavigation />
        <Suspense fallback={<p>Loading featured photos...</p>}>
          <FeaturedPhotos />
        </Suspense>
      </main>
    </>
  );
}
