import 'chart.js';

declare module 'chart.js' {
  interface ChartTypeRegistry {
    financial: {
      datasets: {
        data: {
          x: string;
          o: number;
          h: number;
          l: number;
          c: number;
        }[];
      };
    };
  }
}
