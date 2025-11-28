// Tipos do CarteiraPro

export type InvestorProfile = 'conservative' | 'moderate' | 'aggressive';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  profession: string;
  monthlyIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  investorProfile: InvestorProfile;
  createdAt: Date;
}

export interface BudgetAllocation {
  housing: number;
  bills: number;
  leisure: number;
  investments: number;
  savings: number;
  emergency: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'retirement' | 'emergency' | 'investment' | 'purchase' | 'custom';
  priority: 'high' | 'medium' | 'low';
}

export interface InvestmentPortfolio {
  stocks: number;
  bonds: number;
  realEstate: number;
  crypto: number;
  funds: number;
  cash: number;
}

export interface FinancialMetrics {
  netWorth: number;
  monthlyInvestment: number;
  projectedRetirement: number;
  yearsToRetirement: number;
  financialIndependenceScore: number;
}
