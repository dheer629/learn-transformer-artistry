import React from "react";
import { Card } from "@/components/ui/card";
import type { EmbeddingVector } from "../types";

interface TokenProcessingSectionProps {
  tokens: EmbeddingVector[];
  currentStep: number;
  tokenizedOutput?: { text: string; id: number }[];
}

const TokenProcessingSection: React.FC<TokenProcessingSectionProps> = ({
  tokens,
  currentStep,
  tokenizedOutput = []
}) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Token Processing</h3>
      
      {tokenizedOutput.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Tokenized Input</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {tokenizedOutput.map((token, idx) => (
              <div
                key={idx}
                className="p-2 bg-accent/10 rounded-md flex justify-between items-center"
              >
                <span className="font-mono text-sm">{token.text}</span>
                <span className="text-xs text-muted-foreground">ID: {token.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {tokens.map((token, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg space-y-2 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">Token {idx + 1}: {token.word}</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Base Vector</h4>
                <div className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                  [{token.vector.map(v => v.toFixed(3)).join(", ")}]
                </div>
              </div>
              
              {token.positionalVector && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Position Encoding</h4>
                  <div className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                    [{token.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                </div>
              )}
              
              {token.contextualVector && (
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium mb-1">Contextual Vector</h4>
                  <div className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                    [{token.contextualVector.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TokenProcessingSection;