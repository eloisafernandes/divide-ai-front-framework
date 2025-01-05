import { Copy } from "lucide-react"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Check } from 'lucide-react';

interface DialogCodeProps {
  isOpen: boolean;
  groupCode: string;
  onClose: () => void;
}

export function DialogCode({ isOpen, groupCode, onClose }: DialogCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(groupCode);
    setCopied(!copied);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Código do grupo</DialogTitle>
        <DialogDescription>
          Compartilhe o código abaixo para convidar seus amigos.
        </DialogDescription>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input id="groupCode" defaultValue={groupCode} readOnly />
          </div>
          <Button
            variant="divideDark"
            type="button"
            size="sm"
            className="px-3"
            onClick={handleCopy}
          >
            <span className="sr-only">Copiar</span>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

