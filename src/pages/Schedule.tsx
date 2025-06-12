
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const Schedule = () => {
  const navigate = useNavigate();
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
    // Here you would typically send the data to your backend
    console.log('Scheduling consultation:', formData);
    toast.success('Consulta agendada com sucesso! Entraremos em contato em breve.');
    navigate('/');
  };

  const consultationTypes = [
    {
      value: 'financial_planning',
      label: 'Planejamento Financeiro Pessoal',
      description: 'Organização de finanças pessoais e familiares',
      duration: '60 min'
    },
    {
      value: 'debt_management',
      label: 'Gestão de Dívidas',
      description: 'Estratégias para quitar dívidas e reorganizar finanças',
      duration: '45 min'
    },
    {
      value: 'investment_guidance',
      label: 'Orientação para Investimentos',
      description: 'Primeiros passos e estratégias de investimento',
      duration: '60 min'
    },
    {
      value: 'business_finance',
      label: 'Consultoria Empresarial',
      description: 'Gestão financeira empresarial e fluxo de caixa',
      duration: '90 min'
    }
  ];

  const timeSlots = [
    'Manhã (9h às 12h)',
    'Tarde (13h às 17h)',
    'Noite (18h às 20h)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Agendar Consulta</h1>
              <p className="text-slate-600">Fale com um especialista em finanças</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Dados para Agendamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
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
                      <Label htmlFor="phone">Telefone/WhatsApp</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Tipo de Consulta</Label>
                      <RadioGroup 
                        value={formData.consultationType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}
                        className="mt-2"
                      >
                        {consultationTypes.map((type) => (
                          <div key={type.value} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                            <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={type.value} className="cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">{type.label}</span>
                                  <span className="text-sm text-slate-500">{type.duration}</span>
                                </div>
                                <p className="text-sm text-slate-600">{type.description}</p>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Horário Preferido</Label>
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
                      <Label htmlFor="message">Mensagem (Opcional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Conte-nos um pouco sobre sua situação ou dúvidas específicas..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    >
                      Agendar Consulta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-none shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Nossos Especialistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">Consultores Certificados</h3>
                    <p className="text-sm text-slate-600">CFP®, CGA e especialistas em finanças</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>Atendimento em até 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>Consulta online ou presencial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>Relatório personalizado incluído</span>
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
