import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const singUpForm = z.object({
  email: z.string().email(),
  restaurantName: z.string().min(3),
  managerName: z.string().min(3),
  phone: z.string(),
});

type SingUpForm = z.infer<typeof singUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SingUpForm>({});

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSingUp(data: SingUpForm) {
    try {
      await registerRestaurantFn({
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
        restaurantName: data.restaurantName,
      });
      toast.success("Restaurante cadastrado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante.");
    }
  }

  return (
    <div>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6 ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSingUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com os nossos{" "}
              <a className="underline underline-offset-4" href="">
                termos de política{" "}
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                termos de privacidade{" "}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
