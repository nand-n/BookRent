const formatTitle = (segment: string) => {
    return segment
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  export const generateDynamicTitleAndSubtitle = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(Boolean); 
  
    if (pathSegments.length === 0) {
      return { title: 'Dashboard', subtitle: 'Dashboard Page' };
    }
  
    // Title is derived from the first segment
    const [firstSegment, ...remainingSegments] = pathSegments;
  
    const title = formatTitle(firstSegment);
  
    // Subtitle is derived from the remaining segments joined with hyphens
    const subtitle = remainingSegments.length > 0
      ? formatTitle(remainingSegments.join('-'))
      : '';
  
    return { title, subtitle };
  };
  