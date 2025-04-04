flowchart TD
    A[User Authentication]
    B[Organization Selection]
    C[Case Creation]
    D[Document Upload AWS S3]
    E[OCR Processing AWS Textract]
    F[Data Storage PostgreSQL]
    G[AI Analysis AWS Bedrock Langchain]
    H[Insight Generation]
    I[Display]
    J[Subscription Management Stripe]
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J