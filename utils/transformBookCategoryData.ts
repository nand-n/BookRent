interface CategoryData {
    name: string;
    value: number;
    color: string;
  }
  
  export function transformCategoryData(data: any[]): CategoryData[] {
    return data?.map(category => {
      const color = getRandomColor();
      return {
        name: category.categoryName,
        value: category.bookCount,
        color
      };
    }) || [];
  }
  
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  