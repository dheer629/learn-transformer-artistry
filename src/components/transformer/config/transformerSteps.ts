import { LayerStep } from "../types";

export const encoderSteps: LayerStep[] = [
  {
    title: "Input Embedding",
    description: "Converting words into numerical vectors",
    formula: "E(x) = WᵉX + PE",
    details: [
      "1. Each word is converted into a numerical vector",
      "2. Positional encoding is added to maintain word order",
      "3. Resulting embeddings capture word meaning and position"
    ],
    explanation: {
      title: "Word to Numbers Conversion",
      simpleExplanation: "Just like you might assign numbers to letters (A=1, B=2), we convert words into special number patterns that help the computer understand their meaning.",
      vectorExplanation: "The numbers you see represent different aspects of the word - like if it's a noun or verb, if it's positive or negative, etc.",
      example: "For example, the word 'happy' might get numbers that show it's positive and emotional."
    }
  },
  {
    title: "Self-Attention",
    description: "Computing relationships between words",
    formula: "Attention(Q,K,V) = softmax(QKᵀ/√d)V",
    details: [
      "1. Create Query (Q), Key (K), and Value (V) vectors",
      "2. Calculate attention scores between all words",
      "3. Apply softmax to get attention weights",
      "4. Combine values based on attention weights"
    ],
    explanation: {
      title: "Finding Word Connections",
      simpleExplanation: "This is like when you read a sentence and figure out which words are related to each other.",
      vectorExplanation: "Each word asks questions (Query) about other words (Keys) to find out how important they are to its meaning (Values).",
      example: "In 'The cat sat on the mat', 'cat' is strongly connected to 'sat' because cats do the sitting."
    }
  },
  {
    title: "Feed-Forward Network",
    description: "Processing through neural network layers",
    formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
    details: [
      "1. Transform through first linear layer",
      "2. Apply ReLU activation",
      "3. Transform through second linear layer",
      "4. Add residual connection and normalize"
    ],
    explanation: {
      title: "Processing Information",
      simpleExplanation: "This is like your brain processing information through multiple steps to understand something better.",
      vectorExplanation: "The numbers go through mathematical operations that help the computer learn patterns and make decisions.",
      example: "Just like how you might solve a math problem in steps, the computer processes the word information in stages."
    }
  }
];

export const decoderSteps: LayerStep[] = [
  {
    title: "Output Embedding",
    description: "Embedding the partial output sequence",
    formula: "E(y) = WᵈY + PE",
    details: [
      "1. Convert partial output to embeddings",
      "2. Add positional encoding",
      "3. Prepare for masked attention"
    ],
    explanation: {
      title: "Preparing to Generate Output",
      simpleExplanation: "Now we start working on creating the answer, one word at a time.",
      vectorExplanation: "Just like we did with the input, we convert our partial answer into numbers the computer can work with.",
      example: "If we're translating 'Hello' to Spanish, we start preparing to generate '¡Hola!'"
    }
  },
  {
    title: "Masked Self-Attention",
    description: "Processing output sequence with masking",
    formula: "MaskedAttn(Q,K,V) = softmax(mask(QKᵀ)/√d)V",
    details: [
      "1. Create Q, K, V vectors for output",
      "2. Apply future masking",
      "3. Calculate masked attention scores",
      "4. Combine values using masked attention"
    ],
    explanation: {
      title: "Understanding Output Connections",
      simpleExplanation: "We need to make sure the model only looks at the words it has generated so far.",
      vectorExplanation: "This is like covering up future words in a sentence so the model can only focus on what it has already said.",
      example: "If we are generating '¡Hola!', we can't look ahead to see what comes next."
    }
  },
  {
    title: "Cross-Attention",
    description: "Attending to encoder outputs",
    formula: "CrossAttn(Q,K,V) = softmax(QKᵀ/√d)V",
    details: [
      "1. Use decoder Q with encoder K, V",
      "2. Calculate cross-attention scores",
      "3. Combine encoder values based on scores",
      "4. Connect encoder and decoder information"
    ],
    explanation: {
      title: "Connecting Encoder and Decoder",
      simpleExplanation: "This step helps the model understand how the input words relate to the output words.",
      vectorExplanation: "The decoder looks at the encoder's outputs to find relevant information for generating the next word.",
      example: "If the input was 'Hello', the model uses that to help decide what the next word should be."
    }
  },
  {
    title: "Feed-Forward & Output",
    description: "Final processing and generation",
    formula: "Output = softmax(FFN(CrossAttn(x)))",
    details: [
      "1. Process through feed-forward network",
      "2. Apply final linear transformation",
      "3. Generate output probabilities",
      "4. Select most likely output token"
    ],
    explanation: {
      title: "Generating the Final Output",
      simpleExplanation: "This is where the model decides what the final answer will be.",
      vectorExplanation: "The processed numbers are turned into probabilities to see which word is most likely to come next.",
      example: "After processing, the model might decide that '¡Hola!' is the best translation for 'Hello'."
    }
  }
];