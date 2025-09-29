import { useEffect } from 'react';

export function ImagePreloader() {
  useEffect(() => {
    const imagesToPreload = [
      'https://images.unsplash.com/photo-1680263299025-48b750a452f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGxhbmRzY2FwZSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1ODk4MzcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1615675101506-2ca1b9679a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRpbWF0ZSUyMHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU4OTgzNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1601825085812-548b1c4d94b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwc3RyZWV0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU4OTgzNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}
