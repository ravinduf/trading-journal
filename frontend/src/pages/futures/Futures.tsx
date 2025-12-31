import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Trades from "./tabs/Trades";
import Summary from "./tabs/Summary";

const Futures = () => {
  return (
    <section>
      <div className="my-4 text-base">
        <Tabs defaultValue="summary" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
          </TabsList>
          <TabsContent value="summary"><Summary /></TabsContent>
          <TabsContent value="trades">
            <Trades />
          </TabsContent>
        </Tabs>

      </div>

    </section>
  );
};

export default Futures;
