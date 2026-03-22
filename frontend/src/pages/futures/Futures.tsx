import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Trades from "./tabs/Trades";
import Summary from "./tabs/Summary";

const Futures = () => {
  return (
    <section>
      <div className="my-4 text-base">
        <Tabs defaultValue="summary" >
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="w-full"><Summary /></TabsContent>
          <TabsContent value="trades" className="w-full!">
            <Trades />
          </TabsContent>
        </Tabs>

      </div>

    </section>
  );
};

export default Futures;
