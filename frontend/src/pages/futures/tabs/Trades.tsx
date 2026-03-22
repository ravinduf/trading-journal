import { Button } from "@/components/ui/button"
import { useState } from "react";

const Trades = () => {
  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  
  return (
    <section className="my-4">
      <div className="w-full flex justify-end">
        <Button>+ Add Trade</Button>
      </div>
      Trades
    </section>
  )
}

export default Trades