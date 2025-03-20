
import React from 'react';
import { ArrowLeft, Smartphone, Laptop, Apple, Chrome, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import Footer from '@/components/Footer';

const InstallationGuide = () => {
  const navigate = useNavigate();
  const { isMobile, isIOS, isAndroid, isSafari, isChrome, isFirefox, isEdge } = useDeviceDetection();
  
  // Détecter la plateforme actuelle pour sélectionner l'onglet par défaut
  const getDefaultTab = () => {
    if (isIOS) return 'ios';
    if (isAndroid) return 'android';
    if (window.navigator.platform.toLowerCase().includes('mac')) return 'macos';
    return 'windows';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-xl font-bold">Guide d'installation</h1>
          <div className="w-[70px]"></div> {/* Spacer pour centrer le titre */}
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Installez Guardia sur vos appareils</h2>
            <p className="mb-6 text-gray-700">
              Guardia Security peut être installée sur vos appareils comme une application native, vous permettant d'y accéder rapidement depuis votre écran d'accueil, même lorsque vous êtes hors ligne.
            </p>
            
            <Tabs defaultValue={getDefaultTab()} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="android" className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Android
                </TabsTrigger>
                <TabsTrigger value="ios" className="flex items-center">
                  <Apple className="h-4 w-4 mr-2" />
                  iOS
                </TabsTrigger>
                <TabsTrigger value="windows" className="flex items-center">
                  <Laptop className="h-4 w-4 mr-2" />
                  Windows
                </TabsTrigger>
                <TabsTrigger value="macos" className="flex items-center">
                  <Apple className="h-4 w-4 mr-2" />
                  macOS
                </TabsTrigger>
              </TabsList>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <TabsContent value="android">
                  <h3 className="text-xl font-semibold mb-4">Installation sur Android</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Chrome</CardTitle>
                        <CardDescription>Méthode recommandée pour tous les appareils Android</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5">
                          <li>Ouvrez Guardia dans Chrome</li>
                          <li>Touchez l'icône du menu (⋮) en haut à droite</li>
                          <li>Sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil"</li>
                          <li>Suivez les instructions à l'écran pour terminer l'installation</li>
                        </ol>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Samsung Internet</CardTitle>
                        <CardDescription>Pour les utilisateurs de Samsung Galaxy</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5">
                          <li>Ouvrez Guardia dans Samsung Internet</li>
                          <li>Touchez l'icône du menu (≡) en bas à droite</li>
                          <li>Sélectionnez "Ajouter à la page d'accueil"</li>
                          <li>Appuyez sur "Ajouter" pour confirmer</li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="ios">
                  <h3 className="text-xl font-semibold mb-4">Installation sur iOS</h3>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Safari</CardTitle>
                      <CardDescription>Safari est nécessaire pour installer des PWA sur iOS</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3 list-decimal pl-5">
                        <li>Ouvrez Guardia dans Safari (important: cela ne fonctionne pas dans Chrome ou autres navigateurs sur iOS)</li>
                        <li>Touchez l'icône de partage (􀈂) en bas de l'écran</li>
                        <li>Faites défiler et touchez "Sur l'écran d'accueil"</li>
                        <li>Touchez "Ajouter" en haut à droite</li>
                      </ol>
                      
                      <div className="mt-4 bg-amber-50 p-3 rounded text-amber-800 text-sm">
                        <p><strong>Note :</strong> Sur iOS 17 et supérieur, l'option peut se trouver sous "Ajouter un signet" ou dans un menu supplémentaire.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="windows">
                  <h3 className="text-xl font-semibold mb-4">Installation sur Windows</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Chrome / Edge</CardTitle>
                        <CardDescription>Installation comme application PWA</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5">
                          <li>Ouvrez Guardia dans Chrome ou Edge</li>
                          <li>Cliquez sur l'icône d'installation (⊕) dans la barre d'adresse ou le menu (⋮)</li>
                          <li>Sélectionnez "Installer Guardia" ou "Installer cette application"</li>
                          <li>Cliquez sur "Installer" pour confirmer</li>
                        </ol>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Application native</CardTitle>
                        <CardDescription>Installation complète (recommandée)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5">
                          <li>Téléchargez l'installateur Windows (.exe)</li>
                          <li>Exécutez le fichier téléchargé</li>
                          <li>Si un avertissement de sécurité apparaît, cliquez sur "Plus d'informations" puis "Exécuter quand même"</li>
                          <li>Suivez les instructions de l'assistant d'installation</li>
                        </ol>
                        
                        <Button 
                          className="mt-4 w-full"
                          onClick={() => window.open('/downloads/Guardia-Security-1.0.0-win.exe', '_blank')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger l'installateur Windows
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="macos">
                  <h3 className="text-xl font-semibold mb-4">Installation sur macOS</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Safari / Chrome</CardTitle>
                        <CardDescription>Installation comme application PWA</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5">
                          <li>Ouvrez Guardia dans Safari ou Chrome</li>
                          <li>Dans Safari: Menu "Fichier" → "Ajouter au Dock"</li>
                          <li>Dans Chrome: Menu (⋮) → "Installer Guardia..."</li>
                          <li>Confirmez l'installation</li>
                        </ol>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Application native</CardTitle>
                        <CardDescription>Installation complète (recommandée)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3 list-decimal pl-5">
                          <li>Téléchargez l'installateur macOS (.dmg)</li>
                          <li>Ouvrez le fichier .dmg téléchargé</li>
                          <li>Faites glisser l'icône Guardia dans le dossier Applications</li>
                          <li>Si un avertissement apparaît, ouvrez Préférences Système → Sécurité → "Ouvrir quand même"</li>
                        </ol>
                        
                        <Button 
                          className="mt-4 w-full"
                          onClick={() => window.open('/downloads/Guardia-Security-1.0.0-mac.dmg', '_blank')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger l'installateur macOS
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Avantages de l'installation</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Accès rapide</h3>
                <p className="text-sm text-green-700">Accédez à Guardia directement depuis votre écran d'accueil, sans ouvrir de navigateur.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Fonctionnement hors ligne</h3>
                <p className="text-sm text-blue-700">Certaines fonctionnalités restent disponibles même sans connexion internet.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Notifications</h3>
                <p className="text-sm text-purple-700">Recevez des alertes de sécurité importantes même lorsque l'application n'est pas ouverte.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire?</h2>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="mb-4">Si vous rencontrez des difficultés à installer Guardia sur votre appareil, notre équipe de support est là pour vous aider.</p>
              
              <Button onClick={() => navigate('/support')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Contacter le support
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InstallationGuide;
