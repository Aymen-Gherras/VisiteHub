# Exped360 Docker Deployment

This project is containerized using Docker and orchestrated with Docker Compose. It includes a Jenkins pipeline for automated deployment to a remote server.

## 📂 Project Structure

- `exped360-backend/`: NestJS Backend Application
- `exped360-main-work/`: Next.js Frontend Application
- `docker-compose.yml`: Orchestration for Frontend, Backend, MySQL, and Redis
- `Jenkinsfile`: CI/CD Pipeline definition

## 🚀 Local Development

1.  **Prerequisites**: Ensure Docker and Docker Compose are installed.
2.  **Environment Setup**:
    Copy `.env.example` to `.env` and update the values.
    ```bash
    cp .env.example .env
    ```
3.  **Start Services**:
    ```bash
    docker-compose up --build
    ```
4.  **Access Application**:
    -   Frontend: [http://localhost:3001](http://localhost:3001)
    -   Backend API: [http://localhost:4000](http://localhost:4000)

## 🛠 Jenkins Deployment

The `Jenkinsfile` automates the deployment process to the remote server (`213.199.58.144`).

### Pipeline Steps:
1.  **Build Docker Images**: Verifies the build locally.
2.  **Deploy to Server**:
    -   Connects via SSH.
    -   Transfers project files (excluding `node_modules`).
    -   Runs `docker-compose up -d --build` on the remote server.
3.  **Health Check**: Verifies that containers are running.

### Jenkins Configuration Requirements:
-   **Credentials**:
    -   `deploy-key-pem`: SSH private key for deployment user.
    -   `ssh-root-server`: SSH private key for health check (can be the same as above).
-   **Server Setup**:
    -   Docker and Docker Compose must be installed on `213.199.58.144`.
    -   Port `3001` (Frontend) and `4000` (Backend) must be open.

## 🌐 Production Access

After deployment, the application is available at:
**[http://213.199.58.144:3001](http://213.199.58.144:3001)**
