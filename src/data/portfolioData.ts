export interface SkillItem {
  name: string;
  level: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  orbitRing: number;
  color: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  project: string;
  url?: string;
  missionStatus: string;
  responsibilities: string[];
  technologies: string[];
  telemetryMetrics: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  status: string;
  color: string;
  glowColor: string;
  planetType: 'oceanic' | 'metropolis' | 'grid';
  problem: string;
  solution: string;
  architecture: {
    title: string;
    flow: string[];
  };
  technologies: string[];
  keyHighlights: string[];
  liveUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  specialization: string;
  badge: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  status: string;
  targetYear: string;
  credentialType: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    callsign: "ASUTOSH NAYAK",
    title: "Senior Java Backend Engineer",
    subTitle: "Java 8+ · Spring Boot · Microservices · AWS Cloud Architect",
    summary:
      "Java Backend Engineer with 4+ years designing, building, and operating production applications end-to-end using Java 8+, Spring Boot, and MySQL on AWS. Hands-on across the full SDLC: RESTful API design, microservices-based systems, Spring Security, JPA/Hibernate persistence and transaction tuning, JUnit testing, and code-quality gates. Deploys and operates services on AWS (EC2, ALB, RDS, S3, CloudFront, CloudWatch) and diagnoses production issues independently. Full-stack range with Angular; known for converting ambiguous requirements into clear designs and delivering with minimal handholding.",
    location: "Bhubaneswar, Odisha, India",
    coordinates: "20.2961° N, 85.8245° E",
    email: "nayakasutosh176@gmail.com",
    phone: "+91 63721 58889",
    linkedin: "https://linkedin.com/in/asutosh-nayak-prog",
    github: "https://github.com/code-by-asutosh",
    status: "STATUS: OPERATIONAL // ALL SYSTEMS ONLINE",
    experienceYears: "4+ Years",
    tagline: "Building scalable and resilient digital architectures across the technology universe.",
  },

  skillsCategories: [
    {
      id: "core-java",
      category: "Core Java (8+)",
      orbitRing: 1,
      color: "#00f0ff",
      skills: [
        { name: "Collections Framework", level: "Expert", highlight: true },
        { name: "Streams & Lambdas", level: "Expert", highlight: true },
        { name: "Concurrency & Multithreading (ExecutorService)", level: "Advanced", highlight: true },
        { name: "OOP Design Principles", level: "Expert" },
        { name: "Exception Handling", level: "Advanced" },
        { name: "Legacy Code Refactoring", level: "Advanced" },
      ],
    },
    {
      id: "spring-ecosystem",
      category: "Spring Ecosystem",
      orbitRing: 2,
      color: "#00ff9f",
      skills: [
        { name: "Spring Boot", level: "Expert", highlight: true },
        { name: "Spring Security (JWT)", level: "Advanced", highlight: true },
        { name: "Spring Cloud", level: "Advanced" },
        { name: "Spring Data JPA & Hibernate ORM", level: "Expert", highlight: true },
        { name: "Spring JDBC", level: "Advanced" },
        { name: "Bean Lifecycle & DI", level: "Expert" },
        { name: "Transaction Management", level: "Advanced" },
      ],
    },
    {
      id: "microservices-apis",
      category: "Microservices & APIs",
      orbitRing: 3,
      color: "#9d4edd",
      skills: [
        { name: "Microservices Architecture", level: "Advanced", highlight: true },
        { name: "RESTful API Best Practices", level: "Expert", highlight: true },
        { name: "Inter-Service Communication", level: "Advanced" },
        { name: "RabbitMQ & Apache Kafka", level: "Intermediate", highlight: true },
        { name: "WebSocket Duplex Comms", level: "Advanced" },
        { name: "API Security & Encryption", level: "Advanced" },
      ],
    },
    {
      id: "aws-cloud",
      category: "AWS Cloud & DevOps",
      orbitRing: 4,
      color: "#ffb703",
      skills: [
        { name: "AWS EC2 & ALB", level: "Advanced", highlight: true },
        { name: "AWS RDS (MySQL)", level: "Advanced", highlight: true },
        { name: "S3 & CloudFront", level: "Advanced" },
        { name: "Route 53 & API Gateway", level: "Intermediate" },
        { name: "IAM & VPC Security Groups", level: "Advanced" },
        { name: "Secrets Manager & CloudWatch", level: "Advanced" },
      ],
    },
    {
      id: "databases",
      category: "Databases & Storage",
      orbitRing: 5,
      color: "#3a86ff",
      skills: [
        { name: "MySQL Schema Normalization", level: "Expert", highlight: true },
        { name: "Complex SQL Queries", level: "Advanced" },
        { name: "Query Indexing & Optimization", level: "Advanced", highlight: true },
        { name: "Bottleneck Troubleshooting", level: "Advanced" },
      ],
    },
    {
      id: "frontend-quality",
      category: "Frontend & Quality Engineering",
      orbitRing: 6,
      color: "#ff007f",
      skills: [
        { name: "Angular & TypeScript", level: "Advanced", highlight: true },
        { name: "Mapbox GL JS (Geospatial)", level: "Advanced", highlight: true },
        { name: "Highcharts Dashboards", level: "Advanced" },
        { name: "PrimeNG / HTML5 / CSS3", level: "Advanced" },
        { name: "JUnit Testing", level: "Advanced", highlight: true },
        { name: "SonarQube & Clean Code", level: "Advanced" },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      id: "cozentus",
      company: "Cozentus",
      role: "Assistant Manager, Java (Senior Developer)",
      period: "Sept 2024 – Present",
      location: "Bhubaneswar, Odisha",
      project: "Risk Monitor — Global Logistics Risk Management Platform for PSA BDP",
      url: "https://riskmonitor.bdpsmart.com",
      missionStatus: "ACTIVE ORBIT",
      telemetryMetrics: [
        { label: "Deployment", value: "AWS Production" },
        { label: "Architecture", value: "Microservices" },
        { label: "Observability", value: "CloudWatch" },
      ],
      responsibilities: [
        "Architecting and operating backend microservices in Java 8+ and Spring Boot that ingest real-time risk telemetry from authorized global feeds and map them to shipments across sea vessels, ports, and freight hubs.",
        "Engineered the core decision-support impact evaluation engine that evaluates whether incoming geographic risk alerts intersect with active shipments.",
        "Designed high-performance RESTful APIs with strict service layering; tuned JPA/Hibernate fetch strategies and transactional boundaries for high-throughput spatial queries.",
        "Deployed and maintained production infrastructure on AWS: Spring Boot on EC2 behind ALB, managed MySQL RDS, S3 + CloudFront CDN, Route 53 DNS, Secrets Manager, and IAM/VPC security policies.",
        "Hardened enterprise API security end-to-end: token authorization, sensitive field encryption, and zero-trust CORS configuration.",
        "Engineered Angular geospatial visualization modules with Mapbox GL JS for vessel plotting, regional heatmaps, and Highcharts analytics.",
        "Championed team code quality: led peer reviews, instituted reusable design modules, and refined Agile delivery velocity.",
      ],
      technologies: [
        "Java 8+",
        "Spring Boot",
        "Microservices",
        "AWS (EC2, ALB, RDS, S3, CloudFront, CloudWatch)",
        "MySQL",
        "Hibernate / JPA",
        "Angular",
        "TypeScript",
        "Mapbox GL JS",
        "Highcharts",
        "RabbitMQ",
        "Kafka",
      ],
    },
    {
      id: "ohhpro",
      company: "Ohhpro",
      role: "Full Stack Developer",
      period: "Mar 2022 – Sept 2024",
      location: "Bhubaneswar, Odisha",
      project: "Ohhpro Junction — Smart Community Super-App Platform",
      missionStatus: "MISSION COMPLETED // SCALED",
      telemetryMetrics: [
        { label: "Communities", value: "100+ Societies" },
        { label: "Throughput", value: "Thousands / Day" },
        { label: "Concurrency", value: "ExecutorService" },
      ],
      responsibilities: [
        "Core member of the engineering team that architected and scaled a platform actively serving 100+ residential housing societies handling thousands of daily operations.",
        "Built responsive Angular web interfaces coupled with high-availability Spring Boot backend services and RESTful APIs.",
        "Integrated critical third-party provider systems: Razorpay payment gateway, Exotel IVR calling, MSG Club SMS gateways, and HubSpot CRM synchronization.",
        "Built bi-directional real-time communication channels using WebSockets and mobile push alerts via Firebase Cloud Messaging (FCM).",
        "Offloaded long-running workloads into ExecutorService thread pools, preventing request thread blocking under peak traffic spikes.",
        "Secured APIs with JWT authentication tokens, AES field encryption for sensitive member data, and strict CORS boundaries.",
        "Engineered the persistence tier using Spring Data JPA, Hibernate, and Spring JDBC on normalized MySQL databases with targeted query index optimization.",
        "Developed comprehensive JUnit unit test suites, resolved complex defect tickets, and provided critical production troubleshooting.",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Angular",
        "TypeScript",
        "MySQL",
        "Spring Data JPA",
        "Hibernate",
        "ExecutorService",
        "WebSocket",
        "Firebase (FCM)",
        "Razorpay",
        "Exotel IVR",
        "JWT",
        "JUnit",
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "risk-monitor",
      title: "Risk Monitor (PSA BDP)",
      subtitle: "Global Logistics Risk-Management & Telemetry Platform",
      company: "Cozentus",
      status: "PRODUCTION ACTIVE",
      color: "from-cyan-500 to-blue-600",
      glowColor: "#00f0ff",
      planetType: "oceanic",
      problem:
        "Global shipping networks face unexpected maritime disruptions (extreme weather, port congestion, geopolitical risks) that cause multimillion-dollar delays without immediate situational awareness.",
      solution:
        "Engineered an automated real-time risk event ingestion engine in Spring Boot microservices that parses incoming risk streams and maps geospatial coordinates to vessels, containers, and ports.",
      architecture: {
        title: "Microservices Data Flow",
        flow: [
          "External Risk Feeds & APIs",
          "Ingestion Microservices (Spring Boot)",
          "Impact Evaluation Core Engine",
          "Tuned JPA / MySQL RDS Cluster",
          "Mapbox GL JS Spatial UI & Highcharts",
        ],
      },
      technologies: [
        "Java 8+",
        "Spring Boot",
        "Microservices",
        "AWS (EC2, ALB, RDS, S3, CloudFront)",
        "Angular",
        "Mapbox GL JS",
        "Highcharts",
        "RabbitMQ",
      ],
      keyHighlights: [
        "Real-time event processing from multiple authorized global feeds",
        "Impact calculation logic determining operational risk across live shipments",
        "Tuned database queries and transaction boundaries for low-latency spatial lookups",
        "Operated on AWS with complete CloudWatch alerting and telemetry",
      ],
      liveUrl: "https://riskmonitor.bdpsmart.com",
    },
    {
      id: "ohhpro-junction",
      title: "Ohhpro Junction",
      subtitle: "High-Concurrency Residential Society Super-App",
      company: "Ohhpro",
      status: "SCALED IN PRODUCTION",
      color: "from-purple-500 to-pink-600",
      glowColor: "#9d4edd",
      planetType: "metropolis",
      problem:
        "Residential communities required seamless, low-latency visitor verification, IVR automated calling, and secure payment processing for thousands of daily resident transactions.",
      solution:
        "Engineered asynchronous processing with ExecutorService thread pools, WebSocket instant updates, and robust integration with Razorpay, Exotel, and Firebase Cloud Messaging.",
      architecture: {
        title: "High-Concurrency Super-App Architecture",
        flow: [
          "Mobile App & Angular Web Portal",
          "Spring Boot API Gateway",
          "ExecutorService Asynchronous Worker Pools",
          "External Gateways (Razorpay, Exotel, FCM)",
          "Normalized MySQL Database & Spring Data JPA",
        ],
      },
      technologies: [
        "Spring Boot",
        "Java",
        "Angular",
        "MySQL",
        "WebSocket",
        "Firebase FCM",
        "Razorpay",
        "Exotel IVR",
        "JWT / AES",
      ],
      keyHighlights: [
        "Successfully scaled across 100+ residential societies with thousands of daily transactions",
        "Non-blocking request architecture using multithreaded ExecutorService pools",
        "Enterprise-grade security using JWT tokens and AES sensitive data encryption",
        "High-reliability persistence layer using Spring Data JPA and Hibernate",
      ],
    },
    {
      id: "geospatial-intelligence",
      title: "Geospatial Risk Intelligence",
      subtitle: "Maritime Asset Plotting & Interactive Cartography",
      company: "Cozentus",
      status: "LIVE MODULE",
      color: "from-emerald-400 to-cyan-500",
      glowColor: "#00ff9f",
      planetType: "grid",
      problem:
        "Supply chain operators needed real-time visual triage to identify container bottlenecks across ports, vessel transit corridors, and custom geographical zones without sluggish client rendering.",
      solution:
        "Architected an accelerated vector layer in Angular using Mapbox GL JS and Highcharts distribution analytics connected to low-latency Spring Boot backend APIs.",
      architecture: {
        title: "Geospatial Rendering Pipeline",
        flow: [
          "Vessel & Port Telemetry Stream",
          "Spring Boot Geohash Spatial API",
          "Mapbox GL Vector Tile Acceleration",
          "Dynamic Country Risk Heatmaps",
          "Highcharts Operational Trends Dashboard",
        ],
      },
      technologies: [
        "Mapbox GL JS",
        "Highcharts",
        "Angular",
        "TypeScript",
        "Spring Boot",
        "Java 8+",
        "PrimeNG",
      ],
      keyHighlights: [
        "Interactive global asset tracking across sea vessels and terminal facilities",
        "Country-level heatmaps depicting real-time threat indices",
        "Highcharts trend graphs providing predictive operational analytics",
      ],
    },
  ] as ProjectItem[],

  education: [
    {
      degree: "B.Sc. Botany",
      institution: "Utkal University, Bhubaneswar",
      year: "Graduated 2020",
      specialization: "Scientific analysis, systematic methodology, analytical research",
      badge: "ACADEMIC FOUNDATION",
    },
    {
      degree: "Full Stack Java Development",
      institution: "Qspiders, Bhubaneswar",
      year: "Completed 2021",
      specialization: "Core Java, J2EE, Spring Framework, Hibernate, SQL, Web Technologies",
      badge: "PROFESSIONAL TRAINING",
    },
  ] as EducationItem[],

  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services (AWS)",
      status: "In Progress",
      targetYear: "Expected 2026",
      credentialType: "Cloud Architecture & Services",
    },
  ] as CertificationItem[],
};

