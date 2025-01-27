import React, { useState, useEffect } from "react";
import { pipeline } from "@huggingface/transformers";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface TokenizerPlaygroundProps {
  inputText: string;
  onTokenize: (tokens: { text: string; id: number }[]) => void;
}

const TokenizerPlayground: React.FC<TokenizerPlaygroundProps> = ({ inputText, onTokenize }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenizer, setTokenizer] = useState<any>(null);
  const [tokens, setTokens] = useState<{ text: string; id: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const initTokenizer = async () => {
      try {
        // Using a smaller, more efficient model for tokenization
        const pipe = await pipeline(
          "text-classification",
          "Xenova/distilbert-base-uncased"
        );
        setTokenizer(pipe.tokenizer);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing tokenizer:", error);
        toast({
          title: "Error",
          description: "Failed to load tokenizer. Please try again.",
          variant: "destructive",
        });
      }
    };

    initTokenizer();
  }, [toast]);

  useEffect(() => {
    if (tokenizer && inputText) {
      handleTokenize(inputText);
    }
  }, [inputText, tokenizer]);

  const handleTokenize = async (text: string) => {
    if (!tokenizer) return;

    try {
      const encoded = await tokenizer.encode(text);
      const tokenList = encoded.tokens.map((token: string, index: number) => ({
        text: token,
        id: encoded.ids[index],
      }));
      
      setTokens(tokenList);
      onTokenize(tokenList);
    } catch (error) {
      console.error("Error tokenizing text:", error);
      toast({
        title: "Tokenization Error",
        description: "Failed to tokenize the input text.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-4 space-y-4">
        <h3 className="text-lg font-semibold">Tokenizer Playground</h3>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Tokenizer Playground</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {tokens.map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <span className="font-mono text-sm">
                Token {index + 1}: {token.text}
              </span>
              <span className="text-xs text-muted-foreground">
                ID: {token.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TokenizerPlayground;