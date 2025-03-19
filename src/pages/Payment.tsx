
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Calendar, DollarSign, Lock, Mail, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { sanitizePersonalData } from '@/utils/gdprCompliance';

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  cardName: z.string().min(2, { message: "Nom sur la carte requis" }),
  cardNumber: z.string().min(16, { message: "Numéro de carte valide requis" }).max(19),
  expiryDate: z.string().min(5, { message: "Date d'expiration valide requise (MM/AA)" }),
  cvv: z.string().min(3, { message: "CVV requis" }).max(4),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
});

const Payment = () => {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'mollie'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      termsAccepted: false,
    },
  });

  const checkEmailAvailability = (email: string) => {
    // Simulate API call to check if email is already in use
    // In a real app, this would be an actual API call
    const isAvailable = email !== "test@example.com"; // Example email that's "already in use"
    setIsEmailAvailable(isAvailable);
    
    if (!isAvailable) {
      form.setError("email", { 
        type: "manual", 
        message: "Cette adresse email est déjà utilisée" 
      });
    } else {
      form.clearErrors("email");
    }
    
    return isAvailable;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!checkEmailAvailability(values.email)) {
      return;
    }
    
    setIsProcessing(true);
    
    // Sanitize data according to GDPR
    const sanitizedData = sanitizePersonalData(values);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show success message
      toast({
        title: "Paiement réussi",
        description: `Votre abonnement ${plan === 'monthly' ? 'mensuel' : 'annuel'} a été activé.`,
      });
    }, 2000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("email", e.target.value);
    if (e.target.value.includes('@')) {
      checkEmailAvailability(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-security-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">Protégez vos appareils dès aujourd'hui</h1>
        <p className="text-center text-gray-500 mb-8">Abonnez-vous à Guardia pour une sécurité optimale de vos données</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className={`border-2 ${plan === 'monthly' ? 'border-security-primary' : 'border-gray-200'}`}>
            <CardHeader>
              <CardTitle>Mensuel</CardTitle>
              <CardDescription>Protection flexible, engagement minimum</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">9,99€<span className="text-base font-normal text-gray-500">/mois</span></p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Sécurité 24/7 avec surveillance en temps réel
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Pentest et correction automatique des failles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Sauvegarde et récupération des fichiers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Support client prioritaire
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setPlan('monthly')} 
                variant={plan === 'monthly' ? "default" : "outline"}
                className="w-full"
              >
                Choisir le mensuel
              </Button>
            </CardFooter>
          </Card>

          <Card className={`border-2 ${plan === 'yearly' ? 'border-security-primary' : 'border-gray-200'}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Annuel</CardTitle>
                  <CardDescription>Économisez plus de 16% avec 2 mois offerts</CardDescription>
                </div>
                <div className="bg-security-primary text-white px-2 py-1 rounded-full text-sm font-medium">
                  Meilleure offre
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">99,99€<span className="text-base font-normal text-gray-500">/an</span></p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Sécurité 24/7 avec surveillance en temps réel
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Pentest et correction automatique des failles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Sauvegarde et récupération des fichiers en cas d'attaque
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Support client prioritaire + 2 mois offerts
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setPlan('yearly')} 
                variant={plan === 'yearly' ? "default" : "outline"}
                className="w-full"
              >
                Choisir l'annuel
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Créez votre compte et payez en toute sécurité</CardTitle>
            <CardDescription>Vos données sont protégées avec un chiffrement de niveau bancaire</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informations personnelles</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="email@exemple.com" 
                              {...field} 
                              onChange={handleEmailChange}
                              className={!isEmailAvailable ? "border-red-500" : ""}
                            />
                            <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
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
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Mode de paiement</h3>
                  
                  <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Carte bancaire</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="mollie">Mollie (Bancontact)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="mt-4 space-y-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom sur la carte</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro de carte</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="4242 4242 4242 4242" {...field} />
                                <CreditCard className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date d'expiration</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="MM/AA" {...field} />
                                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="mt-4">
                      <div className="text-center py-6">
                        <p className="mb-4">Vous serez redirigé vers PayPal pour compléter votre paiement de manière sécurisée.</p>
                        <Button className="w-full">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Payer avec PayPal
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mollie" className="mt-4">
                      <div className="text-center py-6">
                        <p className="mb-4">Choisissez parmi plusieurs méthodes de paiement via Mollie, incluant Bancontact.</p>
                        <Button className="w-full">
                          Continuer avec Mollie (Bancontact)
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          J'accepte les <a href="#" className="text-security-primary hover:underline">Conditions Générales</a> et la <a href="#" className="text-security-primary hover:underline">Politique de Confidentialité</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? "Traitement en cours..." : `S'abonner et payer ${plan === 'monthly' ? '9,99€' : '99,99€'}`}
                      <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmez votre abonnement</AlertDialogTitle>
                      <AlertDialogDescription>
                        Vous êtes sur le point de vous abonner au plan Guardia {plan === 'monthly' ? 'mensuel à 9,99€/mois' : 'annuel à 99,99€/an (2 mois offerts)'}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onSubmit(form.getValues())}>
                        Confirmer le paiement
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <div className="flex items-start">
            <Shield className="text-security-primary mt-1 mr-3 h-5 w-5" />
            <div>
              <h3 className="font-semibold mb-2">Protection des données (RGPD)</h3>
              <p className="text-sm text-gray-600">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vos informations de paiement sont 
                traitées de manière sécurisée et nous ne stockons pas les détails complets de votre carte sur nos serveurs. 
                En procédant au paiement, vous acceptez nos Conditions Générales et notre Politique de Confidentialité. 
                Vous pouvez annuler votre abonnement à tout moment depuis vos paramètres.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
