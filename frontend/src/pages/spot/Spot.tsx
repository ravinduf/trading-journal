import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateHoldingModal from "./components/CreateHoldingModal";
import HoldingsList from "./components/HoldingsList";
import PortfolioAnalytics from "./components/PortfolioAnalytics";
import PortfolioSummaryCard from "./components/PortfolioSummaryCard";
import RecentActivity from "./components/RecentActivity";

const Spot = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-10xl space-y-8 pb-28 font-[Inter,system-ui,sans-serif] text-[#e3e3ff] md:pb-8">
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PortfolioSummaryCard />
          <PortfolioAnalytics />
        </section>

        <HoldingsList onCreateClick={() => setCreateModalOpen(true)} />
        <RecentActivity />

        <Button
          type="button"
          size="icon-lg"
          onClick={() => setCreateModalOpen(true)}
          className="fixed right-6 bottom-24 z-40 size-14 rounded-full shadow-2xl  md:hidden"
          aria-label="Create new holding"
        >
          <Plus className="size-7" />
        </Button>
      </div>

      <CreateHoldingModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </>
  );
};

export default Spot;
