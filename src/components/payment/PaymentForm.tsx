
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff, CreditCard, Lock, Mail, User } from "lucide-react";
import { Link } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  const [showPassword, setShowPassword] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <User size={16} className="text-security-primary" />
                Nom complet
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Votre nom" 
                  {...field} 
                  className="bg-white focus-visible:ring-security-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <Mail size={16} className="text-security-primary" />
                Adresse e-mail
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="exemple@gmail.com" 
                  type="email" 
                  {...field} 
                  className="bg-white focus-visible:ring-security-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <Lock size={16} className="text-security-primary" />
                Mot de passe
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Minimum 8 caractères" 
                    {...field} 
                    className="bg-white focus-visible:ring-security-primary pr-10"
                  />
                </FormControl>
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-security-primary data-[state=checked]:border-security-primary"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-security-primary font-medium hover:underline">
                    Conditions Générales d'Utilisation
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-security-primary hover:bg-security-secondary mt-2 transition-all duration-300 ease-in-out"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              S'abonner maintenant
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
