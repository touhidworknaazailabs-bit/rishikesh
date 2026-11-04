import Link from "next/link";
import { BookStayButton } from "@/components/CtaButtons";

export default function NotFound() {
  return (
    <div className="min-h-[80svh] flex items-center justify-center pt-24">
      <div className="container-editorial text-center max-w-lg">
        <p className="font-display text-8xl text-terracotta">404</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl text-charcoal">Page Not Found</h1>
        <p className="mt-4 text-charcoal/70 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or may have moved. Here are a
          few places to start instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-charcoal px-6 py-3 text-sm tracking-wide text-charcoal hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Back to Home
          </Link>
          <BookStayButton size="md" />
        </div>
      </div>
    </div>
  );
}
