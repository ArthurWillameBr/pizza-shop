import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";



export function OrderTable() {
    return(
        <TableRow>
                <TableCell>
                  <Button variant="outline" size="xs">
                    <Search className="size-3" />
                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-sm font-medium">
                  2349124dsafahbkf
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Há 15 minutos
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-slate-400" />
                    <span className="text-medium text-muted-foreground ">
                      Pendente
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">Arthur Willame</TableCell>
                <TableCell className="font-medium">
                    R$ 120,00
                </TableCell>
                <TableCell>
                <Button variant="outline" size="xs">
                        <ArrowRight className="size-3 mr-2" />
                        Aprovar
                    </Button>
                </TableCell>
                <TableCell>
                    <Button variant="ghost" size="xs">
                        <X className="size-3 mr-2" />
                        Cancelar
                    </Button>
                </TableCell>
              </TableRow>
    )
}