export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      document_analysis: {
        Row: {
          data_type: string | null
          document: string
          id: number
          paragraph: string | null
          section: string | null
          sentence: string
        }
        Insert: {
          data_type?: string | null
          document: string
          id?: number
          paragraph?: string | null
          section?: string | null
          sentence: string
        }
        Update: {
          data_type?: string | null
          document?: string
          id?: number
          paragraph?: string | null
          section?: string | null
          sentence?: string
        }
        Relationships: []
      }
      document_links: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          kag_reference: string | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          kag_reference?: string | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          kag_reference?: string | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      document_summarizer: {
        Row: {
          created_at: string | null
          data_type: string
          document: string
          id: number
          paragraph: string | null
          section: string | null
          sentence: string | null
          summary: string | null
        }
        Insert: {
          created_at?: string | null
          data_type: string
          document: string
          id?: number
          paragraph?: string | null
          section?: string | null
          sentence?: string | null
          summary?: string | null
        }
        Update: {
          created_at?: string | null
          data_type?: string
          document?: string
          id?: number
          paragraph?: string | null
          section?: string | null
          sentence?: string | null
          summary?: string | null
        }
        Relationships: []
      }
      llm_configurations: {
        Row: {
          created_at: string | null
          id: string
          model_name: string
          provider: Database["public"]["Enums"]["llm_provider"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_name: string
          provider: Database["public"]["Enums"]["llm_provider"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          model_name?: string
          provider?: Database["public"]["Enums"]["llm_provider"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          message: Json
          session_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: Json
          session_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      ml_predictions: {
        Row: {
          created_at: string | null
          id: string
          input_data: Json
          model_name: string
          output_data: Json | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          input_data: Json
          model_name: string
          output_data?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          input_data?: Json
          model_name?: string
          output_data?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      site_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          summary: string
          title: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary: string
          title: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          summary?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      summaries: {
        Row: {
          created_at: string | null
          document_url: string
          id: number
          query: string
          summary: string
        }
        Insert: {
          created_at?: string | null
          document_url: string
          id?: number
          query: string
          summary: string
        }
        Update: {
          created_at?: string | null
          document_url?: string
          id?: number
          query?: string
          summary?: string
        }
        Relationships: []
      }
      summarizer_images: {
        Row: {
          content_type: string
          created_at: string | null
          document_name: string
          id: number
          image_data: string
          image_name: string
        }
        Insert: {
          content_type: string
          created_at?: string | null
          document_name: string
          id?: number
          image_data: string
          image_name: string
        }
        Update: {
          content_type?: string
          created_at?: string | null
          document_name?: string
          id?: number
          image_data?: string
          image_name?: string
        }
        Relationships: []
      }
      transformer_images: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_path: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_path: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_path?: string
          title?: string
        }
        Relationships: []
      }
      transformer_questions: {
        Row: {
          category: string
          correct_answer: number
          created_at: string | null
          description: string
          difficulty_level: string
          explanation: string
          id: number
          options: Json
          question: string
          title: string
          visualization_data: Json | null
        }
        Insert: {
          category: string
          correct_answer: number
          created_at?: string | null
          description: string
          difficulty_level: string
          explanation: string
          id?: number
          options: Json
          question: string
          title: string
          visualization_data?: Json | null
        }
        Update: {
          category?: string
          correct_answer?: number
          created_at?: string | null
          description?: string
          difficulty_level?: string
          explanation?: string
          id?: number
          options?: Json
          question?: string
          title?: string
          visualization_data?: Json | null
        }
        Relationships: []
      }
      transformer_steps: {
        Row: {
          created_at: string | null
          description: string
          formula: string
          id: number
          image_url: string | null
          order_number: number
          step_name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          formula: string
          id?: number
          image_url?: string | null
          order_number: number
          step_name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          formula?: string
          id?: number
          image_url?: string | null
          order_number?: number
          step_name?: string
        }
        Relationships: []
      }
      transformer_visualization_images: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      transformer_visualizations: {
        Row: {
          attention_weights: Json
          created_at: string | null
          id: string
          input_text: string
          layer_outputs: Json
          tokens: Json
        }
        Insert: {
          attention_weights: Json
          created_at?: string | null
          id?: string
          input_text: string
          layer_outputs: Json
          tokens: Json
        }
        Update: {
          attention_weights?: Json
          created_at?: string | null
          id?: string
          input_text?: string
          layer_outputs?: Json
          tokens?: Json
        }
        Relationships: []
      }
      vectors: {
        Row: {
          chunk: string
          created_at: string | null
          doc_id: string
          embedding: Json
          id: number
        }
        Insert: {
          chunk: string
          created_at?: string | null
          doc_id: string
          embedding: Json
          id?: number
        }
        Update: {
          chunk?: string
          created_at?: string | null
          doc_id?: string
          embedding?: Json
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      count_tokens: {
        Args: {
          text_input: string
        }
        Returns: number
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_site_pages: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          url: string
          chunk_number: number
          title: string
          summary: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      document_type: "STANDARD" | "SPECIFICATION" | "REPORT" | "OTHER"
      llm_provider: "openai" | "anthropic" | "google" | "mistral" | "deepseek"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
