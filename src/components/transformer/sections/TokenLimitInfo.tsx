import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TokenLimitInfoProps {
  currentTokenCount: number;
  maxTokens: number;
  modelName?: string;
}

const TokenLimitInfo: React.FC<TokenLimitInfoProps> = ({
  currentTokenCount,
  maxTokens,
  modelName = "deepseek-chat"
}) => {
  const isNearLimit = currentTokenCount > maxTokens * 0.8;
  const isOverLimit = currentTokenCount > maxTokens;
  const completionTokens = 8000; // Deepseek's default completion tokens

  return (
    <Alert variant={isOverLimit ? "destructive" : "default"}>
      <InfoCircledIcon className="h-4 w-4" />
      <AlertTitle>Token Usage Information</AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        <p>Current token count: {currentTokenCount}</p>
        <p>Maximum tokens allowed: {maxTokens}</p>
        {isOverLimit && (
          <div className="text-red-600 font-medium space-y-1">
            <p>Error: Maximum context length exceeded</p>
            <p>Model: {modelName}</p>
            <p>Requested tokens: {currentTokenCount + completionTokens}</p>
            <p>- Message tokens: {currentTokenCount}</p>
            <p>- Completion tokens: {completionTokens}</p>
            <p>Please reduce the length of the messages or completion.</p>
          </div>
        )}
        {isNearLimit && !isOverLimit && (
          <p className="text-yellow-600 font-medium">
            Warning: Approaching token limit. Consider reducing input length.
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          In Bolt.DIY, the token limit is typically determined by the underlying AI model (e.g., Deepseek, OpenAI, etc.) and the configuration of the API call. If you're encountering token limit issues, you can adjust the behavior of your Bolt.DIY setup by modifying the parameters or logic in your code.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default TokenLimitInfo;