import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import HoldingsList from "./components/HoldingsList";
import PortfolioAnalytics from "./components/PortfolioAnalytics";
import PortfolioSummaryCard from "./components/PortfolioSummaryCard";
import RecentActivity from "./components/RecentActivity";

const Spot = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-28 font-[Inter,system-ui,sans-serif] text-[#e3e3ff] md:pb-8">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PortfolioSummaryCard />
        <PortfolioAnalytics />
      </section>

      <HoldingsList />
      <RecentActivity />

      <Button
        size="icon-lg"
        className="fixed right-6 bottom-24 z-40 size-14 rounded-full bg-[#c5c7c8] text-[#3e4142] shadow-2xl hover:bg-[#b7b9ba] md:hidden"
        aria-label="Create new holding"
      >
        <Plus className="size-7" />
      </Button>
    </div>
  );
};

export default Spot;
