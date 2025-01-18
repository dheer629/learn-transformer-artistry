import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface TokenLimitInfoProps {
  currentTokenCount: number;
  maxTokens: number;
}

const TokenLimitInfo: React.FC<TokenLimitInfoProps> = ({
  currentTokenCount,
  maxTokens,
}) => {
  const isNearLimit = currentTokenCount > maxTokens * 0.8;
  const isOverLimit = currentTokenCount > maxTokens;

  return (
    <Alert variant={isOverLimit ? "destructive" : isNearLimit ? "warning" : "default"}>
      <InfoCircledIcon className="h-4 w-4" />
      <AlertTitle>Token Usage Information</AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        <p>Current token count: {currentTokenCount}</p>
        <p>Maximum tokens allowed: {maxTokens}</p>
        {isNearLimit && !isOverLimit && (
          <p className="text-yellow-600">
            Warning: Approaching token limit. Consider reducing input length.
          </p>
        )}
        {isOverLimit && (
          <p className="text-red-600">
            Token limit exceeded. Please reduce input length or adjust parameters.
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Token limits are determined by the underlying AI model. You can adjust behavior
          by modifying parameters or using a different model configuration.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default TokenLimitInfo;