# Proplaintiff-AI Backend Structure Document

This document explains the backend setup for the Proplaintiff-AI platform in everyday language, ensuring even non-technical readers can understand the system’s structure. Below are the key sections detailing the architecture, data management, APIs, hosting, and security.

## 1. Backend Architecture

The backend is designed with clarity, stability, and scalability in mind. It uses a modern Node.js-based setup with TypeScript, making it easier for developers to maintain and extend the code. Key details include:

- **Frameworks and Tools Used:**
  - Node.js with TypeScript ensuring strong type checking and fewer bugs.
  - Fastify as the web framework to handle HTTP requests quickly.
  - tRPC for typesafe APIs, ensuring the frontend and backend always agree on data structures.
  - Drizzle ORM to interact with the PostgreSQL database in a clean, organized way.
  - AWS SDK to communicate with AWS services like S3, Textract, and Bedrock.

- **Design Patterns:**
  - Structured as modular services, making it easy to manage each functionality (user management, document management, AI processing).
  - Separation of concerns so different parts (authentication, data processing, AI insights) are handled independently for better maintainability.

- **Scalability and Maintainability:**
  - The modular design supports scaling up as the number of users and legal cases grows.
  - Using a monorepo approach with tools like pnpm and turbo means that shared code can be easily maintained and updated across the project.

## 2. Database Management

The system uses PostgreSQL as the core database for storing structured data. Here are the details:

- **Database Technology:**
  - **PostgreSQL:** A robust SQL database known for its reliability and strong support for complex queries.
  - **Drizzle ORM:** Provides an efficient way to interact with PostgreSQL using JavaScript/TypeScript.

- **Data Structure & Storage:**
  - Data is organized in tables that store information like user profiles, organization details, legal cases, documents, and AI-generated insights.
  - Data management practices include regular backups, proper indexing, and schema validations using Zod.

- **Data Access:**
  - The backend accesses data through the ORM, ensuring consistency and reducing the risk of errors when handling raw SQL queries.

## 3. Database Schema

Below is a human-readable overview of the database schema along with an example using SQL/PostgreSQL for illustration:

### Human-readable Overview:
- **Users:** Stores information such as user ID, name, email, hashed password, and role (admin, member, viewer).
- **Organizations:** Contains details about each organization including a unique ID, name, branding details (like logo URL), and subscription details.
- **Cases:** Contains records for each legal case with details including case title, case number, status, description, and associated organization.
- **Documents:** Stores metadata for legal documents, such as document title, file type, size, storage location (S3 URL), MIME type, and reference to the associated case.
- **AI Insights:** Contains records of AI-generated data such as case summaries, key points, AI confidence scores, and references to the source document.

### Example PostgreSQL Schema:

/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    organization_id INTEGER REFERENCES organizations(id)
);

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url TEXT,
    subscription_plan VARCHAR(50) NOT NULL,
    stripe_customer_id VARCHAR(255)
);

CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    case_number VARCHAR(100),
    status VARCHAR(50),
    description TEXT,
    organization_id INTEGER REFERENCES organizations(id)
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    s3_url TEXT NOT NULL,
    size INTEGER,
    mime_type VARCHAR(100),
    case_id INTEGER REFERENCES cases(id)
);

CREATE TABLE ai_insights (
    id SERIAL PRIMARY KEY,
    summary TEXT,
    key_points TEXT,
    confidence_score NUMERIC,
    document_id INTEGER REFERENCES documents(id),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

## 4. API Design and Endpoints

The API is designed to be simple yet robust, following a RESTful approach while leveraging tRPC for type safety. Key endpoints include:

- **User Management Endpoints:**
  - Registration and Login: Handle user creation (with password hashing) and authentication.
  - Profile Management: For users to update their details and manage their profiles.

- **Organization Management Endpoints:**
  - Create and update organizations, including branding and subscription management (integrated with Stripe).

- **Case Management Endpoints:**
  - Create, update, and retrieve case information including metadata like case number and status.

- **Document Management Endpoints:**
  - Upload documents to AWS S3, store document metadata in the database, and manage document retrieval.
  - Initiate OCR processing through AWS Textract.

- **AI Analysis Endpoints:**
  - Trigger AWS Bedrock and Langchain integrations to generate AI-powered insights and summaries based on the document content.
  - Retrieve AI insights linked to a specific case or document.

## 5. Hosting Solutions

The backend is hosted in the cloud to ensure high availability, reliability, and global reach. The key hosting aspects include:

- **Cloud Provider:**
  - AWS is used as the primary cloud provider, leveraging multiple AWS services.

- **Benefits:**
  - **Reliability:** AWS provides robust infrastructure with a high uptime guarantee.
  - **Scalability:** As the legal platform’s usage grows, AWS services can scale accordingly. Services like S3, Textract, and Bedrock are built to handle increased loads.
  - **Cost-Effectiveness:** Using on-demand cloud services helps optimize the cost based on actual usage.

## 6. Infrastructure Components

The architecture includes various components that work together to enhance performance and user experience:

- **Load Balancers:** Distribute incoming API requests evenly across servers to prevent any single server from becoming a bottleneck.
- **Caching Mechanisms:** Implemented at both data and API levels to ensure quick access to frequently used information.
- **Content Delivery Networks (CDNs):** Serve static content such as legal document previews and UI assets quickly to users across the globe.
- **AWS Services:**
  - AWS S3 for document storage.
  - AWS Textract for OCR processing of uploaded legal documents.
  - AWS Bedrock for powering AI-driven insights.

## 7. Security Measures

Security is critical, given the sensitive nature of legal documents. The security measures include:

- **Authentication and Authorization:**
  - Secure user authentication using password hashing and token-based systems (JWT).
  - Role-based access so that users (admin, member, viewer) can only access what they need.

- **Data Encryption:**
  - Encryption of sensitive data both in transit (using HTTPS) and at rest (database encryption and S3 bucket encryption).

- **Regulatory Compliance:**
  - Practices in line with legal standards to protect sensitive legal documents.
  - Regular security audits and compliance checks.

- **Environment Variables:**
  - Use of dotenv ensures that sensitive keys and configurations are secured and not exposed in the codebase.

## 8. Monitoring and Maintenance

The backend will be monitored continuously to ensure optimal performance. Key practices include:

- **Monitoring Tools:**
  - Use AWS CloudWatch and other third-party monitoring tools to track server performance, API response times, and error logs.
  - Automated alerts for unusual activities or performance drops.

- **Maintenance Strategies:**
  - Regular code reviews and automated testing (using tools configured via Eslint and Prettier) to maintain code quality.
  - Scheduled database optimizations and backups.
  - Continuous integration/continuous deployment (CI/CD) pipelines to ensure that updates are deployed seamlessly and without downtime.

## 9. Conclusion and Overall Backend Summary

The Proplaintiff-AI backend is built using modern, scalable, and secure technologies tailored to handle the needs of legal professionals. In summary:

- **Architecture:** Modular design with Node.js, Fastify, tRPC, and a strong emphasis on scalability.
- **Database Management:** PostgreSQL with clear schema design and managed through Drizzle ORM.
- **API Design:** RESTful endpoints ensuring smooth communication between the frontend and backend.
- **Hosting and Infrastructure:** Cloud-based hosting on AWS with load balancing, caching, and CDNs to support performance and scalability.
- **Security:** Emphasis on strong authentication, data encryption, and compliance with legal standards.
- **Monitoring and Maintenance:** Robust monitoring and regular updates to ensure reliability over time.

This comprehensive backend setup not only meets the project’s goals of efficiency and scalability but also goes the extra mile in security and performance, ensuring that the sensitive legal data is handled with the utmost care and precision.