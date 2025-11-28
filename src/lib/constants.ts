// Constantes do CarteiraPro

export const INVESTOR_PROFILES = {
  conservative: {
    label: 'Conservador',
    description: 'Prefere segurança e baixo risco',
    allocation: {
      stocks: 20,
      bonds: 50,
      realEstate: 15,
      crypto: 0,
      funds: 10,
      cash: 5,
    },
  },
  moderate: {
    label: 'Moderado',
    description: 'Equilibra risco e retorno',
    allocation: {
      stocks: 40,
      bonds: 30,
      realEstate: 15,
      crypto: 5,
      funds: 5,
      cash: 5,
    },
  },
  aggressive: {
    label: 'Arrojado',
    description: 'Busca máximo retorno com maior risco',
    allocation: {
      stocks: 60,
      bonds: 10,
      realEstate: 10,
      crypto: 10,
      funds: 5,
      cash: 5,
    },
  },
} as const;

export const BUDGET_RECOMMENDATIONS = {
  housing: 30,
  bills: 15,
  leisure: 10,
  investments: 20,
  savings: 15,
  emergency: 10,
} as const;

export const FINANCIAL_GOALS_TEMPLATES = [
  {
    title: 'Fundo de Emergência',
    category: 'emergency' as const,
    description: '6 meses de despesas',
    priority: 'high' as const,
  },
  {
    title: 'Caminho do Milhão',
    category: 'investment' as const,
    description: 'Acumular R$ 1.000.000',
    priority: 'high' as const,
  },
  {
    title: 'Aposentadoria Confortável',
    category: 'retirement' as const,
    description: 'Independência financeira',
    priority: 'high' as const,
  },
  {
    title: 'Compra de Imóvel',
    category: 'purchase' as const,
    description: 'Casa própria',
    priority: 'medium' as const,
  },
] as const;

export const COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
} as const;
