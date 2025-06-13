
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, Euro } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";

const Schedule = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    preferredTime: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scheduling consultation:', formData);
    toast.success('Consulta agendada com sucesso! Entraremos em contacto em breve.');
    navigate('/');
  };

  const consultationTypes = [
    {
      value: 'financial_planning',
      label: t('schedule.consultation.planning'),
      description: 'Organização de finanças pessoais e familiares',
      duration: '60 min',
      price: '€150'
    },
    {
      value: 'debt_management',
      label: t('schedule.consultation.debt'),
      description: 'Estratégias para quitar dívidas e reorganizar finanças',
      duration: '45 min',
      price: '€120'
    },
    {
      value: 'investment_guidance',
      label: t('schedule.consultation.investment'),
      description: 'Primeiros passos e estratégias de investimento',
      duration: '60 min',
      price: '€180'
    },
    {
      value: 'business_finance',
      label: t('schedule.consultation.business'),
      description: 'Gestão financeira empresarial e fluxo de caixa',
      duration: '90 min',
      price: '€250'
    }
  ];

  const timeSlots = [
    'Manhã (9h às 12h)',
    'Tarde (13h às 17h)',
    'Noite (18h às 20h)'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('learning.back')}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('schedule.title')}</h1>
              <p className="text-muted-foreground">{t('schedule.subtitle')}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {t('schedule.form.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('schedule.form.name')}</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('schedule.form.email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">{t('schedule.form.phone')}</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+351 912 345 678"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>{t('schedule.form.type')}</Label>
                      <RadioGroup 
                        value={formData.consultationType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}
                        className="mt-2"
                      >
                        {consultationTypes.map((type) => (
                          <div key={type.value} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-accent">
                            <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={type.value} className="cursor-pointer">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold">{type.label}</span>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{type.duration}</span>
                                    <span className="font-semibold text-primary flex items-center gap-1">
                                      <Euro className="h-3 w-3" />
                                      {type.price}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>{t('schedule.form.time')}</Label>
                      <RadioGroup 
                        value={formData.preferredTime}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}
                        className="mt-2"
                      >
                        {timeSlots.map((time) => (
                          <div key={time} className="flex items-center space-x-2">
                            <RadioGroupItem value={time} id={time} />
                            <Label htmlFor={time} className="cursor-pointer">{time}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="message">{t('schedule.form.message')}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Conte-nos um pouco sobre a sua situação ou dúvidas específicas..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                    >
                      {t('schedule.form.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Nossos Especialistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Consultores Certificados</h3>
                    <p className="text-sm text-muted-foreground">CFP®, CGA e especialistas em finanças</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Atendimento em até 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Consulta online ou presencial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>Relatório personalizado incluído</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-primary">{t('schedule.pricing.from')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Como Funciona</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <h4 className="font-semibold">Agendamento</h4>
                        <p className="text-slate-600">Preencha o formulário e aguarde nosso contato</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h4 className="font-semibold">Consulta</h4>
                        <p className="text-slate-600">Sessão personalizada com nosso especialista</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <h4 className="font-semibold">Plano de Ação</h4>
                        <p className="text-slate-600">Receba um plano detalhado e acompanhamento</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
