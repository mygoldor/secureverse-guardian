import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit comporter au moins 8 caractères.",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter les Conditions Générales",
  }),
});

interface PaymentFormProps {
  isProcessing: boolean;
  onSubmit: (values: FormValues) => void;
}

export type FormValues = z.infer<typeof formSchema>;

const PaymentForm: React.FC<PaymentFormProps> = ({ isProcessing, onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nom complet</Label>
        <Input id="name" placeholder="Votre nom" type="text" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input id="email" placeholder="exemple@gmail.com" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>
      
      <div className="flex items-start space-x-2 mt-4">
        <Checkbox
          id="terms"
          {...form.register("terms", { 
            required: true 
          })}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            J'accepte les 
            <Link to="/terms" className="ml-1 text-security-primary hover:underline">
              Conditions Générales d'Utilisation
            </Link>
          </label>
          {form.formState.errors.terms && (
            <p className="text-sm text-red-500">
              Vous devez accepter les Conditions Générales
            </p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-security-primary hover:bg-security-secondary"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          "S'abonner maintenant"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
