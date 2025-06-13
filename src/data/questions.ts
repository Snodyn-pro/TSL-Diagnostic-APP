
export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  subtitle?: string;
  type: 'radio' | 'number' | 'text';
  options?: QuestionOption[];
  placeholder?: string;
  condition?: (answers: Record<string, string>) => boolean;
}

export const questionsData: Record<string, Question[]> = {
  individual: [
    {
      id: 'income',
      question: 'Qual é o seu rendimento mensal líquido?',
      subtitle: 'Considere todos os rendimentos após impostos',
      type: 'number',
      placeholder: 'Ex: 2500'
    },
    {
      id: 'fixed_expenses',
      question: 'Qual o valor das suas despesas fixas mensais?',
      subtitle: 'Renda, financiamentos, seguros, etc.',
      type: 'number',
      placeholder: 'Ex: 1200'
    },
    {
      id: 'variable_expenses',
      question: 'Quanto gasta em média com despesas variáveis?',
      subtitle: 'Alimentação, transporte, lazer, etc.',
      type: 'number',
      placeholder: 'Ex: 800'
    },
    {
      id: 'debts',
      question: 'Possui dívidas atualmente?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Não tenho dívidas' },
        { value: 'low', label: 'Poucas dívidas (até 30% do rendimento)' },
        { value: 'medium', label: 'Dívidas moderadas (30-50% do rendimento)' },
        { value: 'high', label: 'Muitas dívidas (mais de 50% do rendimento)' }
      ]
    },
    {
      id: 'debt_type',
      question: 'Qual o tipo principal das suas dívidas?',
      type: 'radio',
      options: [
        { value: 'credit_card', label: 'Cartão de crédito' },
        { value: 'personal_loan', label: 'Empréstimo pessoal' },
        { value: 'financing', label: 'Financiamento (casa/carro)' },
        { value: 'overdraft', label: 'Descoberto bancário' },
        { value: 'other', label: 'Outros' }
      ],
      condition: (answers) => answers.debts !== 'none'
    },
    {
      id: 'impulse_buying',
      question: 'Com que frequência faz compras por impulso?',
      type: 'radio',
      options: [
        { value: 'never', label: 'Nunca ou quase nunca' },
        { value: 'rarely', label: 'Raramente' },
        { value: 'sometimes', label: 'Às vezes' },
        { value: 'often', label: 'Frequentemente' },
        { value: 'always', label: 'Sempre' }
      ]
    },
    {
      id: 'savings',
      question: 'Consegue poupar dinheiro mensalmente?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Não consigo poupar nada' },
        { value: 'little', label: 'Pouco (até 5% do rendimento)' },
        { value: 'moderate', label: 'Moderado (5-15% do rendimento)' },
        { value: 'good', label: 'Bom (15-30% do rendimento)' },
        { value: 'excellent', label: 'Excelente (mais de 30%)' }
      ]
    },
    {
      id: 'financial_goals',
      question: 'Qual é o seu principal objetivo financeiro?',
      type: 'radio',
      options: [
        { value: 'emergency', label: 'Criar reserva de emergência' },
        { value: 'pay_debts', label: 'Quitar dívidas' },
        { value: 'house', label: 'Comprar casa própria' },
        { value: 'retirement', label: 'Reforma' },
        { value: 'investment', label: 'Investir e multiplicar dinheiro' }
      ]
    },
    {
      id: 'main_difficulty',
      question: 'Qual é a sua maior dificuldade financeira hoje?',
      type: 'radio',
      options: [
        { value: 'low_income', label: 'Rendimento insuficiente' },
        { value: 'high_expenses', label: 'Gastos muito altos' },
        { value: 'no_control', label: 'Falta de controlo financeiro' },
        { value: 'debts', label: 'Muitas dívidas' },
        { value: 'no_knowledge', label: 'Falta de conhecimento sobre investimentos' }
      ]
    }
  ],
  business: [
    {
      id: 'company_size',
      question: 'Qual o porte da sua empresa?',
      type: 'radio',
      options: [
        { value: 'mei', label: 'Empresário Individual' },
        { value: 'micro', label: 'Microempresa (até €360k/ano)' },
        { value: 'small', label: 'Pequena empresa (até €2M/ano)' },
        { value: 'medium', label: 'Média empresa (até €50M/ano)' },
        { value: 'large', label: 'Grande empresa (acima de €50M/ano)' }
      ]
    },
    {
      id: 'monthly_revenue',
      question: 'Qual é o faturamento mensal médio?',
      type: 'number',
      placeholder: 'Ex: 25000'
    },
    {
      id: 'fixed_costs',
      question: 'Quais são os custos fixos mensais?',
      subtitle: 'Renda, salários, impostos fixos, etc.',
      type: 'number',
      placeholder: 'Ex: 15000'
    },
    {
      id: 'variable_costs',
      question: 'Quais são os custos variáveis mensais?',
      subtitle: 'Matéria-prima, comissões, etc.',
      type: 'number',
      placeholder: 'Ex: 8000'
    },
    {
      id: 'cash_flow',
      question: 'A sua empresa tem fluxo de caixa positivo?',
      type: 'radio',
      options: [
        { value: 'positive', label: 'Sim, sempre positivo' },
        { value: 'balanced', label: 'Equilibrado na maioria dos meses' },
        { value: 'irregular', label: 'Irregular (alguns meses positivo, outros negativo)' },
        { value: 'negative', label: 'Frequentemente negativo' }
      ]
    },
    {
      id: 'business_debts',
      question: 'A empresa possui dívidas?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Não possui dívidas' },
        { value: 'low', label: 'Poucas dívidas' },
        { value: 'medium', label: 'Dívidas moderadas' },
        { value: 'high', label: 'Muitas dívidas' }
      ]
    },
    {
      id: 'financial_control',
      question: 'Como é o controlo financeiro da empresa?',
      type: 'radio',
      options: [
        { value: 'excellent', label: 'Excelente - uso sistema completo' },
        { value: 'good', label: 'Bom - folhas de cálculo organizadas' },
        { value: 'basic', label: 'Básico - controlo simples' },
        { value: 'poor', label: 'Precário - pouco controlo' },
        { value: 'none', label: 'Não faço controlo' }
      ]
    },
    {
      id: 'growth_stage',
      question: 'Em que estágio está o crescimento da empresa?',
      type: 'radio',
      options: [
        { value: 'startup', label: 'Startup/Início das operações' },
        { value: 'growth', label: 'Crescimento acelerado' },
        { value: 'mature', label: 'Maturidade/Estabilidade' },
        { value: 'expansion', label: 'Expansão/Novos mercados' },
        { value: 'restructuring', label: 'Reestruturação' }
      ]
    },
    {
      id: 'main_challenge',
      question: 'Qual é o principal desafio financeiro da empresa?',
      type: 'radio',
      options: [
        { value: 'cash_flow', label: 'Gestão do fluxo de caixa' },
        { value: 'growth_capital', label: 'Capital para crescimento' },
        { value: 'cost_control', label: 'Controlo de custos' },
        { value: 'debt_management', label: 'Gestão de dívidas' },
        { value: 'profitability', label: 'Aumentar lucratividade' }
      ]
    }
  ]
};
