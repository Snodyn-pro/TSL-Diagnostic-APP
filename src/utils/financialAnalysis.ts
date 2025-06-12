
interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface AnalysisResult {
  profile: string;
  score: number;
  budgetDistribution: {
    essential: number;
    nonEssential: number;
    savings: number;
  };
  detailedScores: {
    control: number;
    savings: number;
    debts: number;
    planning: number;
  };
  recommendations: Recommendation[];
}

export const analyzeFinancialData = (answers: Record<string, string>, userType: string): AnalysisResult => {
  let score = 0;
  let profile = '';
  const recommendations: Recommendation[] = [];
  
  // Calculate scores based on answers
  const controlScore = calculateControlScore(answers, userType);
  const savingsScore = calculateSavingsScore(answers);
  const debtsScore = calculateDebtsScore(answers);
  const planningScore = calculatePlanningScore(answers);
  
  score = Math.round((controlScore + savingsScore + debtsScore + planningScore) / 4);
  
  // Determine profile
  if (answers.impulse_buying === 'often' || answers.impulse_buying === 'always') {
    profile = 'Gastador por Impulso';
  } else if (score >= 75) {
    profile = 'Equilibrado';
  } else if (score >= 50) {
    profile = 'Em Desenvolvimento';
  } else {
    profile = 'Precisa de Ajuda';
  }
  
  // Generate budget distribution
  const budgetDistribution = calculateBudgetDistribution(answers, userType);
  
  // Generate recommendations
  if (answers.debts && answers.debts !== 'none') {
    recommendations.push({
      title: 'Priorize o pagamento de dívidas',
      description: 'Foque em quitar as dívidas com maiores juros primeiro para reduzir os custos financeiros.',
      priority: 'high'
    });
  }
  
  if (answers.savings === 'none' || answers.savings === 'little') {
    recommendations.push({
      title: 'Crie uma reserva de emergência',
      description: 'Comece poupando pelo menos 10% da sua renda mensal para formar uma reserva de emergência.',
      priority: 'high'
    });
  }
  
  if (answers.impulse_buying === 'often' || answers.impulse_buying === 'always') {
    recommendations.push({
      title: 'Controle compras por impulso',
      description: 'Implemente a regra dos 24h: espere um dia antes de fazer compras não essenciais.',
      priority: 'medium'
    });
  }
  
  if (userType === 'business' && answers.financial_control === 'poor') {
    recommendations.push({
      title: 'Melhore o controle financeiro',
      description: 'Implemente um sistema de gestão financeira para melhor controle do fluxo de caixa.',
      priority: 'high'
    });
  }
  
  recommendations.push({
    title: 'Educação financeira',
    description: 'Continue aprendendo sobre finanças através de cursos, livros e materiais educativos.',
    priority: 'low'
  });
  
  return {
    profile,
    score,
    budgetDistribution,
    detailedScores: {
      control: controlScore,
      savings: savingsScore,
      debts: debtsScore,
      planning: planningScore
    },
    recommendations
  };
};

const calculateControlScore = (answers: Record<string, string>, userType: string): number => {
  let score = 50; // Base score
  
  if (userType === 'individual') {
    if (answers.impulse_buying === 'never') score += 30;
    else if (answers.impulse_buying === 'rarely') score += 20;
    else if (answers.impulse_buying === 'sometimes') score += 10;
    else if (answers.impulse_buying === 'often') score -= 10;
    else if (answers.impulse_buying === 'always') score -= 20;
  } else {
    if (answers.financial_control === 'excellent') score += 30;
    else if (answers.financial_control === 'good') score += 20;
    else if (answers.financial_control === 'basic') score += 10;
    else if (answers.financial_control === 'poor') score -= 10;
    else if (answers.financial_control === 'none') score -= 20;
  }
  
  return Math.max(0, Math.min(100, score));
};

const calculateSavingsScore = (answers: Record<string, string>): number => {
  let score = 0;
  
  if (answers.savings === 'excellent') score = 100;
  else if (answers.savings === 'good') score = 80;
  else if (answers.savings === 'moderate') score = 60;
  else if (answers.savings === 'little') score = 30;
  else if (answers.savings === 'none') score = 0;
  
  return score;
};

const calculateDebtsScore = (answers: Record<string, string>): number => {
  let score = 100;
  
  if (answers.debts === 'none' || answers.business_debts === 'none') score = 100;
  else if (answers.debts === 'low' || answers.business_debts === 'low') score = 80;
  else if (answers.debts === 'medium' || answers.business_debts === 'medium') score = 50;
  else if (answers.debts === 'high' || answers.business_debts === 'high') score = 20;
  
  return score;
};

const calculatePlanningScore = (answers: Record<string, string>): number => {
  let score = 50;
  
  if (answers.financial_goals || answers.main_challenge) score += 30;
  if (answers.cash_flow === 'positive') score += 20;
  else if (answers.cash_flow === 'balanced') score += 10;
  else if (answers.cash_flow === 'negative') score -= 20;
  
  return Math.max(0, Math.min(100, score));
};

const calculateBudgetDistribution = (answers: Record<string, string>, userType: string): { essential: number; nonEssential: number; savings: number } => {
  if (userType === 'individual') {
    const income = parseFloat(answers.income) || 0;
    const fixedExpenses = parseFloat(answers.fixed_expenses) || 0;
    const variableExpenses = parseFloat(answers.variable_expenses) || 0;
    
    if (income > 0) {
      const essential = Math.round((fixedExpenses / income) * 100);
      const nonEssential = Math.round((variableExpenses / income) * 100);
      const savings = Math.max(0, 100 - essential - nonEssential);
      
      return { essential, nonEssential, savings };
    }
  }
  
  // Default distribution
  return { essential: 50, nonEssential: 35, savings: 15 };
};
