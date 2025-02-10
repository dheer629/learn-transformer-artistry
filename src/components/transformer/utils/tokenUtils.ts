
export const countTokens = async (text: string): Promise<number> => {
  try {
    const response = await fetch('https://tiktokenizer.vercel.app/api/count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to count tokens');
    }
    
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error counting tokens:', error);
    return text.split(/\s+/).length; // Fallback to basic word count
  }
};
