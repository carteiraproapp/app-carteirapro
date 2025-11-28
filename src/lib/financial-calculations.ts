// Cálculos financeiros do CarteiraPro

import { BudgetAllocation, InvestorProfile } from './types';
import { BUDGET_RECOMMENDATIONS, INVESTOR_PROFILES } from './constants';

export function calculateBudgetAllocation(
  monthlyIncome: number,
  fixedExpenses: number,
  variableExpenses: number
): BudgetAllocation {
  const totalExpenses = fixedExpenses + variableExpenses;
  const availableIncome = monthlyIncome - totalExpenses;
  
  return {
    housing: (monthlyIncome * BUDGET_RECOMMENDATIONS.housing) / 100,
    bills: (monthlyIncome * BUDGET_RECOMMENDATIONS.bills) / 100,
    leisure: (monthlyIncome * BUDGET_RECOMMENDATIONS.leisure) / 100,
    investments: (monthlyIncome * BUDGET_RECOMMENDATIONS.investments) / 100,
    savings: (monthlyIncome * BUDGET_RECOMMENDATIONS.savings) / 100,
    emergency: (monthlyIncome * BUDGET_RECOMMENDATIONS.emergency) / 100,
  };
}

export function calculateNetWorth(
  assets: number,
  liabilities: number
): number {
  return assets - liabilities;
}

export function calculateMonthlyInvestment(
  monthlyIncome: number,
  investmentPercentage: number = 20
): number {
  return (monthlyIncome * investmentPercentage) / 100;
}

export function calculateYearsToGoal(
  currentAmount: number,
  targetAmount: number,
  monthlyContribution: number,
  annualReturn: number = 10
): number {
  if (monthlyContribution <= 0) return Infinity;
  
  const monthlyRate = annualReturn / 12 / 100;
  const months = Math.log(
    (targetAmount * monthlyRate + monthlyContribution) /
    (currentAmount * monthlyRate + monthlyContribution)
  ) / Math.log(1 + monthlyRate);
  
  return Math.ceil(months / 12);
}

export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  // Valor futuro do principal
  const futurePrincipal = principal * Math.pow(1 + monthlyRate, months);
  
  // Valor futuro das contribuições mensais
  const futureContributions = monthlyContribution * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  return futurePrincipal + futureContributions;
}

export function calculateFinancialIndependenceScore(
  monthlyIncome: number,
  monthlyExpenses: number,
  netWorth: number,
  age: number
): number {
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
  const monthsOfExpensesCovered = netWorth / monthlyExpenses;
  const yearsToRetirement = 65 - age;
  
  // Score baseado em múltiplos fatores (0-100)
  const savingsScore = Math.min(savingsRate * 2, 40);
  const emergencyScore = Math.min(monthsOfExpensesCovered * 2, 30);
  const timeScore = Math.max(30 - (yearsToRetirement / 2), 0);
  
  return Math.round(savingsScore + emergencyScore + timeScore);
}

export function getRecommendedPortfolio(profile: InvestorProfile) {
  return INVESTOR_PROFILES[profile].allocation;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
