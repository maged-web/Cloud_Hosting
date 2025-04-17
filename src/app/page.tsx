import Hero from "./components/home/Hero";
import WebHostingPlan from "./components/home/WebHostingPlan";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <h2 className='text-center mt-10 text-3xl font-bold'>Choose Your Web Hosting Plan</h2>
      <div className="container mx-auto flex items-center justify-center flex-wrap my-7 md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  )
}
