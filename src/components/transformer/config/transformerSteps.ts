import { LayerStep } from "../types";

export const encoderSteps: LayerStep[] = [
  {
    title: "Token Embeddings",
    description: "Converting tokens into learnable vector representations",
    formula: "E(x) = WᵉX",
    details: [
      "1. Each token is mapped to a unique vector",
      "2. These vectors are learned during training",
      "3. Similar tokens have similar embeddings"
    ],
    explanation: {
      title: "Token to Vector Conversion",
      simpleExplanation: "Each word or subword is converted into a vector of numbers that captures its meaning.",
      vectorExplanation: "The embedding vectors are learned parameters that encode semantic relationships between tokens.",
      example: "For example, 'king' and 'queen' would have similar but distinct vector representations."
    }
  },
  {
    title: "Positional Encoding",
    description: "Adding position information to token embeddings",
    formula: "PE(pos,2i) = sin(pos/10000^{2i/d})",
    details: [
      "1. Generate unique patterns for each position",
      "2. Use sine and cosine functions",
      "3. Add to token embeddings"
    ],
    explanation: {
      title: "Position Information",
      simpleExplanation: "Since transformers process all tokens at once, we need to tell them about token order.",
      vectorExplanation: "We use sine and cosine waves of different frequencies to encode positions.",
      example: "This helps the model understand that 'bark' means different things in 'tree bark' vs 'dogs bark'."
    }
  },
  {
    title: "Multi-Head Attention",
    description: "Parallel attention computation across different representation subspaces",
    formula: "Attention(Q,K,V) = softmax(QK^T/√d)V",
    details: [
      "1. Project input into Query, Key, Value vectors",
      "2. Compute scaled dot-product attention",
      "3. Combine multiple attention heads",
      "4. Project to output space"
    ],
    explanation: {
      title: "Parallel Attention Mechanism",
      simpleExplanation: "The model looks at the input sequence from multiple perspectives simultaneously.",
      vectorExplanation: "Each attention head can focus on different aspects of the relationships between tokens.",
      example: "One head might focus on syntax while another focuses on semantics."
    }
  }
];

export const decoderSteps: LayerStep[] = [
  {
    title: "Masked Self-Attention",
    description: "Preventing attention to future tokens during generation",
    formula: "MaskedAttn(Q,K,V) = softmax(mask(QK^T)/√d)V",
    details: [
      "1. Create attention mask matrix",
      "2. Apply mask before softmax",
      "3. Ensure causal attention pattern",
      "4. Process masked attention output"
    ],
    explanation: {
      title: "Causal Attention",
      simpleExplanation: "When generating text, we can only look at what we've generated so far.",
      vectorExplanation: "The mask ensures each position can only attend to previous positions.",
      example: "When predicting the next word, we can't 'peek' at future words."
    }
  },
  {
    title: "Cross-Attention",
    description: "Attending to encoder outputs",
    formula: "CrossAttn(Q,K,V) = softmax(QK^T/√d)V",
    details: [
      "1. Use decoder hidden states as queries",
      "2. Use encoder outputs as keys and values",
      "3. Compute cross-attention scores",
      "4. Combine information from both sequences"
    ],
    explanation: {
      title: "Encoder-Decoder Connection",
      simpleExplanation: "This layer allows the decoder to focus on relevant parts of the input sequence.",
      vectorExplanation: "The decoder learns which input tokens are most important for generating each output token.",
      example: "In translation, this helps align output words with relevant input words."
    }
  },
  {
    title: "Feed-Forward Network",
    description: "Token-wise transformations with non-linearity",
    formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
    details: [
      "1. Project to larger dimension",
      "2. Apply ReLU activation",
      "3. Project back to model dimension",
      "4. Add residual connection"
    ],
    explanation: {
      title: "Non-linear Processing",
      simpleExplanation: "Each token's representation is processed through a small neural network.",
      vectorExplanation: "This allows the model to learn complex token-wise transformations.",
      example: "The network can learn to combine or modify features extracted by attention layers."
    }
  }
];