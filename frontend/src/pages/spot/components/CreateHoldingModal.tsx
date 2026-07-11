import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type CreateHoldingFormData = {
  symbol: string;
  name: string;
  avgPrice: string;
  amount: string;
};

type CreateHoldingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const fieldInputClass =
  "h-auto rounded-lg border-white/10 bg-[#040510] px-4 py-3 text-sm text-white shadow-none placeholder:text-[#a4a8d4] focus-visible:border-[#c5c7c8]/50 focus-visible:ring-0";

const fieldLabelClass =
  "ml-1 text-[10px] font-bold uppercase tracking-widest text-white";

function CreateHoldingModal({ open, onOpenChange }: CreateHoldingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateHoldingFormData>({
    defaultValues: {
      symbol: "",
      name: "",
      avgPrice: "",
      amount: "",
    },
  });

  const closeModal = () => {
    onOpenChange(false);
    reset();
  };

  const onSubmit = (data: CreateHoldingFormData) => {
    toast.success(`Added ${data.symbol} holding (dummy data)`);
    closeModal();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) reset();
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/60 backdrop-blur-[12px]"
        className={cn(
          "gap-0 overflow-hidden rounded-xl border-white/5 bg-[#0b0d19] p-0 shadow-2xl sm:max-w-md"
        )}
      >
        <DialogHeader className="flex-row items-center justify-between space-y-0 border-b border-white/5 px-6 py-4">
          <DialogTitle className="font-orbitron text-lg font-medium text-white">
            Create New Holding
          </DialogTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-[#a4a8d4] hover:bg-white/5 hover:text-white"
            onClick={closeModal}
            aria-label="Close"
          >
            <X className="size-5" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="symbol" className={fieldLabelClass}>
              Symbol
            </Label>
            <Input
              id="symbol"
              placeholder="e.g. BTC"
              className={fieldInputClass}
              {...register("symbol", { required: "Symbol is required" })}
            />
            {errors.symbol && (
              <p className="text-xs text-[#ec7c8a]">{errors.symbol.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name" className={fieldLabelClass}>
              Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Bitcoin"
              className={fieldInputClass}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-[#ec7c8a]">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="avgPrice" className={fieldLabelClass}>
                Avg. Price
              </Label>
              <Input
                id="avgPrice"
                type="number"
                step="any"
                min="0"
                placeholder="42000"
                className={cn(fieldInputClass, "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none")}
                {...register("avgPrice", { required: "Avg. price is required" })}
              />
              {errors.avgPrice && (
                <p className="text-xs text-[#ec7c8a]">{errors.avgPrice.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="amount" className={fieldLabelClass}>
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="any"
                min="0"
                placeholder="0.5"
                className={cn(fieldInputClass, "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none")}
                {...register("amount", { required: "Amount is required" })}
              />
              {errors.amount && (
                <p className="text-xs text-[#ec7c8a]">{errors.amount.message}</p>
              )}
            </div>
          </div>
          </div>

          <DialogFooter className="border-t border-white/5 bg-black/20 px-6 py-4 sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              className="rounded-lg bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 hover:text-white"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-[#c5c7c8] px-6 py-2 text-sm font-bold text-[#3e4142] shadow-lg shadow-white/10 hover:bg-[#b7b9ba] active:scale-95"
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateHoldingModal;
