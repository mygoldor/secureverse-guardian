
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Calendar, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z.string().min(16, { message: "Valid card number is required" }).max(19),
  expiryDate: z.string().min(5, { message: "Valid expiry date is required (MM/YY)" }),
  cvv: z.string().min(3, { message: "CVV is required" }).max(4),
});

const Payment = () => {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'mollie'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show success message
      toast({
        title: "Payment Successful",
        description: `Your ${plan} subscription has been activated.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Guardia Plan</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className={`border-2 ${plan === 'monthly' ? 'border-security-primary' : 'border-gray-200'}`}>
            <CardHeader>
              <CardTitle>Monthly Plan</CardTitle>
              <CardDescription>Perfect for short-term protection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">€9.99<span className="text-base font-normal text-gray-500">/month</span></p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Full Security Protection
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Privacy Controls
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Performance Optimization
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Monthly Billing
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setPlan('monthly')} 
                variant={plan === 'monthly' ? "default" : "outline"}
                className="w-full"
              >
                Select Monthly
              </Button>
            </CardFooter>
          </Card>

          <Card className={`border-2 ${plan === 'yearly' ? 'border-security-primary' : 'border-gray-200'}`}>
            <CardHeader>
              <CardTitle>Yearly Plan</CardTitle>
              <CardDescription>Save over 16% with annual billing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">€99.99<span className="text-base font-normal text-gray-500">/year</span></p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Full Security Protection
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Privacy Controls
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Performance Optimization
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                  Save over €19.89 per year
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setPlan('yearly')} 
                variant={plan === 'yearly' ? "default" : "outline"}
                className="w-full"
              >
                Select Yearly
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="mollie">Mollie</TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="mt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
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
                          <FormLabel>Card Number</FormLabel>
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
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="MM/YY" {...field} />
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
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="submit" className="w-full" disabled={isProcessing}>
                          {isProcessing ? "Processing..." : `Pay €${plan === 'monthly' ? '9.99' : '99.99'}`}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Your Subscription</AlertDialogTitle>
                          <AlertDialogDescription>
                            You are about to subscribe to the Guardia {plan} plan for €{plan === 'monthly' ? '9.99/month' : '99.99/year'}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onSubmit(form.getValues())}>
                            Confirm Payment
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="paypal" className="mt-4">
                <div className="text-center">
                  <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <Button className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pay with PayPal
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="mollie" className="mt-4">
                <div className="text-center">
                  <p className="mb-4">Choose from multiple payment methods through Mollie.</p>
                  <Button className="w-full">
                    Continue with Mollie
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="font-semibold mb-2">Privacy Notice (GDPR Compliant)</h3>
          <p className="text-sm text-gray-600">
            Your payment information is securely processed and we do not store your full card details on our servers. 
            By proceeding with the payment, you agree to our Terms of Service and Privacy Policy. 
            You can cancel your subscription at any time from your account settings.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Payment;
