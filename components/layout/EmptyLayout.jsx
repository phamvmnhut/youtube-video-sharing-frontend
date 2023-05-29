import { Footer, Header, Button } from "@components/common";

export default function EmptyLayout() {
  return (
    <section className="static bg-background text-white h-screen">
      <Header />
      <div className="xfit pt-4 my-20">
        <div className="flex items-center justify-center">
          <Button className="text-4xl border-4 px-20 py-4 rounded-full aniBtn font-bold">Not found</Button>
        </div>
      </div>
      <Footer />
    </section>
  )
}
