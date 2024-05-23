import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const singInForm = z.object({
  email: z.string().email(),
});

type SingInForm = z.infer<typeof singInForm>;

export function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SingInForm>({});

  async function handleSingIn(data: SingInForm) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Enviamos um link de autenticação para seu e-mail.", {
        action: {
            label: "Reenviar",
            onClick: () => handleSingIn(data)
        }
    })
  }

  return (
    <div>
      <Helmet title="login" />
      <div className="p-8"> 
      <Button variant="outline" asChild className="absolute right-8 top-8">
            <Link to="/sing-up">
                Novo estabelecimento
            </Link>
      </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6 ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSingIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
