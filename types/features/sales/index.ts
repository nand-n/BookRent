export interface MonthlyStatistics {
    currentMonthIncome: number,
    previousMonthIncome: number,
    percentageChange: number,
    totalIncome: number
}

export interface EarningsSummary {
    month: string; 
    total: number;
  }