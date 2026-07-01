import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import {
  NoApplicationsEmpty,
  NoInterviewsEmpty,
  NoCompaniesEmpty,
  NoResumesEmpty,
  NoCoverLettersEmpty,
  NoAnalyticsEmpty,
  NoCodingEmpty,
  NoSearchResultsEmpty,
} from "@/components/app/empty-states";

export const Route = createFileRoute("/empty-states")({
  component: EmptyStatesGallery,
  head: () => ({
    meta: [
      { title: "Empty States — DevTrack" },
      {
        name: "description",
        content:
          "Custom developer-themed empty states for every DevTrack surface — each with an animated illustration, helpful copy, and clear next actions.",
      },
    ],
  }),
});

const sections = [
  { id: "applications", label: "No Applications", node: <NoApplicationsEmpty /> },
  { id: "interviews", label: "No Interviews", node: <NoInterviewsEmpty /> },
  { id: "companies", label: "No Companies", node: <NoCompaniesEmpty /> },
  { id: "resumes", label: "No Resumes", node: <NoResumesEmpty /> },
  { id: "cover-letters", label: "No Cover Letters", node: <NoCoverLettersEmpty /> },
  { id: "analytics", label: "No Analytics", node: <NoAnalyticsEmpty /> },
  { id: "coding", label: "No Coding Problems", node: <NoCodingEmpty /> },
  { id: "search", label: "No Search Results", node: <NoSearchResultsEmpty query="staff engineer" /> },
];

function EmptyStatesGallery() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <AppSidebar active="Design" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-8 py-10">
            <header className="mb-10">
              <div className="text-xs font-medium uppercase tracking-wider text-brand">
                Design system
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Empty states
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Every zero-data surface in DevTrack gets a custom developer-themed
                illustration, one clear primary action, and a low-commitment
                secondary path. No stock art, no dead ends.
              </p>
            </header>

            <div className="grid gap-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-20">
                  <div className="mb-4 flex items-baseline justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </h2>
                    <span className="font-mono text-[11px] text-muted-foreground/70">
                      &lt;{s.id.replace(/-/g, "")}/&gt;
                    </span>
                  </div>
                  {s.node}
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
